import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("sonner", () => ({ toast: { error: vi.fn(() => "id-1") } }));

import { toast } from "sonner";
import { ar } from "../src/ar";
import { extras } from "../src/extras";
import { authToast, createAuthToast, withAuthToast } from "../src/index";

const error = vi.mocked(toast.error);
beforeEach(() => error.mockClear());

describe("authToast", () => {
  it("shows the Arabic message and returns the toast id", () => {
    const id = authToast({ code: "INVALID_PASSWORD" });
    expect(error).toHaveBeenCalledWith(ar.INVALID_PASSWORD, undefined);
    expect(id).toBe("id-1");
  });

  it("forwards Sonner options", () => {
    authToast({ code: "INVALID_PASSWORD" }, { toast: { id: "auth", duration: 3000 } });
    expect(error).toHaveBeenCalledWith(ar.INVALID_PASSWORD, { id: "auth", duration: 3000 });
  });
});

describe("withAuthToast", () => {
  it("toasts on error and returns the result untouched", async () => {
    const result = { data: null, error: { code: "USER_NOT_FOUND", status: 404 } };
    await expect(withAuthToast(Promise.resolve(result))).resolves.toBe(result);
    expect(error).toHaveBeenCalledTimes(1);
  });

  it("toasts a network failure (rejection) and re-throws it", async () => {
    const failure = new TypeError("fetch failed");
    await expect(withAuthToast(Promise.reject(failure))).rejects.toBe(failure);
    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0]?.[0]).toBe(extras.network);
  });

  it("applies options to rejections too", async () => {
    await expect(
      withAuthToast(Promise.reject(new TypeError("Failed to fetch")), { toast: { id: "net" } }),
    ).rejects.toBeInstanceOf(TypeError);
    expect(error).toHaveBeenCalledWith(extras.network, { id: "net" });
  });

  it("stays silent on success", async () => {
    await withAuthToast(Promise.resolve({ data: { ok: true }, error: null }));
    expect(error).not.toHaveBeenCalled();
  });
});

describe("createAuthToast", () => {
  it("applies default overrides and lets calls add their own", () => {
    const t = createAuthToast({ overrides: { USER_NOT_FOUND: "A" } });
    t.authToast({ code: "USER_NOT_FOUND" });
    t.authToast({ code: "INVALID_PASSWORD" }, { overrides: { INVALID_PASSWORD: "B" } });
    expect(error.mock.calls[0]?.[0]).toBe("A");
    expect(error.mock.calls[1]?.[0]).toBe("B");
  });

  it("merges Sonner options, with the call winning over the defaults", () => {
    const t = createAuthToast({ toast: { duration: 5000, id: "a" } });
    t.authToast({ code: "USER_NOT_FOUND" }, { toast: { id: "b" } });
    expect(error).toHaveBeenCalledWith(ar.USER_NOT_FOUND, { duration: 5000, id: "b" });
  });
});
