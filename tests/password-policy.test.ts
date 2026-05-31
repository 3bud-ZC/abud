import assert from "node:assert/strict";
import test from "node:test";
import { isStrongPassword, MIN_PASSWORD_LENGTH } from "../src/lib/password-policy";

test("rejects short password", () => {
  assert.equal(isStrongPassword("Ab1!short"), false);
});

test("rejects password without required character classes", () => {
  assert.equal(isStrongPassword("aaaaaaaaaaaa"), false);
  assert.equal(isStrongPassword("AAAAAAAAAAAA"), false);
  assert.equal(isStrongPassword("AaAaAaAaAaAa"), false);
});

test("accepts valid strong password", () => {
  const sample = "AbudStrong!2026";
  assert.ok(sample.length >= MIN_PASSWORD_LENGTH);
  assert.equal(isStrongPassword(sample), true);
});
