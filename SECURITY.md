# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

We take the security of LearnQuest seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please DO NOT:

- Open a public GitHub issue for security vulnerabilities
- Disclose the vulnerability publicly before it has been addressed
- Exploit the vulnerability for malicious purposes

### Please DO:

1. **Email the repository owner privately** with details of the vulnerability
2. Include steps to reproduce the vulnerability
3. Allow reasonable time for us to address the issue before public disclosure
4. Practice responsible disclosure (90-day disclosure window)

### What to Include in Your Report:

- Type of vulnerability (XSS, SQL injection, authentication bypass, etc.)
- Step-by-step instructions to reproduce the issue
- Potential impact of the vulnerability
- Suggested fix (if any)
- Your contact information for follow-up

## Security Update Process

1. **Report Received:** We acknowledge receipt within 48 hours
2. **Investigation:** We investigate and validate the vulnerability
3. **Fix Development:** We develop and test a fix
4. **Disclosure:** We coordinate disclosure with the reporter
5. **Release:** We release the security patch
6. **Announcement:** We publish a security advisory (if appropriate)

## Security Best Practices for Users

### For Students/End Users:

- Use a strong, unique password
- Never share your account credentials
- Log out from shared devices
- Keep your email account secure (for password resets)
- Report suspicious activity immediately

### For Developers/Contributors:

- Never commit AWS credentials or secrets to the repository
- Use environment variables for configuration
- Follow secure coding practices
- Keep dependencies up to date
- Review security audit reports regularly

## Known Security Measures

This application implements:

- ✅ AWS Cognito authentication with email verification
- ✅ GraphQL authorization with owner-based access control
- ✅ HTTPS encryption for all traffic
- ✅ Content Security Policy (CSP) headers
- ✅ Secure password requirements (8+ chars, uppercase, lowercase, numbers)
- ✅ No hardcoded credentials or secrets
- ✅ DynamoDB encryption at rest
- ✅ Input validation and sanitization
- ✅ Session management via AWS Cognito

## Security Audit

Last security audit: February 28, 2026
Overall security score: 89/100 (Excellent)

For detailed findings, see [SECURITY_AUDIT.md](./SECURITY_AUDIT.md)

## Third-Party Dependencies

We use the following major security-critical dependencies:

- **AWS Amplify SDK** - Official AWS SDK, regularly updated
- **AWS Cognito** - Managed authentication service
- **AWS AppSync** - Managed GraphQL API
- **Amazon DynamoDB** - Managed NoSQL database with encryption

We monitor these dependencies for security updates through:
- GitHub Dependabot alerts
- Regular dependency audits
- AWS security bulletins

## Security Contact

For security issues that should not be disclosed publicly, please contact the repository owner through GitHub directly.

**Response Time:**
- Critical vulnerabilities: 48 hours
- High severity: 7 days
- Medium/Low severity: 30 days

## Acknowledgments

We appreciate the security research community's efforts in keeping our project secure. Security researchers who responsibly disclose vulnerabilities will be acknowledged (if desired) in our security advisories.

## Compliance

This project follows:
- OWASP Top 10 security guidelines
- AWS Security Best Practices
- Web Application Security best practices
- Responsible disclosure guidelines

## Additional Resources

- [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) - Comprehensive security audit
- [SECURITY_QUICK_FIXES.md](./SECURITY_QUICK_FIXES.md) - Security hardening guide
- [AWS Security Best Practices](https://aws.amazon.com/security/best-practices/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Last Updated:** February 28, 2026
**Next Review:** After AWS deployment
