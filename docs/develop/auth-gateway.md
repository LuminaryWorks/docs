# Luminary Auth Gateway

产品**不要**直接依赖某一家 IdP 的 Management API。浏览器与 SPA 统一经 **Auth Gateway** 访问可达的 OIDC / Experience 端点；换 IdP 只改 Gateway `UPSTREAM_ISSUER`。

```text
              Logto | ZITADEL（预留）| Keycloak | Entra ID | 企业 OIDC
                                |
                     Luminary Auth Gateway  (:3010)
                                |
              +-----------------+-----------------+
              |                 |                 |
          DataView          BlockyEdu         VistaRemote …
```

源码：[LuminaryWorks/services/auth-gateway](https://github.com/LuminaryWorks/LuminaryWorks/tree/main/services/auth-gateway)。

## 解决什么问题

| 问题 | Gateway 对策 |
|------|----------------|
| 产品散落绑定某家 IdP SDK | 产品只认 OIDC + Login Experience Adapter |
| 未来换企业 IdP | 改 `UPSTREAM_ISSUER`，产品 `.env` 可不变 |
| 企业私有化接 AD / 飞书 / 钉钉 | Upstream 指向自托管 Logto 或企业 IdP；Connector 留在 IdP 侧 |
| 日后加白标 / 风控 / 审计 | 集中落在 Gateway，无需改六套前端 |

## Issuer 语义（重要）

Discovery **保留上游 `issuer`**，不把 JWT `iss` 改写成 Gateway 地址。

| 字段 | 值 | 用途 |
|------|----|------|
| discovery `issuer` | 上游 IdP issuer（如 `http://localhost:3001/oidc`） | 后端 JWT 验签必须匹配 |
| `authorization_endpoint` / `token_endpoint` / `jwks_uri` 等 | 改写为 Gateway 公网地址 | 浏览器可达、CORS / Cookie 友好 |

产品配置因此分成两层：

- **后端 / JWT 验签**：`IDP_ISSUER` / `VITE_IDP_ISSUER` = 上游 canonical issuer
- **浏览器传输**：`VITE_AUTH_GATEWAY_URL` 或 `VITE_AUTH_EXPERIENCE_URL` = Gateway / SPA origin

## 本地启动

```bash
cd LuminaryWorks
pnpm id:up                 # 上游 Identity
pnpm auth:gateway          # http://localhost:3010
curl http://localhost:3010/health
```

| 变量 | 默认 | 含义 |
|------|------|------|
| `AUTH_GATEWAY_PORT` | `3010` | 监听端口 |
| `AUTH_GATEWAY_PUBLIC_URL` | `http://localhost:3010` | 写入 discovery 中**可达端点**的对外基址 |
| `UPSTREAM_ISSUER` | `http://localhost:3001/oidc` | 真实 IdP issuer（JWT `iss`） |
| `AUTH_GATEWAY_DISCOVERY_PATHS` | 由 upstream 推导 | 非标准 discovery 路径时可覆盖 |
| `AUTH_GATEWAY_CORS_ORIGINS` | 本地产品端口列表 | 允许的浏览器 Origin |

## 产品如何配置

前端（推荐）：

```env
VITE_AUTH_GATEWAY_URL=http://localhost:3010
# JWT iss 仍指向上游 IdP，不要改成 Gateway
VITE_IDP_ISSUER=http://localhost:3001/oidc
VITE_IDP_CLIENT_ID=<identity/registered-apps.json>
VITE_IDP_REDIRECT_URI=http://localhost:<port>/auth/callback
```

本地无 Gateway 时，可用 `@luminaryworks/auth-dev-proxy` 把 SPA origin 的 `/oidc` + `/api/experience` 反代到 IdP，并设置：

```env
VITE_AUTH_EXPERIENCE_URL=http://localhost:<spa-port>
VITE_IDP_ISSUER=http://localhost:3001/oidc
```

后端：

```env
IDP_ISSUER=http://localhost:3001/oidc
IDP_AUDIENCE=https://api.<product>.local
AUTH_MODE=sso
# 可选：通过 Gateway 拉 JWKS
# IDP_JWKS_URI=http://localhost:3010/oidc/jwks
```

## 当前能力与边界

**已有**

- 反代 OIDC discovery / authorize / token / JWKS / userinfo
- **保留** discovery `issuer`；改写可达 endpoint、Location、Cookie 域
- 反代 Logto **Experience API**（`{gateway}/api/experience/*`）供 Headless 登录
- provider 路径可配置；默认兼容 Logto

**规划中（不阻塞产品接入）**

- 产品识别、风控、审计日志
- 限流与机器人防护

产品侧使用 `@luminaryworks/auth-react` 的 Login Experience Adapter + 标准 OIDC PKCE。Management API **不**经 Gateway 暴露给浏览器。

## 与统一登录文档的关系

接入步骤、IAM Adapter、Casbin、全产品 Playwright 验证见 [统一登录](./unified-login)。  
IAM 决策见 MetaRepo [`spec/identity-and-permissions.md`](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/identity-and-permissions.md)。  
**默认 IdP 已冻结为 Logto**；ZITADEL 是预留插件，不要再重评。见 [`spec/iam-provider-selection.md`](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/iam-provider-selection.md)。
