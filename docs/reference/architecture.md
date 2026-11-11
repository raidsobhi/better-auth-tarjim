---
description: "How better-auth-tarjim is designed: the runtime pipeline, the generated code list, packaging, quality gates, and automation."
---

# Architecture

`better-auth-tarjim` turns Better Auth errors into Arabic messages for toast UIs. It keeps Better Auth as the source of truth, guarantees that every code in a release has an Arabic message, and stays small and dependency-free.

<script setup>
import ArchitectureDiagram from "../.vitepress/theme/components/ArchitectureDiagram.vue";
</script>

## How it works

<ArchitectureDiagram />

The package has two sides:

- **Generation:** during development, it discovers error codes from the installed Better Auth packages.
- **Runtime:** the published library maps those codes to Arabic messages.

The generated code list is the contract between them. The Arabic dictionary is typed against it, so a missing or obsolete translation is a compile-time error.

## Translation

The translator accepts common error shapes: Better Auth client errors, server errors with a response body, request/network failures, and bare error-code strings.

It resolves a message in this order:

1. Consumer overrides, including custom plugin codes
2. The built-in Arabic dictionary
3. Rate limiting (`429`)
4. Network failure
5. Server errors (`5xx`)
6. The original server message, only when enabled
7. A consumer fallback or generic Arabic fallback

A code is identified by the code alone, never by its English wording. A known code always wins, even if its English message resembles a network error.

## Toast integration

Sonner integration is optional. The package provides helpers to show the translated message as an error toast, handle both returned errors and rejected promises, and configure defaults once.

## Keeping it in sync

Automated checks ensure that:

- The code list matches the installed Better Auth version.
- Every error code has an Arabic translation.
- The package builds, stays within its size budget, and works in both ESM and CommonJS.
- A release cannot publish stale generated data or failing tests.

A scheduled workflow upgrades Better Auth, regenerates the code list, and opens a pull request whose body reports whether translations are missing.

## Design choices

- **Codes over English text:** error codes are stable; messages can change.
- **Generated code list:** prevents manual drift as Better Auth evolves.
- **Typed Arabic dictionary:** makes missing translations a compile-time error.
- **Zero runtime dependencies:** keeps installation and supply-chain surface small.
- **Optional Sonner:** consumers can use another toast library or translation only.
- **Separate translation entry:** non-Sonner consumers avoid an unnecessary dependency.

## Adding another language {#adding-another-language}

The package is language-neutral by design and Arabic-first by release. Adding a locale does not change the public API:

1. Add a dictionary beside `src/ar.ts`, keyed by the same `ErrorCode` union.
2. Thread a `locale` option through `TranslateOptions`, and make `src/ar.ts` the default.
3. Keep `better-auth-tarjim/translate` free of any browser dependency, so the translation entry point stays usable on the server.

Consumers that only need one language should not pay for the others. Prefer a separate entry point or a locale-scoped import over a single bundle containing every dictionary.

## Limitations

The package currently supports Arabic only. Duplicate Better Auth codes keep the first definition and produce a warning. Network detection is heuristic, while a numeric status or known error code always takes precedence.
