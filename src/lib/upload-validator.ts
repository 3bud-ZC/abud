import path from "path";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const ALLOWED_DOCUMENT_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const DANGEROUS_EXTENSIONS = [
  ".exe", ".bat", ".cmd", ".sh", ".bash", ".ps1",
  ".php", ".jsp", ".asp", ".aspx", ".js", ".mjs",
  ".py", ".rb", ".pl", ".cgi", ".dll", ".so",
  ".app", ".deb", ".rpm", ".dmg", ".pkg"
];

export interface UploadValidationResult {
  valid: boolean;
  error?: string;
  sanitizedName?: string;
}

export function validateUploadFile(
  file: File,
  allowedTypes: string[] = ALLOWED_IMAGE_TYPES,
  maxSize: number = MAX_IMAGE_SIZE
): UploadValidationResult {
  if (!file || file.size === 0) {
    return { valid: false, error: "لم يتم إرفاق ملف" };
  }

  if (file.size > maxSize) {
    const maxMB = Math.round(maxSize / (1024 * 1024));
    return { valid: false, error: `حجم الملف يجب أن يكون أقل من ${maxMB} ميجابايت` };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "نوع الملف غير مسموح به" };
  }

  const ext = path.extname(file.name).toLowerCase();
  if (DANGEROUS_EXTENSIONS.includes(ext)) {
    return { valid: false, error: "امتداد الملف غير آمن" };
  }

  const sanitizedName = sanitizeFileName(file.name);
  return { valid: true, sanitizedName };
}

export function sanitizeFileName(fileName: string): string {
  const ext = path.extname(fileName);
  const nameWithoutExt = path.basename(fileName, ext);
  
  const sanitized = nameWithoutExt
    .replace(/[^a-zA-Z0-9\u0600-\u06FF_-]/g, "_")
    .replace(/_{2,}/g, "_")
    .substring(0, 50);
  
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  
  return `${timestamp}_${random}_${sanitized}${ext.toLowerCase()}`;
}

export function getAllowedTypesForContext(context: "image" | "document" | "proof"): string[] {
  switch (context) {
    case "image":
      return ALLOWED_IMAGE_TYPES;
    case "document":
      return ALLOWED_DOCUMENT_TYPES;
    case "proof":
      return [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];
    default:
      return ALLOWED_IMAGE_TYPES;
  }
}

export { MAX_FILE_SIZE, MAX_IMAGE_SIZE };
