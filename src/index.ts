import { toast, type ExternalToast } from "sonner";
import { translate, type TranslateOptions } from "./translate";

// `translate` and `messages` are deliberately NOT re-exported here: this entry imports
// `sonner`, so re-exporting them would make `import { translate } from "better-auth-tarjim"`
// fail for consumers who do not want Sonner. Use "better-auth-tarjim/translate" instead —
// that entry has no peer dependency at all.
export type { TranslateOptions, ErrorCode } from "./translate";

export interface AuthToastOptions extends TranslateOptions {
  /** Passed straight to Sonner's `toast.error()` (id, duration, description, ...). */
  toast?: ExternalToast;
}

/**
 * Shows an Arabic error toast (Sonner, the toast used by shadcn/ui).
 * Returns the toast id.
 */
export function authToast(error: unknown, options: AuthToastOptions = {}): string | number {
  const { toast: toastOptions, ...translateOptions } = options;
  return toast.error(translate(error, translateOptions), toastOptions);
}

/**
 * Awaits a Better Auth call and shows a toast when it fails.
 *
 * Covers both failure modes: a resolved `{ error }` result, and a rejected promise
 * (the Better Auth client rejects on network failures such as offline or DNS errors).
 * The original result is returned untouched; a rejection is toasted and then re-thrown,
 * so the `Promise<T>` contract is unchanged and your own `catch` still runs.
 */
export async function withAuthToast<T extends { error?: unknown }>(
  promise: Promise<T>,
  options?: AuthToastOptions,
): Promise<T> {
  let result: T;
  try {
    result = await promise;
  } catch (error) {
    authToast(error, options);
    throw error;
  }
  if (result.error) authToast(result.error, options);
  return result;
}

/** Creates `authToast` / `withAuthToast` with your defaults baked in (e.g. overrides). */
export function createAuthToast(defaults: AuthToastOptions = {}) {
  const merge = (o?: AuthToastOptions): AuthToastOptions => ({
    ...defaults,
    ...o,
    overrides: { ...defaults.overrides, ...o?.overrides },
    toast: { ...defaults.toast, ...o?.toast },
  });
  return {
    authToast: (error: unknown, o?: AuthToastOptions) => authToast(error, merge(o)),
    withAuthToast: <T extends { error?: unknown }>(p: Promise<T>, o?: AuthToastOptions) =>
      withAuthToast(p, merge(o)),
    translate: (error: unknown, o?: TranslateOptions) => translate(error, merge(o)),
  };
}
