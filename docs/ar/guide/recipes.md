---
description: "أنماط عملية لـ better-auth-tarjim: أخطاء النماذج، وإجراءات الخادم، ومكتبات الإشعارات الأخرى، والتعامل مع رموز محدّدة بنفسك."
---

# وصفات جاهزة

أنماط قصيرة جاهزة للنسخ لحالات شائعة.

## عرض الخطأ داخل النموذج

استخدم `translate` عندما تنتمي الرسالة إلى النموذج لا إلى إشعار. يستخدم هذا المثال اصطلاح `root.serverError` في [React Hook Form](https://react-hook-form.com):

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
      {/* ...الحقول... */}
      {form.formState.errors.root?.serverError && (
        <p role="alert">{form.formState.errors.root.serverError.message}</p>
      )}
    </form>
  );
}
```

## ربط الخطأ بحقل محدّد

اربط الرموز بالحقل الذي تخصّه. تحديد نوع الخريطة بـ `ErrorCode` يجعل أي رمز خاطئ إملائياً خطأ في التجميع:

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

## عالج رمزاً واحداً بنفسك وأظهر الباقي في إشعار

افحص `error.code` قبل استدعاء `authToast`:

```tsx
const { error } = await authClient.signIn.email({ email, password });

if (error?.code === "EMAIL_NOT_VERIFIED") {
  router.push("/verify-email");
} else if (error) {
  authToast(error);
}
```

## استبدال الإشعارات المكرّرة بدل تراكمها

امنح الإشعار `id` ثابتاً، فتحدّث Sonner الإشعار الموجود بدل إضافة غيره:

```ts
authToast(error, { toast: { id: "auth-error" } });
```

## إجراءات الخادم (Next.js) {#server-actions}

لا يستطيع إجراء الخادم عرض إشعار، لكن `translate` آمنة على الخادم. أعِد الرسالة العربية واعرضها في العميل:

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

تقرأ `translate` القيمة الرقمية `statusCode` في `APIError` المرمي، فتحصل الحالة 429 أو 5xx على الرسالة العربية الصحيحة حتى لو كان الرمز غير معروف.

## استخدام مكتبة إشعارات أخرى {#other-toast-library}

استورد من المدخل الخالي من Sonner ومرّر النص إلى مكتبتك:

```ts
import toast from "react-hot-toast";
import { translate } from "better-auth-tarjim/translate";

toast.error(translate(error));
```

## ترجمة أخطاء إضافتك الخاصة

مرّر رموزك عبر `overrides`. اضبطها مرة واحدة بـ `createAuthToast` فتلتقطها كل الدوال:

```ts
import { createAuthToast } from "better-auth-tarjim";

export const { authToast, withAuthToast, translate } = createAuthToast({
  overrides: {
    SUBSCRIPTION_LIMIT_REACHED: "وصلت إلى الحد الأقصى لخطتك الحالية",
  },
});
```
