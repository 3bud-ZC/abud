import path from "path";

// Allowed file types with their MIME types
export const ALLOWED_FILE_TYPES = {
  images: {
    extensions: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
    mimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  documents: {
    extensions: [".pdf", ".doc", ".docx"],
    mimeTypes: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  proofs: {
    extensions: [".jpg", ".jpeg", ".png", ".pdf"],
    mimeTypes: ["image/jpeg", "image/png", "application/pdf"],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

// Dangerous extensions that should never be allowed
const DANGEROUS_EXTENSIONS = [
  ".exe", ".bat", ".cmd", ".sh", ".ps1", ".app", ".deb", ".rpm",
  ".php", ".asp", ".aspx", ".jsp", ".js", ".mjs", ".cjs",
  ".py", ".rb", ".pl", ".cgi",
  ".dll", ".so", ".dylib",
  ".scr", ".vbs", ".jar", ".war",
];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  sanitizedName?: string;
}

/**
 * Validate file type and size
 */
export function validateFile(
  file: File,
  allowedCategory: keyof typeof ALLOWED_FILE_TYPES
): FileValidationResult {
  const category = ALLOWED_FILE_TYPES[allowedCategory];

  // Check file size
  if (file.size === 0) {
    return { valid: false, error: "الملف فارغ" };
  }

  if (file.size > category.maxSize) {
    const maxSizeMB = Math.round(category.maxSize / (1024 * 1024));
    return { valid: false, error: `حجم الملف يجب أن يكون أقل من ${maxSizeMB} ميجابايت` };
  }

  // Get file extension
  const ext = path.extname(file.name).toLowerCase();

  // Check for dangerous extensions
  if (DANGEROUS_EXTENSIONS.includes(ext)) {
    return { valid: false, error: "نوع الملف غير مسموح به لأسباب أمنية" };
  }

  // Check if extension is allowed
  if (!category.extensions.includes(ext)) {
    return { valid: false, error: `نوع الملف غير مسموح. الأنواع المسموحة: ${category.extensions.join(", ")}` };
  }

  // Check MIME type
  if (!category.mimeTypes.includes(file.type)) {
    return { valid: false, error: "نوع الملف غير صحيح" };
  }

  // Generate safe filename
  const sanitizedName = generateSafeFileName(file.name);

  return { valid: true, sanitizedName };
}

/**
 * Generate a safe, unique filename
 */
export function generateSafeFileName(originalName: string): string {
  // Get extension
  const ext = path.extname(originalName).toLowerCase();
  
  // Remove extension from name
  const nameWithoutExt = path.basename(originalName, ext);
  
  // Sanitize filename: remove special chars, keep only alphanumeric, dash, underscore
  const sanitized = nameWithoutExt
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_{2,}/g, "_")
    .substring(0, 50); // Limit length
  
  // Generate unique timestamp + random string
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  
  // Combine: sanitized_timestamp_random.ext
  return `${sanitized}_${timestamp}_${random}${ext}`;
}

/**
 * Sanitize path to prevent directory traversal
 */
export function sanitizePath(filePath: string): string {
  // Remove any path traversal attempts
  return path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, "");
}
