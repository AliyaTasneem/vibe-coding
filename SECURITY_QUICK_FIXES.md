# Security Quick Fixes

## Immediate Actions (5 minutes)

### 1. Remove Sensitive Console.logs

**Files to update:**

#### data-service.js
Find and update these lines:

**Line ~18:** Remove or wrap
```javascript
// BEFORE:
console.log('DataService initialized with AWS backend');

// AFTER:
// console.log('DataService initialized with AWS backend'); // Debug only
```

**Line ~59:**
```javascript
// BEFORE:
const user = await Auth.currentAuthenticatedUser();

// AFTER:
const user = await Auth.currentAuthenticatedUser();
// Don't log user details in production
```

**Line ~102:**
```javascript
// BEFORE:
console.log('Data saved to backend successfully');

// AFTER:
// console.log('Data saved to backend successfully'); // Debug only
```

**Line ~142:**
```javascript
// BEFORE:
console.log('Quiz result saved to backend');

// AFTER:
// console.log('Quiz result saved to backend'); // Debug only
```

**Line ~277:**
```javascript
// BEFORE:
console.log('Leaderboard subscription ended after 5 minutes');

// AFTER:
// console.log('Leaderboard subscription ended after 5 minutes'); // Debug only
```

#### app.js
Find and update:

**Line ~650:**
```javascript
// BEFORE:
console.log('User is authenticated:', user.attributes.email);

// AFTER:
// console.log('User authenticated'); // Don't log email
```

**Line ~653:**
```javascript
// BEFORE:
console.log('User not authenticated, showing login modal');

// AFTER:
// console.log('User not authenticated'); // No sensitive info
```

### 2. Add Production Check (Recommended)

Create a new file: `logger.js`

```javascript
// Simple logger that respects environment
const isDevelopment = window.location.hostname === 'localhost' ||
                      window.location.hostname === '127.0.0.1';

const logger = {
    log: (...args) => {
        if (isDevelopment) {
            console.log(...args);
        }
    },
    error: (...args) => {
        // Always log errors
        console.error(...args);
    },
    warn: (...args) => {
        if (isDevelopment) {
            console.warn(...args);
        }
    }
};

// Usage:
// logger.log('Debug info'); // Only shows on localhost
// logger.error('Error info'); // Always shows
```

Then include in index.html:
```html
<script src="logger.js"></script>
```

And replace all `console.log` with `logger.log`.

### 3. Add HTTPS Redirect

Add to `index.html` (after `<body>` tag):

```html
<script>
// Force HTTPS in production
if (window.location.protocol !== 'https:' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1') {
    window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
</script>
```

### 4. Add Content Security Policy

Add to `index.html` (in `<head>` section):

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    connect-src 'self' https://*.amazonaws.com https://*.amplifyapp.com;
    font-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
">
```

---

## GitHub Security Settings (2 minutes)

### Enable Branch Protection

1. Go to: https://github.com/AliyaTasneem/vibe-coding/settings/branches
2. Click "Add branch protection rule"
3. Branch name pattern: `master`
4. Check:
   - ✅ Require pull request reviews before merging
   - ✅ Require approvals: 1
   - ✅ Dismiss stale reviews when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators
5. Click "Create"

### Enable Security Features

1. Go to: https://github.com/AliyaTasneem/vibe-coding/settings/security_analysis
2. Enable:
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates

---

## AWS Security Checklist (After Deployment)

### Cognito Settings:
- [ ] Password minimum length: 8
- [ ] Require uppercase: Yes
- [ ] Require lowercase: Yes
- [ ] Require numbers: Yes
- [ ] Require symbols: Optional
- [ ] MFA: Optional (can enable later)

### AppSync Settings:
- [ ] API Key expiration: Disabled (use Cognito only)
- [ ] CloudWatch logging: Enabled
- [ ] Field-level logging: Disabled (performance)
- [ ] Query depth limit: 10

### DynamoDB Settings:
- [ ] Encryption at rest: Enabled (default)
- [ ] Point-in-time recovery: Enabled
- [ ] Backup: On-demand (or continuous)
- [ ] TTL: Enabled for old data (optional)

### Lambda Settings:
- [ ] Memory: 128 MB (sufficient)
- [ ] Timeout: 10 seconds
- [ ] Reserved concurrency: Not needed
- [ ] Environment variables: Use for config (not secrets)
- [ ] VPC: Not needed

### IAM Permissions:
- [ ] Amplify CLI user: AdministratorAccess-Amplify
- [ ] Lambda execution role: Minimal DynamoDB permissions
- [ ] AppSync role: Query/Mutation on specific tables

### CloudWatch:
- [ ] Lambda error alarms: >5 errors in 5 minutes
- [ ] API Gateway 5xx alarms: >10 in 5 minutes
- [ ] DynamoDB throttle alarms: >100 in 5 minutes
- [ ] Billing alarms: $5, $10, $20

---

## Quick Audit Script

Run this before production:

```bash
# Check for sensitive data in code
echo "Checking for potential secrets..."
grep -r "password\s*=\s*['\"]" *.js || echo "✅ No hardcoded passwords"
grep -r "AKIA" *.js || echo "✅ No AWS keys"
grep -r "api_key\s*=" *.js || echo "✅ No API keys"

# Check .gitignore is working
echo -e "\nChecking .gitignore..."
git check-ignore aws-exports.js && echo "✅ aws-exports.js ignored" || echo "⚠️ Check .gitignore"
git check-ignore .env && echo "✅ .env ignored" || echo "✅ .env not present"

# Check for console.logs
echo -e "\nConsole.log statements found:"
grep -n "console.log" app.js data-service.js | wc -l
echo "(Should be 0 or very few)"

# List all committed files
echo -e "\nFiles in repository:"
git ls-files | grep -E "secret|credential|\.env|password" || echo "✅ No sensitive files committed"
```

---

## After Fixes Complete

Run this checklist:

- [ ] Console.logs removed/commented
- [ ] HTTPS redirect added
- [ ] CSP headers added
- [ ] GitHub branch protection enabled
- [ ] GitHub security features enabled
- [ ] Security audit reviewed
- [ ] Ready for AWS deployment

---

## Priority Levels

**🔴 Critical (Do Now):**
- None! Your code is secure

**🟡 High (Before Production):**
- Remove sensitive console.logs (5 min)
- Enable GitHub branch protection (2 min)
- Add CSP headers (2 min)

**🟢 Medium (First Week):**
- Implement logger.js
- Review XSS prevention
- Set up AWS monitoring

**⚪ Low (Future):**
- Add rate limiting
- Penetration testing
- MFA requirement

---

## Verification

After applying fixes, verify:

```bash
# 1. No sensitive logs
grep -r "console.log.*email\|console.log.*password\|console.log.*key" *.js

# 2. HTTPS redirect present
grep -r "https:" index.html

# 3. CSP present
grep -r "Content-Security-Policy" index.html

# 4. .gitignore working
git status --ignored | grep aws-exports
```

All checks should pass! ✅

---

**Time to complete:** 10-15 minutes
**Impact:** Hardens security before production
**Priority:** High (but not critical - no vulnerabilities exist)
