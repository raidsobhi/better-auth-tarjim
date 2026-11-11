---
description: "Defaults, custom messages, fallbacks, and the Sonner-free entry point of better-auth-tarjim."
---

# Usage

## Show a toast

```tsx
import { authToast } from "better-auth-tarjim";

authToast(error);
authToast(error, { toast: { duration: 5000 } });
```

`authToast` shows a Sonner error toast with the Arabic message and returns the toast id. The `toast` option is passed straight to Sonner's `toast.error()`.

## Wrap a call

`withAuthToast` awaits a Better Auth call, toasts on failure, and returns the original result. It covers both failure modes:

| Failure | What happens |
| --- | --- |
| Resolved `{ error }` | The error is toasted and the result is returned untouched. |
| Rejected promise | Network failures reject instead of resolving. The rejection is toasted, then re-thrown, so your own `catch` still runs. |

```tsx
import { withAuthToast } from "better-auth-tarjim";

try {
  const { data, error } = await withAuthToast(
    authClient.signIn.email({ email, password }),
  );
  if (!error) router.push("/dashboard");
} catch {
  // Already toasted. Handle the rejection here if you need to.
}
```

## Defaults for the whole app

`createAuthToast` bakes defaults into all three helpers. Per-call options win, and `overrides` and `toast` are merged key by key:

```ts
// lib/auth-toast.ts
import { createAuthToast } from "better-auth-tarjim";

export const { authToast, withAuthToast, translate } = createAuthToast({
  overrides: {
    USER_ALREADY_EXISTS: "هذا البريد مسجّل لدينا، جرّب تسجيل الدخول",
  },
  toast: { duration: 5000 },
});
```

```tsx
import { authToast } from "@/lib/auth-toast";

authToast(error); // uses your overrides and duration
```

## Just the text, no Sonner

If you use another toast library, or need a string for a form field, import the framework-free entry point:

```ts
import { translate } from "better-auth-tarjim/translate";

translate(error); // string
```

`better-auth-tarjim/translate` exposes `translate`, `messages`, and the types. It has no Sonner peer dependency and is safe to import on the server.

## Custom messages and plugin codes

Pass `overrides`, keyed by error code. They win over the built-in Arabic messages, and they are also how you translate codes from your own Better Auth plugins:

```ts
translate(error, {
  overrides: {
    MY_PLUGIN_ERROR: "حدث خطأ في الإضافة",
    USER_NOT_FOUND: "لا يوجد حساب بهذا البريد",
  },
});
```

Empty strings are ignored, so a conditional override cannot accidentally produce an empty toast.

## Fallbacks

```ts
translate(error, {
  fallback: "تعذّر إتمام العملية، حاول لاحقاً",
  showOriginal: true, // unknown codes show the server's English message
});
```

`showOriginal` defaults to `false`. Server internals are never shown for 429 or 5xx responses: those always use the dedicated Arabic messages.

## How an error is resolved

The first match wins:

1. `overrides[code]`
2. The built-in Arabic message for `code`
3. HTTP 429: too many requests
4. Network failure (offline, CORS, DNS)
5. HTTP 5xx: server error
6. The original message, only if `showOriginal` is on
7. A generic Arabic message

::: info Why codes and not English text?
Better Auth can reword its English messages between releases, but it keeps the codes stable. Matching by code means an upstream wording change cannot break your Arabic messages.
:::

## When Better Auth adds a new code

Until this package ships the translation, the new code resolves to the generic Arabic fallback (or the original message with `showOriginal`). Nothing breaks. A daily workflow opens a pull request with the new codes, and the type checker lists exactly which ones still need Arabic text. You can cover a code yourself right away with `overrides`.
