---
description: "الإعدادات الافتراضية والرسائل المخصّصة والرسائل الاحتياطية والمدخل الخالي من Sonner في better-auth-tarjim."
---

# الاستخدام

## عرض إشعار

```tsx
import { authToast } from "better-auth-tarjim";

authToast(error);
authToast(error, { toast: { duration: 5000 } });
```

تعرض `authToast` إشعار خطأ من Sonner بالرسالة العربية وتعيد معرّف الإشعار. ويُمرَّر الخيار `toast` كما هو إلى `toast.error()` في Sonner.

## تغليف استدعاء

تنتظر `withAuthToast` استدعاء Better Auth، وتعرض إشعاراً عند الفشل، وتعيد النتيجة الأصلية. وهي تغطي حالتَي الفشل:

| حالة الفشل | ما يحدث |
| --- | --- |
| نتيجة `{ error }` عادية | يُعرض إشعار الخطأ وتُعاد النتيجة كما هي. |
| وعد مرفوض (Rejected) | تفشل الشبكة برفض الوعد بدلاً من إعادة نتيجة. يُعرض إشعار الرفض ثم يُعاد رميه، فتعمل كتلة `catch` الخاصة بك. |

```tsx
import { withAuthToast } from "better-auth-tarjim";

try {
  const { data, error } = await withAuthToast(
    authClient.signIn.email({ email, password }),
  );
  if (!error) router.push("/dashboard");
} catch {
  // عُرض الإشعار بالفعل. عالج الرفض هنا إن احتجت.
}
```

## إعدادات افتراضية للتطبيق كله

تدمج `createAuthToast` إعداداتك الافتراضية في الدوال الثلاث. وتتغلّب خيارات الاستدعاء الواحد على الافتراضية، ويُدمج `overrides` و`toast` مفتاحاً بمفتاح:

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

authToast(error); // تُطبَّق رسائلك المخصّصة والمدة الافتراضية
```

## النص فقط، بدون Sonner {#translate-only}

إذا كنت تستخدم مكتبة إشعارات أخرى، أو تحتاج نصاً لحقل في نموذج، فاستورد المدخل الخالي من الأطر:

```ts
import { translate } from "better-auth-tarjim/translate";

translate(error); // نص
```

يوفّر `better-auth-tarjim/translate` الدالتين `translate` و`messages` مع الأنواع. وهو بلا اعتمادية على Sonner، ويمكن استيراده بأمان على الخادم.

## رسائل مخصّصة ورموز الإضافات {#overrides}

مرّر `overrides` مفهرسة برمز الخطأ. تتغلّب على الرسائل العربية المضمّنة، وهي أيضاً الطريقة لترجمة رموز إضافات Better Auth الخاصة بك:

```ts
translate(error, {
  overrides: {
    MY_PLUGIN_ERROR: "حدث خطأ في الإضافة",
    USER_NOT_FOUND: "لا يوجد حساب بهذا البريد",
  },
});
```

تُتجاهل النصوص الفارغة، فلا يمكن لتخصيص شرطي أن يُنتج إشعاراً فارغاً عن غير قصد.

## الرسائل الاحتياطية

```ts
translate(error, {
  fallback: "تعذّر إتمام العملية، حاول لاحقاً",
  showOriginal: true, // الرموز غير المعروفة تعرض رسالة الخادم الإنجليزية
});
```

القيمة الافتراضية لـ `showOriginal` هي `false`. ولا تُعرض تفاصيل الخادم الداخلية في استجابات 429 و5xx أبداً: فهذه تستخدم دائماً رسائلها العربية المخصّصة.

## كيف يُحلّ الخطأ {#resolution}

أول تطابق يفوز:

1. `overrides[code]`
2. الرسالة العربية المضمّنة لـ `code`
3. حالة HTTP 429: طلبات كثيرة جداً
4. فشل الشبكة (انقطاع الاتصال، CORS، DNS)
5. حالة HTTP 5xx: خطأ في الخادم
6. الرسالة الأصلية، فقط عند تفعيل `showOriginal`
7. رسالة عربية عامة

::: info لماذا الرموز وليس النص الإنجليزي؟
قد تعيد Better Auth صياغة رسائلها الإنجليزية بين الإصدارات، لكنها تُبقي الرموز ثابتة. المطابقة بالرمز تعني أن تغيير الصياغة في المصدر لا يمكن أن يكسر رسائلك العربية.
:::

## عندما تضيف Better Auth رمزاً جديداً

إلى أن تصدر الحزمة ترجمته، يعرض الرمز الجديد الرسالة العربية الاحتياطية العامة (أو الرسالة الأصلية مع `showOriginal`). لا ينكسر شيء. يفتح مسار عمل يومي طلب دمج بالرموز الجديدة، ويُظهر فاحص الأنواع بالضبط أي الرموز ما زالت تحتاج نصاً عربياً. ويمكنك تغطية الرمز بنفسك فوراً عبر `overrides`.
