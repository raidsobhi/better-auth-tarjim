# Changelog

All notable changes are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/) and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0]

### Added
- Arabic (Modern Standard Arabic) messages for all 262 error codes in Better Auth 1.7.20:
  core, admin, anonymous, API key, captcha, device authorization, email OTP, generic OAuth,
  multi-session, OAuth popup, organization, passkey, phone number, Stripe, two-factor and username.
- `authToast`, `withAuthToast` and `createAuthToast` for Sonner (the toast used by shadcn/ui).
- `translate` and `messages`, also available without Sonner from `better-auth-tarjim/translate`.
- Fallbacks for rate limiting (429), network failures, server errors and unknown codes.
- `npm run sync` generates the code list from the installed Better Auth packages.
- Documentation site built with VitePress and deployed to GitHub Pages: getting started, usage, API reference, architecture and the generated error-code list.
- CI, a scheduled workflow that opens a PR when Better Auth ships new codes, and a release workflow.
- Published as `better-auth-tarjim` (locale-neutral name) with Arabic as the first locale.

### Fixed
- `withAuthToast` now toasts network failures. The Better Auth client rejects instead of returning `{ error }`, so those were previously unhandled. The rejection is re-thrown after the toast.
- `translate` reads the numeric `statusCode` of a thrown server `APIError`, so 429 and 5xx are recognised (and server internals are never shown).
- Code lookup uses own properties only: codes like `toString` or `__proto__` no longer return non-strings. Empty-string overrides are ignored.
- Network detection matches Node's `fetch failed` and a failed request's `cause`, and no longer labels every `TypeError` as a network error.
- `messages` is typed by `ErrorCode`, so a mistyped code is a compile error.
- `npm run sync` is deterministic across machines (sorted, documented precedence), warns about skipped entries and conflicting duplicates, and refuses to write empty output.
- `npm run sync` now also generates `docs/codes.json` — the source the documentation site's error-code table reads — and `sync:check` fails when it is stale, so the site cannot drift from the shipped code list.
- The FAQ link to the architecture page's "Adding another language" section now resolves, in English and Arabic.
- The README links to the architecture guide and to the generated code list point at pages that exist.

### Changed
- Development requires Node 22.18+; CI now builds on 22 and 24 and tests the built package on Node 18 and 20.
- The code list is regenerated from Better Auth 1.7.20.
- `translate` and `messages` are exported from `better-auth-tarjim/translate` only. The main entry imports Sonner statically, so re-exporting them there made `import { translate } from "better-auth-tarjim"` fail for consumers who do not install Sonner. The main entry now exports `authToast`, `withAuthToast` and `createAuthToast`.
- `npm run smoke` now asserts that only the main entry references Sonner, so the Sonner-free `/translate` entry cannot regress silently.
