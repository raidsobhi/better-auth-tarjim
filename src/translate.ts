import { ar } from "./ar";
import type { ErrorCode } from "./codes.generated";
import { extras } from "./extras";

export type { ErrorCode } from "./codes.generated";

export interface TranslateOptions {
  /**
   * Your own messages, keyed by error code. They win over the built-in Arabic ones.
   * Empty strings are ignored (an empty toast helps nobody).
   */
  overrides?: Record<string, string>;
  /** Replace the generic fallback message. */
  fallback?: string;
  /**
   * When the code is unknown, show the server's original (English) message
   * instead of the generic fallback. Default: `false`.
   */
  showOriginal?: boolean;
}

/** Built-in Arabic messages by Better Auth error code. */
export const messages: Readonly<Record<ErrorCode, string>> = ar;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
const num = (v: unknown) => (typeof v === "number" ? v : undefined);
const hasOwn = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);

/** Own-property lookup only, so codes like "toString" or "__proto__" can never hit Object.prototype. */
function lookup(code: string, overrides?: Record<string, string>): string | undefined {
  for (const source of [overrides, ar] as const) {
    if (source && hasOwn(source, code)) {
      const value = (source as Record<string, unknown>)[code];
      if (typeof value === "string" && value) return value;
    }
  }
  return undefined;
}

// Browsers say "Failed to fetch" / "Load failed" / "NetworkError...", Node (undici) says "fetch failed",
// React Native says "Network request failed".
const NETWORK_MESSAGE = /fetch failed|failed to fetch|load failed|network ?error|network request failed/i;
const NETWORK_CAUSE = /^(ECONNREFUSED|ECONNRESET|ENOTFOUND|EAI_AGAIN|ETIMEDOUT|UND_ERR_)/;

function isNetworkError(error: Record<string, unknown>, status?: number, code?: string, original?: string) {
  if (status === 0) return true;
  if (status || code) return false; // the server answered, so it is not a network failure
  if (original && NETWORK_MESSAGE.test(original)) return true;
  const cause = isRecord(error.cause) ? str(error.cause.code) : undefined;
  return !!cause && NETWORK_CAUSE.test(cause);
}

/**
 * Turns anything Better Auth (or `fetch`) can produce into an Arabic message.
 *
 * Accepts the `error` from the client (`{ code, message, status }`), a thrown server
 * `APIError` (`{ body: { code }, status | statusCode }`), a plain `Error` from a failed
 * request, or a bare code string.
 *
 * Lookup order: overrides -> Arabic dictionary -> 429 -> network -> 5xx -> original message -> fallback.
 */
export function translate(error: unknown, options: TranslateOptions = {}): string {
  const fallback = options.fallback ?? extras.fallback;
  if (error === null || error === undefined) return fallback;

  if (typeof error === "string") return lookup(error, options.overrides) ?? fallback;
  if (!isRecord(error)) return fallback;

  const body = isRecord(error.body) ? error.body : undefined;
  const code = str(error.code) ?? str(body?.code);
  // better-call's APIError keeps a status *name* in `status` ("TOO_MANY_REQUESTS") and the number in `statusCode`.
  const status = num(error.status) ?? num(error.statusCode) ?? num(body?.status) ?? num(body?.statusCode);
  const original = str(error.message) ?? str(body?.message);

  const known = code ? lookup(code, options.overrides) : undefined;
  if (known) return known;
  if (status === 429) return extras.tooManyRequests;
  if (isNetworkError(error, status, code, original)) return extras.network;
  if (status && status >= 500) return extras.server;
  if (options.showOriginal && original) return original;
  return fallback;
}
