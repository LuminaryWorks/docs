# 登录 · 权限 · 用户对接路线图

> 状态矩阵：[unified-login-status](https://github.com/dataluminary/DataLuminary-Platform/blob/main/spec/unified-login-status.md)  
> PAL 规格：[luminary-identity-pal-spec](https://github.com/dataluminary/DataLuminary-Platform/blob/main/spec/luminary-identity-pal-spec.md)

## 目标

五产品共用 **Logto OIDC**，同一用户同一 `sub`；权限通过 **PAL** 可插拔；企业私有化仅改 IdP 配置，不改产品代码。

## 当前完成度（2026-06）

| 能力 | DataLuminary | BlockyEdu | DoerFlow | VistaCast | SyncroBrain |
|------|-------------|---------|-----------|-------------|-----|
| 前端 OIDC PKCE | DataView ✅ | edu/code ✅ | Web 📋 | Admin ✅ | console ✅ |
| 后端 JWKS | DataTalk ✅ | server ✅ | Admin only ⚠️ | Admin ✅ | gateway ✅ |
| 用户 `sub` 落库 | external_id ✅ | externalUserId ✅ | ⬜ | Admin only | device owner ⚠️ |
| 权限模型 | 自建 RBAC | 自建 RBAC | Admin only | Admin RBAC | ⬜ |
| PAL 接入 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

## 优先级（执行顺序）

### P0 — 稳定现有 OIDC（1～2 迭代）

1. **依赖收敛**：五后端统一 `@luminaryworks/auth-core@^0.2.0` + CI 可安装（已完成 LW-S4 主体）。
2. **端到端冒烟**：一个 Logto 用户登录 DataView、edu-app、VistaCast Admin、iot-console，验证同一 `sub`。
3. **DoerFlow 加固**：`IDP_ISSUER` 未配置时禁止 admin 路由裸奔；补齐 `repos/web` OIDC。

### P1 — 用户与权限统一（2～3 迭代）

4. **PAL 试点（VibeEdu server）**：`NativeRbacPort` 包装现有 `RbacService` → `PalPermissionGuard`。
5. **PAL 推广（DataTalk）**：最大权限面；支持 `PAL_ADAPTER=oidc-claims` 企业场景。
6. **API 模型对齐**：新接口统一 **Bearer OIDC**；逐步减少「OIDC 换本地 JWT」双 token（DataView 可保留过渡期）。

### P2 — 产品补全（并行）

7. **DoerFlow**：`user_wallet` 表链接 `sub` ↔ 钱包；全局 API Guard。
8. **VistaCast**：决策终端用户是否走 Logto；房间权限与 IdP 关系文档化。
9. **SyncroBrain M2**：租户隔离、`iot.device:*` 权限、按 owner 过滤设备列表。

### P3 — 企业与平台

10. **auth-react**：SPAs 迁移到 `@luminaryworks/auth-react`，删除重复 `idp.ts`。
11. **bkiam adapter**（按需）：私有化腾讯栈。
12. **统一 Admin Shell**（可选）：跨产品用户/角色只读台。

## 新人接入登录开发

1. `LuminaryWorks/identity` → `bootstrap.ps1`
2. `register-apps.mjs` → 复制 `CLIENT_ID` 到产品 `.env`
3. 后端：`LuminaryAuthModule` + `LuminaryJwtAuthGuard`（见 [unified-login](./unified-login)）
4. 前端：PKCE + `/auth/callback`（或后续 `auth-react`）

## 相关仓库

| 仓 | 职责 |
|----|------|
| [LuminaryWorks/identity](https://github.com/LuminaryWorks/identity) | Logto 编排与应用注册 |
| [LuminaryWorks/shared](https://github.com/LuminaryWorks/shared) | auth-core / auth-react / pal |
| [dataluminary/DataLuminary-Platform/spec](https://github.com/dataluminary/DataLuminary-Platform/tree/main/spec) | 生态级身份规格 |
