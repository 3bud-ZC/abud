# Security Guidelines - ABUD Platform

## 🔒 Security Enhancements Implemented

### 1. Session Security
- ✅ Removed insecure fallback secret
- ✅ Enforced minimum 32-character SESSION_SECRET
- ✅ Changed cookie `sameSite` from `lax` to `strict`
- ✅ Enabled `httpOnly` and `secure` flags on cookies

### 2. Upload Security
- ✅ File type validation (whitelist approach)
- ✅ File size limits (5MB for images, 10MB for documents)
- ✅ Dangerous file extension blocking
- ✅ File name sanitization to prevent path traversal
- ✅ Secure file naming with timestamps and random strings

### 3. Rate Limiting
Implemented on the following endpoints:
- `/api/auth/login` - 5 requests per 15 minutes
- `/api/upload` - 10 requests per minute
- `/api/contact` - 3 requests per minute
- `/api/ai` - 10 requests per minute
- `/api/newsletter` - 5 requests per minute

### 4. Security Headers
Added via Next.js config:
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=31536000`
- `X-DNS-Prefetch-Control: on`
- Removed `X-Powered-By` header

### 5. Error Handling
- ✅ No sensitive error details exposed in production
- ✅ Proper error logging without exposing stack traces
- ✅ User-friendly error messages

## 🚨 Critical Security Checklist

Before deploying to production, ensure:

1. **Environment Variables**
   ```bash
   # Generate a secure SESSION_SECRET
   openssl rand -base64 32
   ```
   - [ ] `SESSION_SECRET` is set and at least 32 characters
   - [ ] `DATABASE_URL` uses a strong password
   - [ ] No secrets are committed to git

2. **Database**
   - [ ] PostgreSQL user has minimal required permissions
   - [ ] Database backups are configured
   - [ ] Connection pooling is properly configured

3. **File Uploads**
   - [ ] Upload directory (`public/uploads`) has proper permissions
   - [ ] Nginx/server is configured to prevent script execution in uploads
   - [ ] Regular cleanup of old uploaded files

4. **SSL/TLS**
   - [ ] SSL certificate is valid and up to date
   - [ ] HTTPS is enforced (HTTP redirects to HTTPS)
   - [ ] HSTS header is set

5. **Dependencies**
   ```bash
   # Check for vulnerabilities
   npm audit
   ```

## 🛡️ Allowed File Types

### Images (Upload & Proof)
- `image/jpeg`, `image/jpg`
- `image/png`
- `image/webp`
- `image/gif`

### Documents (Proof only)
- `application/pdf`

### Blocked Extensions
All executable and script files are blocked including:
`.exe`, `.bat`, `.cmd`, `.sh`, `.php`, `.jsp`, `.asp`, `.js`, `.py`, etc.

## 📝 Rate Limit Configuration

Edit `src/lib/rate-limiter.ts` to adjust limits:

```typescript
const RATE_LIMITS = {
  auth: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  upload: { maxRequests: 10, windowMs: 60 * 1000 },
  // ...
};
```

## 🔍 Security Monitoring

### Logs to Monitor
- Failed login attempts
- Rate limit violations (429 responses)
- Upload validation failures
- Database connection errors

### PM2 Logs
```bash
pm2 logs abud --lines 100
pm2 logs abud --err
```

## 🚀 Deployment Security

1. **Never commit `.env` files**
2. **Use GitHub Secrets for CI/CD**
3. **Regularly update dependencies**
4. **Monitor application logs**
5. **Set up automated backups**

## 📞 Security Incident Response

If you suspect a security breach:
1. Immediately rotate `SESSION_SECRET`
2. Check logs for suspicious activity
3. Review recent file uploads
4. Audit database for unauthorized changes
5. Update all passwords

## 🔄 Regular Maintenance

- [ ] Weekly: Check `npm audit` for vulnerabilities
- [ ] Monthly: Review and rotate secrets
- [ ] Monthly: Clean up old uploaded files
- [ ] Quarterly: Security audit of custom code
