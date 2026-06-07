import { services, type Service } from '../../src/data/services'

const EXPECTED_FIELDS = [
  'name',
  'email',
  'phone',
  'city',
  'service',
  'details',
  'consent',
  'website',
  'turnstileToken',
] as const

const SERVICE_BY_SLUG = new Map(
  services.map(
    (service) => [service.slug, service] satisfies [string, Service],
  ),
)

const EMAIL_PATTERN =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i

export type QuoteField = (typeof EXPECTED_FIELDS)[number]

export type QuoteFieldErrors = Record<string, string>

export type ValidatedQuoteSubmission = {
  name: string
  email: string
  phone: string | null
  city: string
  service: Service
  details: string
  website: string
  turnstileToken: string
}

type ValidationFailure = {
  ok: false
  code: 'validation_error'
  fieldErrors: QuoteFieldErrors
}

type InvalidRequestFailure = {
  ok: false
  code: 'invalid_request'
}

type ValidationSuccess = {
  ok: true
  data: ValidatedQuoteSubmission
}

type StringNormalizer = typeof normalizeSingleLine

export type QuoteValidationResult =
  | ValidationSuccess
  | ValidationFailure
  | InvalidRequestFailure

export function validateQuoteRequestBody(
  rawBody: string,
): QuoteValidationResult {
  let parsed: unknown

  try {
    parsed = JSON.parse(rawBody) as unknown
  } catch {
    return {
      ok: false,
      code: 'invalid_request',
    }
  }

  if (!isPlainObject(parsed)) {
    return {
      ok: false,
      code: 'invalid_request',
    }
  }

  const fieldErrors = Object.create(null) as QuoteFieldErrors

  for (const key of Object.keys(parsed)) {
    if (!EXPECTED_FIELDS.includes(key as QuoteField)) {
      fieldErrors[key] = 'Unexpected field.'
    }
  }

  const name = readRequiredString(parsed, 'name', 2, 100, fieldErrors, {
    required: 'Enter your name.',
    invalid: 'Enter your name.',
    length: 'Enter a name between 2 and 100 characters.',
  })

  const emailInput = readRequiredString(parsed, 'email', 1, 254, fieldErrors, {
    required: 'Enter a valid email address.',
    invalid: 'Enter a valid email address.',
    length: 'Enter a valid email address.',
  })

  const phone = readOptionalString(parsed, 'phone', 30, fieldErrors, {
    invalid: 'Enter a phone number under 30 characters.',
    length: 'Enter a phone number under 30 characters.',
  })

  const city = readRequiredString(parsed, 'city', 2, 100, fieldErrors, {
    required: 'Enter your city.',
    invalid: 'Enter your city.',
    length: 'Enter a city between 2 and 100 characters.',
  })

  const serviceSlug = readRequiredString(
    parsed,
    'service',
    1,
    100,
    fieldErrors,
    {
      required: 'Select a valid service.',
      invalid: 'Select a valid service.',
      length: 'Select a valid service.',
    },
  )

  const details = readRequiredString(
    parsed,
    'details',
    10,
    2000,
    fieldErrors,
    {
      required: 'Enter project details.',
      invalid: 'Enter project details.',
      length: 'Enter project details between 10 and 2000 characters.',
    },
    normalizeMultiline,
  )

  const consent = parsed.consent
  if (consent !== true) {
    fieldErrors.consent =
      'You must agree to be contacted about your quote request.'
  }

  const website = readRequiredString(parsed, 'website', 0, 200, fieldErrors, {
    required: 'Invalid value.',
    invalid: 'Invalid value.',
    length: 'Invalid value.',
  })

  const turnstileToken = readRequiredString(
    parsed,
    'turnstileToken',
    1,
    2048,
    fieldErrors,
    {
      required: 'Complete the verification challenge.',
      invalid: 'Complete the verification challenge.',
      length: 'Complete the verification challenge.',
    },
  )

  const normalizedEmail = emailInput?.toLowerCase() ?? null
  if (normalizedEmail !== null && !isPracticalEmail(normalizedEmail)) {
    fieldErrors.email = 'Enter a valid email address.'
  }

  const service =
    serviceSlug !== null ? (SERVICE_BY_SLUG.get(serviceSlug) ?? null) : null
  if (serviceSlug !== null && service === null) {
    fieldErrors.service = 'Select a valid service.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      code: 'validation_error',
      fieldErrors,
    }
  }

  return {
    ok: true,
    data: {
      name: name as string,
      email: normalizedEmail as string,
      phone,
      city: city as string,
      service: service as Service,
      details: details as string,
      website: website as string,
      turnstileToken: turnstileToken as string,
    },
  }
}

function readRequiredString(
  input: Record<string, unknown>,
  field: QuoteField,
  minLength: number,
  maxLength: number,
  fieldErrors: QuoteFieldErrors,
  messages: {
    required: string
    invalid: string
    length: string
  },
  normalize: StringNormalizer = normalizeSingleLine,
): string | null {
  const rawValue = input[field]

  if (rawValue === undefined) {
    fieldErrors[field] = messages.required
    return null
  }

  if (typeof rawValue !== 'string') {
    fieldErrors[field] = messages.invalid
    return null
  }

  const value = normalize(rawValue)
  if (value.length < minLength || value.length > maxLength) {
    fieldErrors[field] = messages.length
    return null
  }

  return value
}

function readOptionalString(
  input: Record<string, unknown>,
  field: QuoteField,
  maxLength: number,
  fieldErrors: QuoteFieldErrors,
  messages: {
    invalid: string
    length: string
  },
): string | null {
  const rawValue = input[field]

  if (rawValue === undefined) {
    return null
  }

  if (typeof rawValue !== 'string') {
    fieldErrors[field] = messages.invalid
    return null
  }

  const value = normalizeSingleLine(rawValue)
  if (value.length > maxLength) {
    fieldErrors[field] = messages.length
    return null
  }

  return value === '' ? null : value
}

function normalizeSingleLine(value: string): string {
  return value.trim()
}

function normalizeMultiline(value: string): string {
  return value.replace(/\r\n?/g, '\n').trim()
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isPracticalEmail(value: string): boolean {
  if (value.length > 254 || !EMAIL_PATTERN.test(value)) {
    return false
  }

  const [localPart, domain] = value.split('@')
  if (localPart === undefined || domain === undefined) {
    return false
  }

  if (
    localPart.length > 64 ||
    localPart.startsWith('.') ||
    localPart.endsWith('.')
  ) {
    return false
  }

  return !domain.includes('..')
}
