---
description: "Frequently asked questions about better-auth-tarjim."
---

# FAQ

### Does it need `better-auth` as a dependency?

No. It only reads the `error` object that your Better Auth client (or a thrown `APIError`) gives you. `better-auth` is a development dependency used to generate the code list.

### Why does it match codes and not English messages?

Better Auth can reword its English messages in any release, but the codes are the stable contract. Matching by code means an upstream wording change cannot break your translations.

### I use a different toast library

Use `translate()` from `better-auth-tarjim/translate` and pass the string to your library. That entry point has no Sonner dependency. See the [recipe](/guide/recipes#use-another-toast-library).

### The toast reads left to right

Make sure `dir="rtl"` is set on `<Toaster />` or on the `<html>` element. See [getting started](/guide/getting-started#_2-render-the-toaster-in-rtl).

### Does it work in Next.js and on the server?

`authToast`, `withAuthToast`, and `createAuthToast` show a toast, so call them from Client Components. `translate` has no browser dependency and works in Server Components, server actions, and API routes.

### What happens when Better Auth adds a new error code?

The new code shows the generic Arabic fallback until the translation ships. A daily workflow opens a pull request with the new codes, and TypeScript fails until each one has an Arabic message. In the meantime you can translate it yourself with [`overrides`](/guide/usage#custom-messages-and-plugin-codes).

### How do I translate errors from my own Better Auth plugin?

Pass them in `overrides`, keyed by your error code. Use `createAuthToast` to set them once for the whole app.

### How big is it?

About 7 KB gzipped in total, almost all of it the Arabic dictionary. There are no runtime dependencies. The size is checked in CI against a fixed budget.

### Can I show the server's English message for unknown codes?

Yes: `translate(error, { showOriginal: true })`. Messages for 429 and 5xx responses are never replaced by the server text.

### Is it an official Better Auth package?

No. It is an independent community project and is not affiliated with Better Auth.

### Will other languages be supported?

The package is Arabic-first today. The name and architecture are language-neutral, and a locale option could be added without breaking the current API. See [Architecture](/reference/architecture#adding-another-language).

### How can I improve an Arabic message?

Edit the line in `src/ar.ts` and open a pull request. The [contributing guide](https://github.com/raidsobhi/better-auth-tarjim/blob/main/CONTRIBUTING.md) has an Arabic style guide.
