---
layout: home
title: Arabic error toasts for Better Auth
titleTemplate: better-auth-tarjim

hero:
  name: better-auth-tarjim
  text: Arabic error messages for Better Auth
  tagline: One line turns any Better Auth error into a clear Arabic toast. Typed, tiny, and always in sync with Better Auth.
  image:
    src: /logo.svg
    alt: better-auth-tarjim
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Browse error codes
      link: /reference/error-codes
    - theme: alt
      text: View on GitHub
      link: https://github.com/raidsobhi/better-auth-tarjim

features:
  - icon: 🌍
    title: Written for real users
    details: Modern Standard Arabic messages for every Better Auth error code, phrased the way an app would say it, not translated word for word.
  - icon: 🔄
    title: Always in sync
    details: The code list is generated from Better Auth itself. A daily workflow opens a pull request when a release adds codes, and TypeScript fails until each one is translated.
  - icon: ⚡
    title: One line to use
    details: Call authToast(error) in your existing flow, or wrap a call with withAuthToast() so you never write the if.
  - icon: 📦
    title: Tiny and typed
    details: About 7 KB gzipped with no runtime dependencies. ErrorCode is a union of every Better Auth code, so typos fail to compile.
  - icon: 🧩
    title: Built for shadcn/ui
    details: Toasts use Sonner, the toast component of shadcn/ui. The /translate entry has no peer dependency and works with any toast library.
  - icon: 🛡️
    title: Safe by default
    details: Prototype-safe lookup, conservative network detection, and server internals are never shown to your users.
---

<script setup>
import HomeStats from "./.vitepress/theme/components/HomeStats.vue";
import ToastPreview from "./.vitepress/theme/components/ToastPreview.vue";
</script>

<HomeStats />

## See it in action

Better Auth returns a stable error **code**. `better-auth-tarjim` looks it up and shows the Arabic message in a Sonner toast, in right-to-left.

<ToastPreview />

## Quick start

```bash
npm i better-auth-tarjim
```

```tsx
import { authToast } from "better-auth-tarjim";

const { error } = await authClient.signIn.email({ email, password });
if (error) authToast(error); // البريد الإلكتروني أو كلمة المرور غير صحيحة
```

Add Sonner's `<Toaster dir="rtl" />` once in your root layout. The [getting started guide](/guide/getting-started) covers the full setup, and [usage](/guide/usage) covers `withAuthToast`, overrides, and the Sonner-free entry point.

## Why codes, not text?

Better Auth keeps its error **codes** stable while its English messages can change between releases. This package matches on codes only, so a wording change upstream can never break your Arabic messages. When Better Auth adds a code, the generated `ErrorCode` type changes and the build tells you exactly which translation is missing.

::: info Unofficial package
`better-auth-tarjim` is a community project. It is not affiliated with Better Auth, and it is released under the MIT License.
:::
