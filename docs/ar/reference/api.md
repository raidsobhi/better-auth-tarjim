---
description: "المرجع الكامل لواجهة better-auth-tarjim: authToast وwithAuthToast وcreateAuthToast وtranslate وmessages والأنواع."
---

# مرجع الواجهة البرمجية

## نقاط الدخول

| الاستيراد | المحتوى | يتطلب Sonner |
| --- | --- | --- |
| `better-auth-tarjim` | `authToast` و`withAuthToast` و`createAuthToast` والأنواع | نعم — يستورد هذا المدخل Sonner |
| `better-auth-tarjim/translate` | `translate` و`messages` والأنواع | لا |

كلا المدخلين يُنشَر بصيغتَي ESM وCommonJS مع تعريفات TypeScript مطابقة.

`translate` و`messages` موجودان في `better-auth-tarjim/translate` فقط. فهما لا يُعاد تصديرهما من المدخل الرئيسي، لأن ذلك المدخل يستورد Sonner؛ وبإبقائهما خارجه لا يُضطر من يريد النص العربي وحده إلى تثبيته.

## `authToast`

```ts
function authToast(error: unknown, options?: AuthToastOptions): string | number;
```

تعرض `toast.error()` بالرسالة العربية وتعيد معرّف الإشعار من Sonner.

```tsx
const id = authToast(error, {
  toast: { id: "auth-error", duration: 5000 },
});
```

يمكن أن يكون `error` أحد الآتي:

- كائن `error` الذي يعيده عميل Better Auth: `{ code, message, status }`
- `APIError` مرمياً من الخادم: `{ body: { code, message }, status | statusCode }`
- `Error` ناتجاً عن طلب فاشل (انقطاع الاتصال، DNS، CORS)
- رمز خطأ نصياً مجرداً، مثل `"USER_NOT_FOUND"`

## `withAuthToast`

```ts
function withAuthToast<T extends { error?: unknown }>(
  promise: Promise<T>,
  options?: AuthToastOptions,
): Promise<T>;
```

تنتظر استدعاء Better Auth، وتعرض إشعاراً عند الفشل، وتعيد النتيجة الأصلية دون تعديل.

- إذا انتهى الوعد بقيمة `error` صحيحة (truthy) يُعرض إشعارها.
- إذا رُفض الوعد (فشل الشبكة) يُعرض إشعار الرفض ثم **يُعاد رميه**.

```tsx
const result = await withAuthToast(authClient.signIn.email({ email, password }));
```

## `createAuthToast`

```ts
function createAuthToast(defaults?: AuthToastOptions): {
  authToast: (error: unknown, options?: AuthToastOptions) => string | number;
  withAuthToast: <T extends { error?: unknown }>(
    promise: Promise<T>,
    options?: AuthToastOptions,
  ) => Promise<T>;
  translate: (error: unknown, options?: TranslateOptions) => string;
};
```

تعيد الدوال الثلاث مع تطبيق إعداداتك الافتراضية. وتتغلّب خيارات الاستدعاء الواحد. ويُدمج `overrides` و`toast` مفتاحاً بمفتاح، فيمكن للاستدعاء أن يضيف إلى الإعدادات الافتراضية دون استبدالها.

```ts
export const { authToast } = createAuthToast({
  overrides: { USER_ALREADY_EXISTS: "هذا البريد مسجّل لدينا" },
  toast: { duration: 5000 },
});
```

## `translate`

```ts
function translate(error: unknown, options?: TranslateOptions): string;
```

تعيد الرسالة العربية لأي شكل خطأ مدعوم. استخدمها مع مكتبة إشعارات أخرى، أو لأخطاء النماذج المضمّنة، أو على الخادم.

```ts
import { translate } from "better-auth-tarjim/translate";

translate({ code: "INVALID_EMAIL_OR_PASSWORD" });
```

راجع [كيف يُحلّ الخطأ](/ar/guide/usage#resolution) لمعرفة ترتيب البحث.

## الخيارات

### `TranslateOptions`

| الخيار | النوع | الافتراضي | الوصف |
| --- | --- | --- | --- |
| `overrides` | `Record<string, string>` | `undefined` | رسائلك الخاصة مفهرسة بالرمز. تتغلّب على الرسائل العربية المضمّنة. تُتجاهل النصوص الفارغة. وتُستخدم أيضاً لرموز الإضافات المخصّصة. |
| `fallback` | `string` | `"حدث خطأ غير متوقع، حاول مرة أخرى"` | تستبدل الرسالة الاحتياطية العامة. |
| `showOriginal` | `boolean` | `false` | للرموز غير المعروفة، تعرض رسالة الخادم الإنجليزية الأصلية بدل الرسالة الاحتياطية. |

### `AuthToastOptions`

يوسّع `AuthToastOptions` الواجهة `TranslateOptions` بحقل واحد:

| الخيار | النوع | الوصف |
| --- | --- | --- |
| `toast` | `ExternalToast` | يُمرَّر كما هو إلى `toast.error()` في Sonner: `id` و`duration` و`description` و`action` وغيرها. |

## `messages`

```ts
const messages: Readonly<Record<ErrorCode, string>>;
```

القاموس العربي المضمّن: خريطة للقراءة فقط من كل رمز خطأ في Better Auth إلى رسالته. استخدمه حين تحتاج النص الخام دون استدعاء `translate`:

```ts
import { messages } from "better-auth-tarjim/translate";

messages.INVALID_EMAIL_OR_PASSWORD;
```

ولأنه محدَّد النوع بـ `ErrorCode`، فالرمز الخاطئ إملائياً لا يُجمَّع.

## `ErrorCode`

```ts
type ErrorCode = "ACCESS_DENIED" | "ACCOUNT_NOT_FOUND" | /* ... */;
```

اتحاد (union) لكل رموز الأخطاء المستخرجة من إصدار Better Auth الذي وُلِّد منه هذا الإصدار. يُعاد توليده بالأمر `npm run sync` فيبقى متوافقاً مع Better Auth. راجع [القائمة الكاملة](/ar/reference/error-codes).

## الرسائل الاحتياطية

هذه الرسائل غير مرتبطة برمز في Better Auth. تُطبَّق عندما لا يتطابق أي رمز:

| الحالة | تُستخدم عندما |
| --- | --- |
| طلبات كثيرة جداً | تكون حالة الاستجابة 429. |
| فشل الشبكة | لا يصل الطلب إلى الخادم (انقطاع الاتصال، DNS، CORS). |
| خطأ في الخادم | تكون حالة الاستجابة 5xx والرمز غير معروف. |
| الرسالة العامة | لا يتطابق شيء آخر. يمكن استبدالها بـ `fallback`. |
