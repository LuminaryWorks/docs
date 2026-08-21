# 统一登录与产品权限接入

所有产品统一接入 **Luminary IAM Adapter**。当前 SaaS / 默认 IdP 是 [`LuminaryWorks/identity`](https://github.com/LuminaryWorks/identity)（Logto OIDC）；各产品用 Casbin 负责资源 AuthZ。登录 UI 由 Login Experience Adapter 提供，Logto 默认走 **Experience API（Headless）**。

完整架构决策见 MetaRepo：[spec/identity-and-permissions.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/identity-and-permissions.md)。

## 为什么默认统一账号

AI 时代账号体系是生态资产，不是各产品私货：

| 价值 | 说明 |
|------|------|
| **B2B / 私有化销售** | 企业要求接 AD、飞书、钉钉、企微；标准 OIDC/SAML 在竞标中是硬门槛 |
| **研发效能** | 密码重置、验证码、社交登录、2FA、风控交给 IdP；产品专注业务 |
| **生态互通与交叉销售** | 注册 A 产品后可免密进入 B/C；沉淀统一用户画像 |

**原则**：当前 IdP 只管身份；产品本地保留 `user_id ↔ (issuer, sub)` 映射与 Casbin 资源 ACL，方便日后切换 Provider 或业务剥离。

## 架构一句话

```text
              Logto | Keycloak | Entra ID | 企业 OIDC
                                |
                     Luminary Auth Gateway
                                |
              +-----------------+-----------------+
              |                 |                 |
          DataView          BlockyEdu         VistaRemote …
```

```text
Auth Gateway → IdP  →  JWT（身份）
产品 SPA (@luminaryworks/auth-react)  →  NestJS (@luminaryworks/auth-core)  →  Casbin（资源）
```

| 部署 | 默认登录 | 配置要点 |
|------|----------|----------|
| **SaaS / 标准** | LuminaryWorks 统一账号 | Gateway → 中心 Logto |
| **企业私有化** | 企业账号（SSO） | Gateway / issuer → 客户 IdP 或自托管 Logto + Connector |

产品**不要**直连某一家 IdP 的 Management API；运行面只认 OIDC issuer（推荐经 [Auth Gateway](./auth-gateway)），登录体验通过 adapter 调用。

## Luminary IAM Adapter 分层

| Adapter | 负责 | 使用位置 |
|---------|------|---------|
| `RuntimeIdentityProvider` | OIDC discovery、JWKS 验签、UserInfo、claims 归一化 | 产品后端 / Gateway |
| `LoginExperienceAdapter` | Hosted Redirect 或厂商 Headless 登录 | 产品 SPA |
| `IdentityManagementProvider` | 用户创建/禁用/邀请、组织与角色管理 | 仅中央 `identity` 运维层 |

产品消费统一 `LuminaryPrincipal`，外部身份键是 `issuer + subject`。Management API 的 M2M 凭据不得放入产品 `.env`、产品后端或浏览器。暂未实际接入的 Provider 不建立空 adapter；缺失能力必须显式返回 unsupported。

## 启动本地 IdP

```bash
cd LuminaryWorks
pnpm id:up
# 可选：IdP 无关入口（生产推荐形态）
pnpm auth:gateway   # http://localhost:3010/oidc
```

`bootstrap` 会：拉起 Docker → 创建 M2M → 注册 SPA/API → 同步各产品 `CLIENT_ID` → 写入测试账号 `DEV_USER.json`。

| 服务 | URL |
|------|-----|
| OIDC Issuer（直连） | `http://localhost:3001/oidc` |
| Auth Gateway Issuer | `http://localhost:3010/oidc` |
| Admin | `http://localhost:3002` |
| 测试账号 | `dev@luminaryworks.local` / `LuminaryDev!234`（见 `identity/DEV_USER.json`） |
| CLIENT_ID 清单 | `identity/registered-apps.json` |

Identity 容器为 `restart: unless-stopped`：Docker Desktop 启动后会自动拉起。

## 全产品登录验证

Playwright 验证覆盖 DataLuminary、BlockyEdu LMS/Code、DoerFlow Web/Admin、VistaCast、VistaRemote Client/Admin 与 SyncroBrain：

```bash
# 本地开发：离线入口记为 SKIP
pnpm verify:login

# 发布 / CI：9 个入口必须全部在线并通过
pnpm verify:login:strict
```

验证包括 OIDC discovery、注册的 `client_id`、Headless/Hosted 登录能力、密码回调最终落点，以及已配置 Google/GitHub connector 时的跳转。VistaRemote Client 登录需同时启动其 API；BlockyEdu Code 登录需启动 Code API。

## 产品登录页约定

- **主 CTA**：统一账号 / 企业 SSO（OIDC PKCE）。
- **本地账密**：仅开发折叠入口（`VITE_ALLOW_LOCAL_LOGIN`）；生产与可售私有化包关闭。
- **回调**：优先 path `/auth/callback`（即使 SPA 用 HashRouter，也应在该 path 挂载回调页）。
- **品牌**：Logo / 主色 / 文案按产品定制；认证逻辑共用 SDK。

前端环境变量：

```bash
# 生产推荐
# VITE_AUTH_GATEWAY_URL=http://localhost:3010
VITE_IDP_ISSUER=http://localhost:3001/oidc
VITE_IDP_CLIENT_ID=<registered-apps.json 对应 ID>
VITE_IDP_REDIRECT_URI=http://localhost:<port>/auth/callback
VITE_ALLOW_LOCAL_LOGIN=false
```

## 登录体验 Adapter

- **当前 Logto**：`LogtoExperienceAdapter` / `@luminaryworks/auth-react`（OIDC PKCE）做注册、登录、找回、MFA、SSO。
- **通用企业 OIDC**：优先 Hosted Redirect；只有 Provider 提供稳定 Headless API 时才增加对应 adapter。
- **不用**：Management API 给前端；不要 fork Logto `packages/experience`。
- **Auth Gateway**：换 IdP 只改 `UPSTREAM_ISSUER`。见 [Auth Gateway](./auth-gateway)。

### 社交登录（Google / GitHub 等）可关

`HeadlessLoginPanel` 默认从 IdP 拉取已启用的 Experience social connectors（Google、GitHub、…）并展示按钮。**管理后台 / 内部控制台**通常只需统一账密（或企业 SSO），应关闭社交入口：

```tsx
import { HeadlessLoginPanel } from "@luminaryworks/auth-react";

// 管理后台：隐藏 Google / GitHub 等社交授权
<HeadlessLoginPanel
  config={idp}
  productName="DataLuminary Admin"
  showSocialConnectors={false}
  mode="redirect"
/>
```

| Prop | 默认 | 说明 |
|------|------|------|
| `showSocialConnectors` | `true` | `false` 时不请求 connectors，并隐藏分割线与社交按钮 |
| `socialProviders` | `"auto"` | `"auto"` 用 IdP 全部启用项；`string[]` 白名单；`[]` 等价于关闭（与 `showSocialConnectors={false}` 同效） |

产品面向终端用户的登录页保持默认 `true`；仅运营/Admin SPA 设为 `false`。企业 SSO（SAML/OIDC Connector）仍在 IdP 侧配置，与本开关无关。

## 后端接入（NestJS）

```ts
import { LuminaryAuthModule, LuminaryJwtAuthGuard } from "@luminaryworks/auth-core";

@Module({
  imports: [
    LuminaryAuthModule.forRootAsync({
      mode: process.env.IDP_ISSUER ? "logto" : "legacy",
      issuer: process.env.IDP_ISSUER,
      audience: process.env.IDP_AUDIENCE,
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: LuminaryJwtAuthGuard }],
})
export class AppModule {}
```

```bash
# 生产推荐经 Gateway
IDP_ISSUER=http://localhost:3010/oidc
IDP_AUDIENCE=https://api.<product>.local
AUTH_MODE=sso
```

JWT 归一化为 `LuminaryPrincipal`；外部身份用 `iss + sub` 标识。Token 只含身份 / 租户 / 平台准入，**业务权限与商业权益不进 Token**。

DoerFlow 双身份：Logto 管平台会话；wallet/SIWE 管链上证明。无 Trial；401 / 402 / 403 分流。

## Casbin 资源权限（各产品）

| 步骤 | 说明 |
|------|------|
| 依赖 | `casbin` + 自封装 `CasbinModule` |
| 模型 | `sub, obj, act` |
| 映射 | IdP `issuer + sub` → 本地 `user_id`（首次登录 upsert） |
| API | 列表/详情附带 `permissions: { view, edit, delete, ... }` |

| 前缀 | 产品 |
|------|------|
| `bi.*` / `dashboard.*` | DataLuminary |
| `edu.*` | BlockyEdu |
| `agent.*` | DoerFlow |
| `cast.*` | VistaCast |
| `remote.*` | VistaRemote |
| `iot.*` | SyncroBrain |

## 私有化 / 企业 SSO

| 模式 | 配置 |
|------|------|
| 自托管 Logto | identity compose；Gateway `UPSTREAM_ISSUER` 指向客户 Logto |
| 企业 OIDC（Azure AD / Okta / 蓝鲸 / IDaaS） | Gateway upstream 或 `IDP_MODE=external_oidc` + 企业 issuer |
| SAML / LDAP / AD | 在 Logto（或企业 IdP）配 Connector；**产品零改动** |

关闭产品本地账密：前端 `VITE_ALLOW_LOCAL_LOGIN=false`，后端 `AUTH_MODE=sso`。

## Cursor 实现规范

`LuminaryWorks/.cursor/skills/product-auth-implementation/SKILL.md`（各产品 `.cursor/skills/` 有副本）。

## 相关文档

| 文档 | 说明 |
|------|------|
| [Auth Gateway](./auth-gateway) | IdP 无关反层、换厂商不改产品 |
| [共享库](./shared-packages) | `auth-core` / `auth-react` / `pal` / `notification` |
| [通知模块](./notification) | 业务邮件；注册/找回/MFA 仍归 IdP |
| [接入矩阵](./onboarding) | 六产品仓库与本地布局 |
| MetaRepo IAM 规格 | `spec/identity-and-permissions.md` |
