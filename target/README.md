# CVE-2025-29927 易受攻击的 Next.js 环境

此目录包含一个易受攻击的 Next.js 应用程序，用于测试 CVE-2025-29927。

## ⚠️ 警告

这是一个故意设计的易受攻击应用程序，仅用于安全研究和教育目的。

**切勿**在生产环境中部署此应用程序或在适当隔离的情况下将其暴露在互联网上。

## 🚀 使用Docker快速开始

```bash
# 构建并启动易受攻击的环境
docker-compose up -d

# 访问应用程序
open http://localhost:3000
```

## 🛠️ 手动搭建

### 先决条件

- Node.js 18+ 和 npm
- Next.js 15.1.0（易受攻击版本）

### 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

应用程序将在 `http://localhost:3000` 上可用

## 🔍 测试漏洞

### 正常行为（受保护）

访问 `http://localhost:3000/admin` - 您应该被重定向到登录页面。

### 利用（绕过）

使用提供的利用工具：

```bash
python ../exploit/cve_2025_29927.py -u http://localhost:3000
```

您现在应该能够在没有身份验证的情况下访问管理面板。

## 📁 项目结构

```
target/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 首页
│   │   ├── admin/
│   │   │   └── page.tsx      # 受保护的管理页面
│   │   └── middleware.ts     # 易受攻击的中间件
├── package.json
├── next.config.js
├── Dockerfile
└── docker-compose.yml
```

## 🔬 漏洞详情

此应用程序中的中间件实施了身份验证，但易受 CVE-2025-29927 影响。

**关键漏洞**: 中间件没有正确验证 `x-middleware-subrequest` 标头，允许攻击者绕过身份验证检查。

## 🛡️ 修复

要修复此漏洞：

1. **升级Next.js**
   ```bash
   npm install next@15.2.3
   # 或
   npm install next@14.2.25
   ```

2. **额外的中间件保护**
   在中间件中添加显式的标头验证：
   ```typescript
   export function middleware(request: NextRequest) {
     // 拒绝带有内部标头的外部请求
     if (request.headers.get('x-middleware-subrequest') &&
         !request.ip.startsWith('127.0.0.1')) {
       return NextResponse.redirect(new URL('/login', request.url));
     }
     // ... 其余中间件逻辑
   }
   ```

## 📝 API端点

| 端点 | 保护 | 描述 |
|----------|-------------|-------------|
| `/` | 无 | 首页 |
| `/admin` | 中间件 | 受保护的管理面板 |
| `/api/admin` | 中间件 | 管理API（易受攻击） |
| `/api/config` | 中间件 | 配置API（易受攻击） |

## 🧪 测试场景

1. **访问控制测试**
   - 对 `/admin` 的正常请求 → 302重定向
   - 对 `/admin` 的利用请求 → 200 OK（绕过）

2. **API访问测试**
   - 对 `/api/config` 的正常请求 → 403 禁止访问
   - 对 `/api/config` 的利用请求 → 200 OK（绕过）

3. **权限提升测试**
   - 在没有身份验证的情况下访问管理功能
   - 未经授权修改配置

## 🚨 法律声明

此易受攻击的环境用于：
- ✅ 安全研究和教育
- ✅ 漏洞测试和验证
- ✅ 安全培训和意识

此环境不用于：
- ❌ 生产部署
- ❌ 非法黑客活动
- ❌ 未经授权的访问尝试

## 📞 支持

如有问题或疑问，请参阅主README.md文件。
