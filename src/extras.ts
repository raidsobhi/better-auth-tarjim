/**
 * Messages for failures that don't carry a Better Auth error code.
 * (Network failures, rate limiting, generic fallbacks.)
 */
export const extras = {
  /** Shown when the error has no code, or the code is unknown. */
  fallback: "حدث خطأ غير متوقع، حاول مرة أخرى",
  /** HTTP 429 */
  tooManyRequests: "محاولات كثيرة، يرجى الانتظار قليلاً ثم المحاولة مجدداً",
  /** The request never reached the server (offline, DNS, CORS...). */
  network: "تعذّر الاتصال بالخادم، تحقق من اتصالك بالإنترنت",
  /** HTTP 5xx without a known code. */
  server: "حدث خطأ في الخادم، حاول لاحقاً",
} as const;
