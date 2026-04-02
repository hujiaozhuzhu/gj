# CVE-2025-29927 Vulnerable Next.js Environment

This directory contains a vulnerable Next.js application for testing CVE-2025-29927.

## ⚠️ WARNING

This is a deliberately vulnerable application intended for security research and educational purposes only.

**DO NOT** deploy this in production or expose it to the internet without proper isolation.

## 🚀 Quick Start with Docker

```bash
# Build and start the vulnerable environment
docker-compose up -d

# Access the application
open http://localhost:3000
```

## 🛠️ Manual Setup

### Prerequisites

- Node.js 18+ and npm
- Next.js 15.1.0 (vulnerable version)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔍 Testing the Vulnerability

### Normal Behavior (Protected)

Visit `http://localhost:3000/admin` - you should be redirected to login page.

### Exploitation (Bypassed)

Use the provided exploit:

```bash
python ../exploit/cve_2025_29927.py -u http://localhost:3000
```

You should now be able to access the admin panel without authentication.

## 📁 Project Structure

```
target/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── admin/
│   │   │   └── page.tsx      # Protected admin page
│   │   └── middleware.ts     # Vulnerable middleware
├── package.json
├── next.config.js
├── Dockerfile
└── docker-compose.yml
```

## 🔬 Vulnerability Details

The middleware in this application implements authentication but is vulnerable to CVE-2025-29927.

**Key Vulnerability**: The middleware doesn't properly validate the `x-middleware-subrequest` header, allowing attackers to bypass authentication checks.

## 🛡️ Remediation

To fix this vulnerability:

1. **Upgrade Next.js**
   ```bash
   npm install next@15.2.3
   # or
   npm install next@14.2.25
   ```

2. **Additional Middleware Protection**
   Add explicit header validation in middleware:
   ```typescript
   export function middleware(request: NextRequest) {
     // Reject external requests with internal headers
     if (request.headers.get('x-middleware-subrequest') &&
         !request.ip.startsWith('127.0.0.1')) {
       return NextResponse.redirect(new URL('/login', request.url));
     }
     // ... rest of middleware logic
   }
   ```

## 📝 API Endpoints

| Endpoint | Protection | Description |
|----------|-------------|-------------|
| `/` | None | Home page |
| `/admin` | Middleware | Protected admin panel |
| `/api/admin` | Middleware | Admin API (vulnerable) |
| `/api/config` | Middleware | Configuration API (vulnerable) |

## 🧪 Testing Scenarios

1. **Access Control Test**
   - Normal request to `/admin` → 302 redirect
   - Exploit request to `/admin` → 200 OK (bypassed)

2. **API Access Test**
   - Normal request to `/api/config` → 403 Forbidden
   - Exploit request to `/api/config` → 200 OK (bypassed)

3. **Privilege Escalation Test**
   - Access admin functionality without authentication
   - Modify configuration without authorization

## 🚨 Legal Notice

This vulnerable environment is for:
- ✅ Security research and education
- ✅ Vulnerability testing and validation
- ✅ Security training and awareness

This environment is NOT for:
- ❌ Production deployment
- ❌ Illegal hacking activities
- ❌ Unauthorized access attempts

## 📞 Support

For questions or issues, please refer to the main README.md file.
