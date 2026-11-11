---
description: "Practical patterns for better-auth-tarjim: form errors, server actions, other toast libraries, and handling specific codes yourself."
---

# Recipes

Short, copy-pasteable patterns for common situations.

## Show the error inside a form

Use `translate` when the message belongs in the form instead of a toast. This example uses [React Hook Form](https://react-hook-form.com)'s `root.serverError` convention:

```tsx
import { useForm } from "react-hook-form";
import { translate } from "better-auth-tarjim/translate";

export function SignInForm() {
  const form = useForm<{ email: string; password: string }>();

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      form.setError("root.serverError", { type: "server", message: translate(error) });
    }
  });

  return (
    <form onSubmit={onSubmit} dir="rtl">
      {/* ...fields... */}
      {form.formState.errors.root?.serverError && (
        <p role="alert">{form.formState.errors.root.serverError.message}</p>
      )}
    </form>
  );
}
```

## Attach an error to a specific field

Map codes to the field they belong to. Typing the map with `ErrorCode` makes a mistyped code a compile error:

```ts
import { translate, type ErrorCode } from "better-auth-tarjim/translate";

const fieldByCode: Partial<Record<ErrorCode, "email" | "password">> = {
  USER_ALREADY_EXISTS: "email",
  INVALID_EMAIL: "email",
  PASSWORD_TOO_SHORT: "password",
  PASSWORD_TOO_LONG: "password",
};

const field = error.code ? fieldByCode[error.code as ErrorCode] : undefined;
if (field) form.setError(field, { message: translate(error) });
else authToast(error);
```

## Handle one code yourself, toast the rest

Branch on `error.code` before calling `authToast`:

```tsx
const { error } = await authClient.signIn.email({ email, password });

if (error?.code === "EMAIL_NOT_VERIFIED") {
  router.push("/verify-email");
} else if (error) {
  authToast(error);
}
```

## Replace repeated toasts instead of stacking them

Give the toast a fixed `id`. Sonner updates the existing toast in place:

```ts
authToast(error, { toast: { id: "auth-error" } });
```

## Server actions (Next.js)

A server action cannot show a toast, but `translate` is safe on the server. Return the Arabic message and toast it on the client:

```ts
// app/actions.ts
"use server";

import { APIError } from "better-auth/api";
import { translate } from "better-auth-tarjim/translate";
import { auth } from "@/lib/auth";

export async function signIn(formData: FormData) {
  try {
    await auth.api.signInEmail({
      body: {
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      },
    });
    return { error: null };
  } catch (error) {
    if (error instanceof APIError) return { error: translate(error) };
    throw error;
  }
}
```

```tsx
"use client";

import { toast } from "sonner";
import { signIn } from "./actions";

async function action(formData: FormData) {
  const result = await signIn(formData);
  if (result.error) toast.error(result.error);
}
```

`translate` reads the numeric `statusCode` of a thrown `APIError`, so a 429 or 5xx gets the right Arabic message even when the code is unknown.

## Use another toast library

Import from the Sonner-free entry point and pass the string to your library:

```ts
import toast from "react-hot-toast";
import { translate } from "better-auth-tarjim/translate";

toast.error(translate(error));
```

## Translate your own plugin's errors

Pass your codes through `overrides`. Set them once with `createAuthToast`, and every helper picks them up:

```ts
import { createAuthToast } from "better-auth-tarjim";

export const { authToast, withAuthToast, translate } = createAuthToast({
  overrides: {
    SUBSCRIPTION_LIMIT_REACHED: "وصلت إلى الحد الأقصى لخطتك الحالية",
  },
});
```
