# CVE-2025-29927 - Next.js 中间件授权绕过 POC

> ⚠️ **法律声明**: 此工具仅用于安全研究、授权渗透测试和教育目的。在未获得明确许可的情况下，将此工具用于目标系统是非法且不道德的。

## 📋 概述

**CVE-2025-29927** 是 Next.js 中的一个关键安全漏洞，攻击者可以通过利用 `x-middleware-subrequest` 标头的不当处理来绕过基于中间件的授权控制。

### 🎯 漏洞详情

| 属性 | 值 |
|-----------|--------|
| **CVE ID** | CVE-2025-29927 |
| **CVSS 评分** | 9.8 (严重) |
| **受影响版本** | Next.js 13.4.0 - 15.2.3 |
| **修复版本** | Next.js 14.2.25+, 15.2.3+ |
| **发现日期** | 2025年3月21日 |
| **漏洞类型** | 授权绕过 |

### 🔍 技术详情

**根本原因**: Next.js 中间件错误处理 `x-middleware-subrequest` 标头，将带有此标头的请求视为内部可信的子请求，从而绕过授权检查。

**影响**: 攻击者可以在未经身份验证的情况下访问受保护的路由（如 `/admin`、`/api/sensitive`）。

## 🚀 功能特性

- ✅ 单文件 Python 利用工具
- ✅ 自动化漏洞检测
- ✅ 批量扫描支持
- ✅ 基于Docker的易受攻击环境
- ✅ 详细的日志记录和输出
- ✅ 无外部依赖（仅 `requests`）

## 📦 安装

```bash
# 克隆仓库
git clone https://github.com/hujiaozhuzhu/CVE-2025-29927-POC.git
cd CVE-2025-29927-POC

# 安装依赖
pip install -r requirements.txt
```

## 🎯 使用方法

### 快速开始（利用单个目标）

```bash
python exploit/cve_2025_29927.py -u http://127.0.0.1:3000
```

### 高级选项

```bash
# 自定义管理路径
python exploit/cve_2025_29927.py -u http://target.com -p /admin

# 详细输出
python exploit/cve_2025_29927.py -u http://target.com -v

# 保存结果到文件
python exploit/cve_2025_29927.py -u http://target.com -o results.txt
```

### 批量扫描

```bash
# 从文件扫描多个目标
python exploit/batch_scanner.py -f targets.txt

# 扫描IP范围
python exploit/batch_scanner.py --range 192.168.1.0-255
```

## 🏗️ 搭建易受攻击环境

### 使用Docker（推荐）

```bash
cd target
docker-compose up -d
```

访问易受攻击的应用: `http://localhost:3000`

### 手动搭建

```bash
cd target
npm install
npm run dev
```

## 📊 漏洞检测流程

1. **正常请求**: 发送不带利用标头的GET请求
   - 预期: 302/401/403 (被中间件阻止)

2. **利用请求**: 发送带有 `x-middleware-subrequest: 1` 的GET请求
   - 预期: 200 (绕过中间件)
   - 成功: 响应包含管理内容

## 🛡️ 缓解与防御

### 立即行动

1. **升级Next.js**
   ```bash
   npm install next@latest
   # 或
   npm install next@14.2.25
   ```

2. **在反向代理中阻止易受攻击的标头**
   ```nginx
   location / {
     deny x-middleware-subrequest;
     # ... 其余配置
   }
   ```

### 长期建议

- 实施纵深防御（多层认证）
- 定期安全审计
- 保持依赖更新
- 使用Web应用防火墙（WAF）

## 📚 文档

- [漏洞分析](docs/vuln_analysis.md)
- [使用指南](docs/usage_guide.md)
- [防御与修复](docs/defense.md)

## 🧪 测试

### 手动测试

```bash
# 运行漏洞测试
python exploit/cve_2025_29927.py -u http://localhost:3000 -t
```

### 自动化测试

```bash
# 运行测试套件
python tests/test_exploit.py
```

## 🔬 研究参考

- [NVD条目](https://nvd.nist.gov/vuln/detail/CVE-2025-29927)
- [Next.js安全公告](https://github.com/vercel/next.js/security/advisories)
- [技术分析](https://securitylabs.datadoghq.com/articles/nextjs-middleware-auth-bypass/)

## 📝 更新日志

### v1.0.0 (2025-04-02)
- 初始发布
- 单目标利用
- 批量扫描支持
- Docker易受攻击环境
- 全面的文档

## 👥 贡献者

- [您的姓名] - 初始实现

## 📄 许可证

此项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件。

## ⚠️ 法律声明

**重要**: 此工具仅用于教育和授权安全测试目的。

- 仅在您拥有或获得明确许可的测试的系统上使用
- 未经授权访问计算机系统是非法的
- 向供应商负责任地报告漏洞
- 遵循负责任披露指南

**使用此工具，您同意:**
- 遵守所有适用的法律和法规
- 仅用于授权的安全测试
- 负责任地报告发现的漏洞
- 不用于恶意目的

## 📞 报告漏洞

如果您发现此工具的问题或发现新漏洞，请负责任地报告：

1. 联系供应商（Vercel/Next.js团队）
2. 遵循负责任披露指南
3. 考虑加入漏洞赏金计划

## 🙏 致谢

- Vercel/Next.js团队的及时披露和修复
- 安全研究社区的分析和测试
- 漏洞发现者

---

**记住**: 安全研究应该始终是合乎道德和合法的。用您的技能使互联网更安全! 🛡️
