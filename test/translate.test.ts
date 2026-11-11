import { describe, expect, it } from "vitest";
import { ar } from "../src/ar";
import { ENGLISH_MESSAGES } from "../src/codes.generated";
import { extras } from "../src/extras";
import { APIError } from "better-auth/api";
import { messages, translate } from "../src/translate";

const ARABIC = /[\u0600-\u06FF]/;

describe("dictionary", () => {
  it("has an Arabic message for every Better Auth code", () => {
    const missing = Object.keys(ENGLISH_MESSAGES).filter((c) => !(c in ar));
    expect(missing).toEqual([]);
  });

  it("has no stale codes that Better Auth no longer ships", () => {
    const stale = Object.keys(ar).filter((c) => !(c in ENGLISH_MESSAGES));
    expect(stale).toEqual([]);
  });

  it("contains Arabic text and no empty or untranslated strings", () => {
    for (const [code, text] of Object.entries(ar)) {
      expect(text.trim(), code).not.toBe("");
      expect(text, code).toMatch(ARABIC);
    }
  });
});

describe("translate()", () => {
  it("translates a client error by code", () => {
    const err = { code: "INVALID_EMAIL_OR_PASSWORD", message: "Invalid email or password", status: 401 };
    expect(translate(err)).toBe(ar.INVALID_EMAIL_OR_PASSWORD);
  });

  it("reads the code from a thrown APIError body", () => {
    expect(translate({ status: 400, body: { code: "USER_ALREADY_EXISTS" } })).toBe(ar.USER_ALREADY_EXISTS);
  });

  it("accepts a bare code string", () => {
    expect(translate("USER_NOT_FOUND")).toBe(ar.USER_NOT_FOUND);
  });

  it("prefers user overrides", () => {
    expect(translate({ code: "USER_NOT_FOUND" }, { overrides: { USER_NOT_FOUND: "مخصص" } })).toBe("مخصص");
  });

  it("supports custom codes through overrides", () => {
    expect(translate({ code: "MY_CODE" }, { overrides: { MY_CODE: "رسالتي" } })).toBe("رسالتي");
  });

  it("handles rate limiting", () => {
    expect(translate({ status: 429, message: "Too many requests" })).toBe(extras.tooManyRequests);
  });

  it("handles network failures from every runtime", () => {
    expect(translate(new TypeError("Failed to fetch"))).toBe(extras.network); // Chrome / Firefox
    expect(translate(new TypeError("Load failed"))).toBe(extras.network); // Safari
    expect(translate(new TypeError("fetch failed"))).toBe(extras.network); // Node (undici), what Better Auth's client throws
    expect(translate(new TypeError("Network request failed"))).toBe(extras.network); // React Native
    expect(translate({ status: 0, message: "" })).toBe(extras.network);
  });

  it("recognises a network failure by its cause code", () => {
    const err = Object.assign(new Error("request failed"), { cause: { code: "ECONNREFUSED" } });
    expect(translate(err)).toBe(extras.network);
  });

  it("does not call a programming TypeError a network error", () => {
    expect(translate(new TypeError("x is not a function"))).toBe(extras.fallback);
  });

  it("does not treat a server reply as a network failure", () => {
    expect(translate({ status: 400, message: "fetch failed upstream" })).toBe(extras.fallback);
  });

  it("handles server errors without a known code", () => {
    expect(translate({ status: 500 })).toBe(extras.server);
  });

  it("falls back for unknown codes, hiding the English message by default", () => {
    const err = { code: "SOMETHING_NEW", message: "Something new", status: 400 };
    expect(translate(err)).toBe(extras.fallback);
  });

  it("can show the original message for unknown codes", () => {
    const err = { code: "SOMETHING_NEW", message: "Something new", status: 400 };
    expect(translate(err, { showOriginal: true })).toBe("Something new");
  });

  it("uses a custom fallback", () => {
    expect(translate(null, { fallback: "x" })).toBe("x");
    expect(translate(undefined)).toBe(extras.fallback);
    expect(translate(42)).toBe(extras.fallback);
  });
});

describe("thrown server APIError", () => {
  it("reads the numeric statusCode when status is a name", () => {
    const e429 = new APIError("TOO_MANY_REQUESTS", { code: "SOMETHING_NEW", message: "slow down" });
    const e500 = new APIError("INTERNAL_SERVER_ERROR", { code: "SOMETHING_NEW", message: "internal details" });
    expect(translate(e429)).toBe(extras.tooManyRequests);
    expect(translate(e500, { showOriginal: true })).toBe(extras.server); // never leak server internals
  });

  it("still prefers the error code", () => {
    const e = new APIError("BAD_REQUEST", { code: "USER_ALREADY_EXISTS", message: "User already exists" });
    expect(translate(e)).toBe(ar.USER_ALREADY_EXISTS);
  });
});

describe("dictionary lookup safety", () => {
  it.each(["toString", "constructor", "hasOwnProperty", "__proto__", "valueOf"])(
    "never resolves %s through Object.prototype",
    (code) => {
      expect(translate({ code })).toBe(extras.fallback);
      expect(translate(code)).toBe(extras.fallback);
    },
  );

  it("lets an override use a prototype-like key", () => {
    expect(translate({ code: "toString" }, { overrides: { toString: "مخصص" } })).toBe("مخصص");
  });

  it("ignores empty-string overrides and keeps the built-in message", () => {
    expect(translate({ code: "USER_NOT_FOUND" }, { overrides: { USER_NOT_FOUND: "" } })).toBe(ar.USER_NOT_FOUND);
  });

  it("types `messages` by error code", () => {
    // @ts-expect-error a typo in the code must not compile
    void messages.INVALID_EMIAL;
    expect(messages.INVALID_EMAIL).toBe(ar.INVALID_EMAIL);
  });
});
