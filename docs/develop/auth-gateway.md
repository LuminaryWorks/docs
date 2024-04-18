# Luminary Auth Gateway

产品**不要**直接依赖 Logto / Auth0 / Keycloak / Cognito 专有接口。统一经 **Auth Gateway** 暴露标准 OIDC issuer，换 IdP 只改 Gateway 配置。

```text
              Logto | Auth0 | Keycloak | Cognito | 企业 IdP
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
| 产品散落绑定某家 IdP SDK | 产品只认 OIDC；Gateway 反代上游 |
| 未来换 Auth0 / Keycloak | 改 `UPSTREAM_ISSUER`，产品 `.env` 可不变 |
| 企业私有化接 AD / 飞书 / 钉钉 | Upstream 指向自托管 Logto 或企业 IdP；Connector 留在 IdP 侧 |
| 日后加白标 / 风控 / 审计 | 集中落在 Gateway，无需改六套前端 |

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
| `AUTH_GATEWAY_PUBLIC_URL` | `http://localhost:3010` | 写入 discovery 的对外 issuer 基址 |
| `UPSTREAM_ISSUER` | `http://localhost:3001/oidc` | 真实 IdP issuer |

对外 issuer：`http://localhost:3010/oidc`（discovery 中的 `issuer` 会被改写为 Gateway 地址）。

## 产品如何配置

前端（推荐）：

```env
VITE_AUTH_GATEWAY_URL=http://localhost:3010
# 等价于 issuer = http://localhost:3010/oidc
VITE_IDP_CLIENT_ID=<identity/registered-apps.json>
VITE_IDP_REDIRECT_URI=http://localhost:<port>/auth/callback
```

或直接：

```env
VITE_IDP_ISSUER=http://localhost:3010/oidc
```

后端：

```env
IDP_ISSUER=http://localhost:3010/oidc
IDP_AUDIENCE=https://api.<product>.local
AUTH_MODE=sso
```

本地 MVP 可暂时直连 `http://localhost:3001/oidc`；**生产与可售私有化包默认经 Gateway**。

## 当前能力与边界（MVP）

**已有**

- 反代 OIDC discovery / authorize / token / JWKS / userinfo
- 改写 discovery 中的 `issuer` 与上游绝对 URL

**规划中（不阻塞产品接入）**

- Experience API 白标代理
- 产品识别、风控、审计日志
- 限流与机器人防护

产品侧继续用 `@luminary/auth-react` 或各仓 `lib/idp.ts` 的 **标准 OIDC PKCE** 即可。

## 与统一登录文档的关系

接入步骤、Casbin、私有化矩阵见 [统一登录](./unified-login)。  
IAM 决策见 MetaRepo [`spec/identity-and-permissions.md`](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/identity-and-permissions.md)。
