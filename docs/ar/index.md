---
layout: home
title: إشعارات أخطاء عربية لـ Better Auth
titleTemplate: better-auth-tarjim

hero:
  name: better-auth-tarjim
  text: رسائل أخطاء عربية لـ Better Auth
  tagline: سطر واحد يحوّل أي خطأ من Better Auth إلى إشعار عربي واضح. مكتبة صغيرة، مكتوبة بـ TypeScript، ومتزامنة دائماً مع Better Auth.
  image:
    src: /logo.svg
    alt: better-auth-tarjim
  actions:
    - theme: brand
      text: ابدأ الآن
      link: /ar/guide/getting-started
    - theme: alt
      text: تصفّح رموز الأخطاء
      link: /ar/reference/error-codes
    - theme: alt
      text: GitHub
      link: https://github.com/raidsobhi/better-auth-tarjim

features:
  - icon: 🌍
    title: مكتوبة للمستخدمين الحقيقيين
    details: رسائل بالعربية الفصحى المبسّطة لكل رمز خطأ في Better Auth، بصياغة تشبه ما تقوله التطبيقات فعلاً، وليست ترجمة حرفية.
  - icon: 🔄
    title: متزامنة دائماً
    details: قائمة الرموز تُولَّد من Better Auth نفسها. وعندما يضيف إصدار جديد رموزاً، يفتح مسار عمل يومي طلب دمج (Pull Request)، ويفشل TypeScript حتى تُترجَم كل الرموز.
  - icon: ⚡
    title: سطر واحد للاستخدام
    details: استدعِ authToast(error) في تدفقك الحالي، أو غلّف الاستدعاء بـ withAuthToast() لتتخلص من كتابة if.
  - icon: 📦
    title: صغيرة ومحدَّدة الأنواع
    details: نحو 7 كيلوبايت بعد الضغط (gzip) ودون أي اعتماديات وقت التشغيل. ErrorCode اتحاد (union) لكل رموز Better Auth، لذا تفشل الأخطاء الإملائية عند التجميع.
  - icon: 🧩
    title: مصمَّمة لـ shadcn/ui
    details: تستخدم الإشعارات مكتبة Sonner، مكوّن الإشعارات في shadcn/ui. ومدخل /translate بلا اعتمادية على Sonner ويعمل مع أي مكتبة إشعارات.
  - icon: 🛡️
    title: آمنة افتراضياً
    details: بحث آمن في القاموس، وكشف متحفّظ لأخطاء الشبكة، ولا تُعرض تفاصيل الخادم الداخلية للمستخدم أبداً.
---

<script setup>
import HomeStats from "../.vitepress/theme/components/HomeStats.vue";
import ToastPreview from "../.vitepress/theme/components/ToastPreview.vue";
</script>

<HomeStats />

## شاهدها تعمل

تُرجِع Better Auth **رمز خطأ** ثابتاً. تبحث `better-auth-tarjim` عنه وتعرض الرسالة العربية في إشعار Sonner، بالاتجاه من اليمين إلى اليسار.

<ToastPreview />

## بداية سريعة

```bash
npm i better-auth-tarjim
```

```tsx
import { authToast } from "better-auth-tarjim";

const { error } = await authClient.signIn.email({ email, password });
if (error) authToast(error); // البريد الإلكتروني أو كلمة المرور غير صحيحة
```

أضف مكوّن `<Toaster dir="rtl" />` من Sonner مرة واحدة في التخطيط الجذري. يشرح [دليل البدء السريع](/ar/guide/getting-started) الإعداد الكامل، ويغطي [الاستخدام](/ar/guide/usage) الدالة `withAuthToast` والرسائل المخصّصة والمدخل الخالي من Sonner.

## لماذا الرموز لا النصوص؟

تُبقي Better Auth **رموز** الأخطاء ثابتة، بينما قد تتغير رسائلها الإنجليزية بين الإصدارات. تعتمد هذه الحزمة على الرموز فقط، لذلك لا يمكن لتغيير صياغة في Better Auth أن يكسر رسائلك العربية. وعندما تضيف Better Auth رمزاً جديداً، يتغير النوع `ErrorCode` المُولَّد، فيخبرك البناء بدقة أي ترجمة ناقصة.

::: info حزمة غير رسمية
`better-auth-tarjim` مشروع مجتمعي. وهو غير تابع لـ Better Auth، ومنشور برخصة MIT.
:::
