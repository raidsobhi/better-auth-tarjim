---
description: "Install better-auth-tarjim, add the Sonner toaster in RTL, and show your first Arabic error toast."
---

# Getting started

This guide takes about five minutes. You will install the package, render Sonner's toaster in right-to-left, and show your first Arabic error toast.

## Requirements

- **Node 18 or newer.** The built package is tested on Node 18, 20, and 22.
- **[Sonner](https://sonner.emilkowal.ski) 1.4 or newer**, only if you use `authToast` or `withAuthToast`. The Sonner-free [`/translate` entry](/guide/usage#just-the-text-no-sonner) does not need it.
- A Better Auth client. The package never imports `better-auth`; it only reads the `error` object your client returns.

## 1. Install

::: code-group

```bash [npm]
npm i better-auth-tarjim
```

```bash [pnpm]
pnpm add better-auth-tarjim
```

```bash [yarn]
yarn add better-auth-tarjim
```

```bash [bun]
bun add better-auth-tarjim
```

:::

If you use the toast helpers, add Sonner as well. The shadcn/ui CLI installs the component and wraps it for you:

```bash
npx shadcn@latest add sonner
```

## 2. Render the Toaster in RTL

Render Sonner's `Toaster` once, in your root layout:

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

::: tip If the toast still reads left to right
Some versions of the shadcn wrapper do not forward Sonner's `dir` prop. Setting `dir="rtl"` on the `<html>` element, as above, is enough: the toasts inherit it.
:::

## 3. Show your first toast

```tsx
import { authToast } from "better-auth-tarjim";

const { error } = await authClient.signIn.email({ email, password });
if (error) authToast(error); // البريد الإلكتروني أو كلمة المرور غير صحيحة
```

`authToast` accepts the `error` returned by the Better Auth client, a thrown server `APIError`, an `Error` from a failed request, or a bare error code string.

## 4. Or wrap the call

`withAuthToast` awaits a Better Auth call and toasts on failure. The original `{ data, error }` result is returned untouched:

```tsx
import { withAuthToast } from "better-auth-tarjim";

try {
  const { data, error } = await withAuthToast(
    authClient.signUp.email({ name, email, password }),
  );
  if (!error) router.push("/dashboard");
} catch {
  // The failure was already toasted, and then re-thrown.
}
```

::: warning Network failures reject
The Better Auth client **rejects** on network failures (offline, DNS, CORS) instead of returning `{ error }`. `withAuthToast` handles both cases: it toasts the failure, then re-throws, so your own `catch` still runs. Do not toast a second time inside it.
:::

::: warning Next.js
Call the toast helpers from Client Components (files with `"use client"`), because toasts render in the browser. `translate` from `better-auth-tarjim/translate` also works on the server.
:::

## Next steps

- [Usage](/guide/usage): app-wide defaults, custom messages, and fallbacks.
- [Recipes](/guide/recipes): form field errors, server actions, and other toast libraries.
- [API reference](/reference/api): every function, option, and type.
- [Error codes](/reference/error-codes): the full searchable list with Arabic messages.
