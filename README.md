<div align="center">

# better-auth-tarjim

**Arabic-first error toasts for [Better Auth](https://www.better-auth.com), built for shadcn/ui.**

`تعذّر` · `غير صالح` · `البريد الإلكتروني أو كلمة المرور غير صحيحة`

[![npm](https://img.shields.io/npm/v/better-auth-tarjim)](https://www.npmjs.com/package/better-auth-tarjim)
[![CI](https://github.com/raidsobhi/better-auth-tarjim/actions/workflows/ci.yml/badge.svg)](https://github.com/raidsobhi/better-auth-tarjim/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/better-auth-tarjim)](./LICENSE)

📖 **[Documentation](https://raidsobhi.github.io/better-auth-tarjim/)**

</div>

*Tarjama* (ترجمة) means "translation". This is an unofficial community package and is not affiliated with Better Auth.

- **One line to use.** `authToast(error)` shows the error in Arabic.
- **Always in sync.** The error codes are extracted from Better Auth itself, and a daily workflow opens a PR when a new release adds codes. TypeScript fails the build if a code has no Arabic translation.
- **262 codes** covering core and the admin, organization, two-factor, passkey, phone number, username, API key, Stripe, anonymous, email OTP, device authorization, captcha, generic OAuth, multi-session and OAuth popup plugins.
- **Small.** About 6.7 KB gzipped, no runtime dependencies. Sonner is only required by the toast helpers; the `/translate` entry has no peer dependency.
- **Typed.** `ErrorCode` is a union of every Better Auth code.

## Languages

Arabic is the first locale. The package name is deliberately neutral because more locales are planned, but the current API always returns Arabic. When another locale is added it will be opt-in (for example `locale: "fr"`), so existing calls keep working unchanged.

## Requirements

- Node 18 or newer (the built package is tested on Node 18 and 20).
- [Sonner](https://sonner.emilkowal.ski) 1.4 or newer for `authToast` / `withAuthToast`.

## Install

```bash
npm i better-auth-tarjim
```

If you use the toast helpers, install Sonner too. The shadcn/ui CLI adds the component for you:

```bash
npm i sonner
npx shadcn@latest add sonner
```

Only the main entry (`better-auth-tarjim`) imports Sonner. `better-auth-tarjim/translate` has no peer dependency, so translation-only consumers never need it.

## Setup

Add the `Toaster` once, in RTL:

```tsx
// app/layout.tsx (or your root component)
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Toaster dir="rtl" richColors />
      </body>
    </html>
  );
}
```

## Usage

```tsx
import { authToast } from "better-auth-tarjim";

const { error } = await authClient.signIn.email({ email, password });
if (error) authToast(error); // البريد الإلكتروني أو كلمة المرور غير صحيحة
```

Or wrap the call so you don't write the `if`. The original `{ data, error }` result is returned untouched:

```tsx
import { withAuthToast } from "better-auth-tarjim";

try {
  const { data, error } = await withAuthToast(
    authClient.signUp.email({ name, email, password }),
  );
  if (!error) router.push("/dashboard");
} catch {
  // The failure was already toasted, and then re-thrown. Handle the rejection here.
}
```

> In Next.js, call these from Client Components (files with `"use client"`), because toasts render in the browser.

### Defaults for the whole app

```ts
// lib/auth-toast.ts
import { createAuthToast } from "better-auth-tarjim";

export const { authToast, withAuthToast, translate } = createAuthToast({
  overrides: { USER_ALREADY_EXISTS: "هذا البريد مسجّل لدينا، جرّب تسجيل الدخول" },
  toast: { duration: 5000 },
});
```

### Just the text (no toast, no Sonner)

```ts
import { translate } from "better-auth-tarjim/translate";

translate(error); // string, e.g. for form field errors or another toast library
```

`translate` and `messages` are exported from `better-auth-tarjim/translate` only, so this path stays free of Sonner.

## API

### `authToast(error, options?)`
Shows `toast.error()` with the Arabic message and returns the toast id.

### `withAuthToast(promise, options?)`
Awaits a Better Auth call and toasts on failure. It handles both a resolved `{ error }` result and a **rejected promise**: the Better Auth client rejects on network failures (offline, DNS, CORS), so those are toasted with a dedicated message and then re-thrown. Your own `catch` still runs, so don't toast a second time there.

### `createAuthToast(defaults)`
Returns `{ authToast, withAuthToast, translate }` with your defaults applied.

### `translate(error, options?)`
Returns the Arabic message (the only locale in this release). Accepts the client `error` (`{ code, message, status }`), a thrown server `APIError` (numeric `statusCode` or `status`), an `Error` from a failed request, or a bare code string.

| Option | Type | Description |
| --- | --- | --- |
| `overrides` | `Record<string, string>` | Your own messages by code. They win over the built-in ones (empty strings are ignored). Also the way to translate codes from your own plugins. |
| `fallback` | `string` | Replaces the generic fallback message. |
| `showOriginal` | `boolean` | For unknown codes, show the server's English message instead of the fallback. Default `false`. |
| `toast` | `ExternalToast` | (`authToast` only) Passed to Sonner: `id`, `duration`, `description`, and so on. |

### `messages`
The built-in dictionary: `Readonly<Record<ErrorCode, string>>`.

### How an error is resolved

1. `overrides[code]`
2. The built-in Arabic message for `code`
3. HTTP 429: too many requests
4. Network failure (offline, CORS, DNS). Only errors that look like a failed request are matched, not every `TypeError`
5. HTTP 5xx: server error
6. The original message, only if `showOriginal` is on
7. A generic Arabic message

Messages are matched by **code**, never by English text, because Better Auth can reword its messages between releases but keeps the codes stable.

## Staying in sync with Better Auth

Better Auth is the single source of truth for the code list.

- `npm run sync` reads every `*_ERROR_CODES` export from the installed `better-auth` and `@better-auth/*` packages and regenerates `src/codes.generated.ts`, [`docs/CODES.md`](https://github.com/raidsobhi/better-auth-tarjim/blob/main/docs/CODES.md) and `docs/codes.json` (the data behind the [error-code table](https://raidsobhi.github.io/better-auth-tarjim/reference/error-codes)).
- `src/ar.ts` is typed `Record<ErrorCode, string>`, so a code without a translation is a compile error (and a failing test).
- The **Sync Better Auth** workflow runs daily, upgrades the packages, regenerates the list and opens a PR. If new codes appeared, that PR fails CI until the translations are added.

If two Better Auth plugins define the same code with different wording, the sync prints a warning and uses a fixed, documented precedence, so the result is the same on every machine.

Current Better Auth version: see `BETTER_AUTH_VERSION` in `src/codes.generated.ts`.

## Architecture

For the design behind the package — the generation pipeline, error resolution, build layout, CI gates and future locale support — read the [architecture guide](https://raidsobhi.github.io/better-auth-tarjim/reference/architecture) or its [source](https://github.com/raidsobhi/better-auth-tarjim/blob/main/docs/reference/architecture.md).

## FAQ

**Does it need `better-auth` as a dependency?** No. It only reads the `error` object your Better Auth client returns.

**I use a different toast library.** Use `translate()` from `better-auth-tarjim/translate` and pass the string to your library.

**Is Sonner's `dir` prop supported?** Yes, `<Toaster dir="rtl" />`. If you use the shadcn wrapper and it doesn't forward `dir`, set `dir="rtl"` on `<html>` instead.

**How do I translate my custom plugin's errors?** Pass them in `overrides`, keyed by your error code.

**Can I contribute better Arabic wording?** Please do. See [CONTRIBUTING.md](https://github.com/raidsobhi/better-auth-tarjim/blob/main/CONTRIBUTING.md).

## Contributing

See [CONTRIBUTING.md](https://github.com/raidsobhi/better-auth-tarjim/blob/main/CONTRIBUTING.md), including the Arabic style guide and the steps for translating newly added codes.

## License

[MIT](./LICENSE)
