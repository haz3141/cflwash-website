/* global fetch */

import type { ValidatedQuoteSubmission } from './quote-validation'

const RESEND_EMAILS_ENDPOINT = 'https://api.resend.com/emails'

export type QuoteEmailConfig = {
  resendApiKey: string
  notificationEmail: string
  fromEmail: string
}

export type QuoteEmailResult =
  | { ok: true }
  | { ok: false; category: 'configuration_error' | 'delivery_error' }

type SendQuoteEmailOptions = {
  config: QuoteEmailConfig
  requestId: string
  submittedAt: string
  sourcePage: string
  submission: ValidatedQuoteSubmission
}

export async function sendQuoteNotificationEmail({
  config,
  requestId,
  submittedAt,
  sourcePage,
  submission,
}: SendQuoteEmailOptions): Promise<QuoteEmailResult> {
  if (
    !isConfiguredValue(config.resendApiKey) ||
    !isConfiguredValue(config.notificationEmail) ||
    !isConfiguredValue(config.fromEmail)
  ) {
    return {
      ok: false,
      category: 'configuration_error',
    }
  }

  const emailContent = buildQuoteEmailContent({
    requestId,
    submittedAt,
    sourcePage,
    submission,
  })

  const response = await fetch(RESEND_EMAILS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': requestId,
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.notificationEmail],
      reply_to: submission.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    }),
  }).catch(() => null)

  if (response === null || !response.ok) {
    return {
      ok: false,
      category: 'delivery_error',
    }
  }

  const payload = (await response.json().catch(() => null)) as unknown
  if (!isAcceptedResendResponse(payload)) {
    return {
      ok: false,
      category: 'delivery_error',
    }
  }

  return {
    ok: true,
  }
}

function buildQuoteEmailContent({
  requestId,
  submittedAt,
  sourcePage,
  submission,
}: Omit<SendQuoteEmailOptions, 'config'>): {
  subject: string
  html: string
  text: string
} {
  const phone = submission.phone ?? 'Not provided'
  const serviceLine = `${submission.service.name} (${submission.service.slug})`
  const subject = `CFL Wash Co. Quote Request ${requestId.slice(0, 8)}`

  const text = [
    'New quote request',
    '',
    `Request ID: ${requestId}`,
    `Submitted At: ${submittedAt}`,
    `Source Page: ${sourcePage}`,
    '',
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${phone}`,
    `City: ${submission.city}`,
    `Service: ${serviceLine}`,
    '',
    'Project Details:',
    submission.details,
  ].join('\n')

  const html = [
    '<!doctype html>',
    '<html lang="en">',
    '<body style="margin:0;padding:24px;background:#f6f6f6;color:#111827;font-family:Arial,sans-serif;">',
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;padding:24px;">',
    '<h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;">New quote request</h1>',
    '<table style="width:100%;border-collapse:collapse;">',
    tableRow('Request ID', requestId),
    tableRow('Submitted At', submittedAt),
    tableRow('Source Page', sourcePage),
    tableRow('Name', submission.name),
    tableRow('Email', submission.email),
    tableRow('Phone', phone),
    tableRow('City', submission.city),
    tableRow('Service', serviceLine),
    '</table>',
    '<h2 style="margin:24px 0 12px;font-size:18px;line-height:1.3;">Project Details</h2>',
    `<pre style="margin:0;white-space:pre-wrap;word-break:break-word;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;">${escapeHtml(
      submission.details,
    )}</pre>`,
    '</div>',
    '</body>',
    '</html>',
  ].join('')

  return {
    subject,
    html,
    text,
  }
}

function tableRow(label: string, value: string): string {
  return `<tr><th style="padding:8px 12px 8px 0;text-align:left;vertical-align:top;font-size:14px;line-height:1.5;">${escapeHtml(
    label,
  )}</th><td style="padding:8px 0;font-size:14px;line-height:1.5;">${escapeHtml(
    value,
  )}</td></tr>`
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function isConfiguredValue(value: string): boolean {
  return value.trim().length > 0
}

function isAcceptedResendResponse(payload: unknown): payload is { id: string } {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'id' in payload &&
    typeof payload.id === 'string' &&
    payload.id.length > 0
  )
}
