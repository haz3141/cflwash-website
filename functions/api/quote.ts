/* global Headers, Request, Response, TextEncoder, URL, URLSearchParams, console, crypto, fetch */

import {
  sendQuoteNotificationEmail,
  type QuoteEmailConfig,
} from '../lib/quote-email'
import { validateQuoteRequestBody } from '../lib/quote-validation'

const MAX_REQUEST_BYTES = 16 * 1024
const TURNSTILE_VERIFY_ENDPOINT =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const REQUEST_SOURCE_PAGE = '/request-quote'
const BASE_RESPONSE_HEADERS = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
} as const

type Env = {
  TURNSTILE_SECRET_KEY?: string
  RESEND_API_KEY?: string
  QUOTE_NOTIFICATION_EMAIL?: string
  QUOTE_FROM_EMAIL?: string
}

type EventContext = {
  request: Request
  env: Env
}

type PublicErrorCode =
  | 'invalid_request'
  | 'validation_error'
  | 'verification_failed'
  | 'delivery_unavailable'

type LogCategory =
  | 'success'
  | 'invalid_request'
  | 'validation_error'
  | 'verification_failed'
  | 'configuration_error'
  | 'delivery_error'
  | 'unexpected_error'

export async function onRequest(context: EventContext): Promise<Response> {
  const requestId = crypto.randomUUID()
  const timestamp = new Date().toISOString()
  const { request, env } = context

  try {
    if (request.method !== 'POST') {
      return respondError(
        requestId,
        timestamp,
        405,
        'invalid_request',
        {
          ok: false,
          code: 'invalid_request',
        },
        {
          Allow: 'POST',
        },
      )
    }

    if (!hasAllowedOrigin(request)) {
      return respondError(requestId, timestamp, 403, 'invalid_request', {
        ok: false,
        code: 'invalid_request',
      })
    }

    if (!hasJsonContentType(request)) {
      return respondError(requestId, timestamp, 415, 'invalid_request', {
        ok: false,
        code: 'invalid_request',
      })
    }

    if (
      isDeclaredContentLengthTooLarge(request.headers.get('Content-Length'))
    ) {
      return respondError(requestId, timestamp, 413, 'invalid_request', {
        ok: false,
        code: 'invalid_request',
      })
    }

    const rawBody = await request.text()
    if (getUtf8ByteLength(rawBody) > MAX_REQUEST_BYTES) {
      return respondError(requestId, timestamp, 413, 'invalid_request', {
        ok: false,
        code: 'invalid_request',
      })
    }

    const validationResult = validateQuoteRequestBody(rawBody)
    if (!validationResult.ok) {
      if (validationResult.code === 'invalid_request') {
        return respondError(requestId, timestamp, 400, 'invalid_request', {
          ok: false,
          code: 'invalid_request',
        })
      }

      return respondError(requestId, timestamp, 400, 'validation_error', {
        ok: false,
        code: 'validation_error',
        fieldErrors: validationResult.fieldErrors,
      })
    }

    if (validationResult.data.website !== '') {
      return respondError(requestId, timestamp, 400, 'verification_failed', {
        ok: false,
        code: 'verification_failed',
      })
    }

    const turnstileSecret = env.TURNSTILE_SECRET_KEY?.trim() ?? ''
    if (turnstileSecret === '') {
      return respondError(requestId, timestamp, 503, 'configuration_error', {
        ok: false,
        code: 'delivery_unavailable',
      })
    }

    const expectedUrl = new URL(request.url)
    const turnstileVerified = await verifyTurnstileToken({
      secret: turnstileSecret,
      token: validationResult.data.turnstileToken,
      requestId,
      hostname: expectedUrl.hostname,
      remoteIp: request.headers.get('CF-Connecting-IP'),
    })

    if (!turnstileVerified) {
      return respondError(requestId, timestamp, 400, 'verification_failed', {
        ok: false,
        code: 'verification_failed',
      })
    }

    const emailResult = await sendQuoteNotificationEmail({
      config: getEmailConfig(env),
      requestId,
      submittedAt: timestamp,
      sourcePage: REQUEST_SOURCE_PAGE,
      submission: validationResult.data,
    })

    if (!emailResult.ok) {
      return respondError(requestId, timestamp, 503, emailResult.category, {
        ok: false,
        code: 'delivery_unavailable',
      })
    }

    logRequest({
      requestId,
      timestamp,
      status: 200,
      category: 'success',
    })

    return jsonResponse(
      {
        ok: true,
        requestId,
      },
      200,
    )
  } catch {
    return respondError(requestId, timestamp, 503, 'unexpected_error', {
      ok: false,
      code: 'delivery_unavailable',
    })
  }
}

function hasAllowedOrigin(request: Request): boolean {
  const originHeader = request.headers.get('Origin')
  if (originHeader === null) {
    return true
  }

  try {
    return new URL(originHeader).origin === new URL(request.url).origin
  } catch {
    return false
  }
}

function hasJsonContentType(request: Request): boolean {
  const contentType = request.headers.get('Content-Type')
  if (contentType === null) {
    return false
  }

  return (
    contentType.split(';', 1)[0]?.trim().toLowerCase() === 'application/json'
  )
}

function isDeclaredContentLengthTooLarge(
  contentLengthHeader: string | null,
): boolean {
  if (contentLengthHeader === null) {
    return false
  }

  const contentLength = Number.parseInt(contentLengthHeader, 10)
  return Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES
}

function getUtf8ByteLength(value: string): number {
  return new TextEncoder().encode(value).length
}

function getEmailConfig(env: Env): QuoteEmailConfig {
  return {
    resendApiKey: env.RESEND_API_KEY?.trim() ?? '',
    notificationEmail: env.QUOTE_NOTIFICATION_EMAIL?.trim() ?? '',
    fromEmail: env.QUOTE_FROM_EMAIL?.trim() ?? '',
  }
}

async function verifyTurnstileToken(input: {
  secret: string
  token: string
  requestId: string
  hostname: string
  remoteIp: string | null
}): Promise<boolean> {
  const body = new URLSearchParams({
    secret: input.secret,
    response: input.token,
    idempotency_key: input.requestId,
  })

  if (input.remoteIp !== null && input.remoteIp !== '') {
    body.set('remoteip', input.remoteIp)
  }

  const response = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  }).catch(() => null)

  if (response === null || !response.ok) {
    return false
  }

  const payload = (await response.json().catch(() => null)) as unknown
  if (!isTurnstileSuccess(payload)) {
    return false
  }

  return (
    payload.success === true &&
    payload.hostname === input.hostname &&
    payload.action === 'quote_submit'
  )
}

function isTurnstileSuccess(payload: unknown): payload is {
  success: boolean
  hostname?: string
  action?: string
} {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'success' in payload &&
    typeof payload.success === 'boolean'
  )
}

function respondError(
  requestId: string,
  timestamp: string,
  status: number,
  category: LogCategory,
  body:
    | { ok: false; code: Exclude<PublicErrorCode, 'validation_error'> }
    | {
        ok: false
        code: 'validation_error'
        fieldErrors: Record<string, string>
      },
  extraHeaders?: Record<string, string>,
): Response {
  logRequest({
    requestId,
    timestamp,
    status,
    category,
  })

  return jsonResponse(body, status, extraHeaders)
}

function jsonResponse(
  body:
    | { ok: true; requestId: string }
    | {
        ok: false
        code: PublicErrorCode
        fieldErrors?: Record<string, string>
      },
  status: number,
  extraHeaders?: Record<string, string>,
): Response {
  const headers = new Headers(BASE_RESPONSE_HEADERS)

  if (extraHeaders !== undefined) {
    for (const [key, value] of Object.entries(extraHeaders)) {
      headers.set(key, value)
    }
  }

  return new Response(JSON.stringify(body), {
    status,
    headers,
  })
}

function logRequest(input: {
  requestId: string
  timestamp: string
  status: number
  category: LogCategory
}): void {
  console.log(
    JSON.stringify({
      requestId: input.requestId,
      timestamp: input.timestamp,
      status: input.status,
      category: input.category,
    }),
  )
}
