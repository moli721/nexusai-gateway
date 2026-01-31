# PBT Properties: LinuxDo OAuth Web Application

## Property-Based Testing 属性定义

---

## P1: OAuth 流程属性

### P1.1: 授权 URL 生成幂等性
**属性**: 相同参数生成相同授权 URL
**不变量**: `generateAuthUrl(clientId, redirectUri, state) === generateAuthUrl(clientId, redirectUri, state)`
**伪造策略**: 多次调用比较结果

### P1.2: Token 交换单次性
**属性**: 同一 authorization code 只能交换一次 token
**不变量**: 第二次使用相同 code 必须失败
**伪造策略**: 重放 code 验证拒绝

### P1.3: Session 一致性
**属性**: 登录后 session 包含所有必要字段
**不变量**: `session.user.id && session.user.username && typeof session.user.trustLevel === 'number'`
**伪造策略**: 随机用户登录后验证 session 结构

---

## P2: 用户数据属性

### P2.1: ID 不可变性
**属性**: 用户 ID 在多次登录间保持不变
**不变量**: `login1.user.id === login2.user.id` (同一 LinuxDo 账户)
**伪造策略**: 同一用户多次登录比较 ID

### P2.2: Trust Level 范围约束
**属性**: 信任等级必须在 0-4 范围内
**不变量**: `0 <= trustLevel <= 4`
**边界条件**: trustLevel ∈ {0, 1, 2, 3, 4}
**伪造策略**: 注入超出范围的值验证拒绝

### P2.3: 头像 URL 格式正确性
**属性**: 处理后的头像 URL 不包含模板占位符
**不变量**: `!avatarUrl.includes('{size}')`
**伪造策略**: 各种 avatar_template 格式测试

---

## P3: 数据库属性

### P3.1: 用户唯一性
**属性**: 同一 provider + providerAccountId 只创建一个用户
**不变量**: `COUNT(Account WHERE provider='linuxdo' AND providerAccountId=X) <= 1`
**伪造策略**: 重复登录验证不创建重复记录

### P3.2: 级联删除完整性
**属性**: 删除用户时关联的 Account 和 Session 同时删除
**不变量**: 删除 User 后，`Account.userId` 和 `Session.userId` 无孤儿记录
**伪造策略**: 删除用户后查询关联表

### P3.3: 时间戳单调性
**属性**: updatedAt 总是 >= createdAt
**不变量**: `user.updatedAt >= user.createdAt`
**伪造策略**: 创建和更新用户后验证时间戳

---

## P4: UI 状态属性

### P4.1: 主题切换往返性
**属性**: 切换主题两次回到原始状态
**不变量**: `toggle(toggle(theme)) === theme`
**伪造策略**: 记录初始主题，切换两次，比较

### P4.2: 认证状态一致性
**属性**: UI 显示与 session 状态一致
**不变量**: `(session !== null) === showUserProfile`
**伪造策略**: 各种 session 状态下验证 UI 渲染

### P4.3: 响应式布局完整性
**属性**: 所有断点下内容完整可见
**不变量**: 无内容溢出或截断
**边界条件**: viewport ∈ {320px, 768px, 1024px, 1440px}
**伪造策略**: 各断点截图比较

---

## P5: 安全属性

### P5.1: CSRF 保护
**属性**: 无 state 参数的回调被拒绝
**不变量**: `callback without state => 401/403`
**伪造策略**: 构造无 state 的回调请求

### P5.2: Session 隔离
**属性**: 不同用户的 session 不可互换
**不变量**: `sessionA.user.id !== sessionB.user.id` (不同用户)
**伪造策略**: 交换 session token 验证拒绝

### P5.3: 敏感信息不泄露
**属性**: 客户端不暴露 client_secret
**不变量**: `typeof window !== 'undefined' => !window.__NEXT_DATA__.includes('client_secret')`
**伪造策略**: 检查页面源码和网络请求

---

## P6: 代理属性

### P6.1: 代理透明性
**属性**: 通过代理的请求与直接请求结果一致
**不变量**: `proxyFetch(url).body === directFetch(url).body` (当直接可达时)
**伪造策略**: 对比代理和直接请求结果

### P6.2: 代理故障隔离
**属性**: 代理不可用时返回明确错误
**不变量**: `proxyUnavailable => error.code === 'PROXY_ERROR'`
**伪造策略**: 关闭代理后测试请求

---

## Falsification Strategies Summary

| 属性 | 策略 | 工具 |
|------|------|------|
| P1.* | 重放攻击、多次调用 | Jest + MSW |
| P2.* | 边界值注入、格式变异 | fast-check |
| P3.* | 数据库约束测试 | Prisma + Jest |
| P4.* | 状态机测试 | Playwright |
| P5.* | 安全扫描、手动渗透 | OWASP ZAP |
| P6.* | 网络故障注入 | Toxiproxy |

---

## Test Implementation Priority

1. **Critical** (必须通过):
   - P1.2 Token 交换单次性
   - P2.2 Trust Level 范围约束
   - P5.1 CSRF 保护
   - P5.3 敏感信息不泄露

2. **High** (应该通过):
   - P1.3 Session 一致性
   - P2.1 ID 不可变性
   - P3.1 用户唯一性

3. **Medium** (建议通过):
   - P4.* UI 状态属性
   - P6.* 代理属性

4. **Low** (可选):
   - P3.3 时间戳单调性
