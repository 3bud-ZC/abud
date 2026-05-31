import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeFileName, validateUploadFile } from "../src/lib/upload-validator";

test("sanitizeFileName removes unsafe chars and keeps extension", () => {
  const out = sanitizeFileName("../../evil<script>.PNG");
  assert.ok(out.endsWith(".png"));
  assert.equal(out.includes("<"), false);
  assert.equal(out.includes(">"), false);
});

test("validateUploadFile rejects dangerous extension", () => {
  const file = new File(["x"], "malicious.exe", { type: "application/x-msdownload" });
  const result = validateUploadFile(file, ["application/x-msdownload"], 1024);
  assert.equal(result.valid, false);
});
