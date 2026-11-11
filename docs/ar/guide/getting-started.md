---
description: "ثبّت better-auth-tarjim، وأضف مكوّن Sonner بالاتجاه من اليمين إلى اليسار، واعرض أول إشعار خطأ عربي."
---

# البدء السريع

يستغرق هذا الدليل نحو خمس دقائق. ستثبّت الحزمة، وتعرض مكوّن Toaster من Sonner بالاتجاه من اليمين إلى اليسار (RTL)، ثم تعرض أول إشعار خطأ بالعربية.

## المتطلبات

- **Node 18 أو أحدث.** الحزمة المبنية مختبَرة على Node 18 و20 و22.
- **[Sonner](https://sonner.emilkowal.ski) 1.4 أو أحدث**، فقط إذا استخدمت `authToast` أو `withAuthToast`. أما [مدخل `/translate`](/ar/guide/usage#translate-only) الخالي من Sonner فلا يحتاجه.
- عميل Better Auth. الحزمة لا تستورد `better-auth` أبداً؛ هي تقرأ فقط كائن `error` الذي يعيده العميل.

## 1. التثبيت

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

إذا كنت تستخدم دوال الإشعارات فأضف Sonner أيضاً. تثبّت أداة shadcn/ui CLI المكوّن وتغلّفه لك:

```bash
npx shadcn@latest add sonner
```

## 2. اعرض Toaster بالاتجاه RTL {#rtl-toaster}

اعرض مكوّن `Toaster` من Sonner مرة واحدة في التخطيط الجذري:

```tsx
// app/layout.tsx (أو المكوّن الجذري لتطبيقك)
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

::: tip إذا ظهر الإشعار من اليسار إلى اليمين
بعض إصدارات غلاف shadcn لا تمرّر الخاصية `dir` إلى Sonner. يكفي ضبط `dir="rtl"` على عنصر `<html>` كما في المثال أعلاه، فترثه الإشعارات.
:::

## 3. اعرض أول إشعار

```tsx
import { authToast } from "better-auth-tarjim";

const { error } = await authClient.signIn.email({ email, password });
if (error) authToast(error); // البريد الإلكتروني أو كلمة المرور غير صحيحة
```

تقبل `authToast` الكائن `error` الذي يعيده عميل Better Auth، أو `APIError` مرمياً من الخادم، أو `Error` ناتجاً عن طلب فاشل، أو رمز خطأ نصياً مجرداً.

## 4. أو غلّف الاستدعاء

تنتظر `withAuthToast` استدعاء Better Auth وتعرض إشعاراً عند الفشل. وتُعاد النتيجة الأصلية `{ data, error }` كما هي:

```tsx
import { withAuthToast } from "better-auth-tarjim";

try {
  const { data, error } = await withAuthToast(
    authClient.signUp.email({ name, email, password }),
  );
  if (!error) router.push("/dashboard");
} catch {
  // عُرض إشعار الفشل بالفعل ثم أُعيد رمي الخطأ.
}
```

::: warning فشل الشبكة يرفض الوعد
يقوم عميل Better Auth **برفض الوعد (Promise)** عند فشل الشبكة (انقطاع الاتصال، DNS، CORS) بدلاً من إعادة `{ error }`. تتعامل `withAuthToast` مع الحالتين: تعرض الإشعار ثم تعيد رمي الخطأ، فتعمل كتلة `catch` الخاصة بك كالمعتاد. لا تعرض إشعاراً ثانياً داخلها.
:::

::: warning Next.js
استدعِ دوال الإشعارات من مكوّنات العميل (الملفات التي تحتوي `"use client"`)، لأن الإشعارات تُعرض في المتصفح. أما `translate` من `better-auth-tarjim/translate` فتعمل على الخادم أيضاً.
:::

## الخطوات التالية

- [الاستخدام](/ar/guide/usage): الإعدادات الافتراضية للتطبيق، والرسائل المخصّصة، والرسائل الاحتياطية.
- [وصفات جاهزة](/ar/guide/recipes): أخطاء حقول النماذج، وإجراءات الخادم، ومكتبات الإشعارات الأخرى.
- [مرجع الواجهة البرمجية](/ar/reference/api): كل دالة وخيار ونوع.
- [رموز الأخطاء](/ar/reference/error-codes): القائمة الكاملة القابلة للبحث مع الرسائل العربية.
