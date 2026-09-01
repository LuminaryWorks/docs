# 共享库 @luminaryworks/*

收敛在 [`LuminaryWorks/shared`](https://github.com/LuminaryWorks/shared) 的 pnpm 工作区，为六产品提供统一认证、权限、通知与工程基线。

## 包清单

| 包 | 用途 | 端 |
|----|------|----|
| `@luminaryworks/auth-core` | Luminary IAM **Runtime**：OIDC JWKS 验签、`LuminaryPrincipal`、`LuminaryAuthModule` | NestJS 后端 |
| `@luminaryworks/auth-react` | Login Experience Adapter + OIDC PKCE、`HeadlessLoginPanel`（`IAM_PROVIDER=logto` 默认 Experience；`oidc` / `zitadel` 走 Hosted Redirect） | React SPA |
| `@luminaryworks/auth-dev-proxy` | 本地同域反代 `/oidc` + `/api/experience`；discovery 保留上游 `issuer` | 开发构建 |
| `@luminaryworks/pal` | 权限抽象层（native / oidc-claims） | NestJS 后端 |
| `@luminaryworks/notification` | 平台 `NotificationModule`（一期 Email / SMTP） | NestJS 后端 |
| `@luminaryworks/tooling` | Biome preset、tsconfig base | workspace 内部 |

身份边界：

- 产品只依赖 Runtime + Login Experience；**不要**把 Management API / M2M 凭据放进产品或浏览器。
- 用 `IAM_PROVIDER`（`logto` 默认 / `oidc` / 预留 `zitadel`）选择插件，不要改产品代码绑厂商 SDK。
- 外部身份键是 `issuer + subject`（兼容字段仍保留 `sub` / `iss` / `orgId`）。
- 未实际接入的 IdP 不建空 adapter；缺失能力显式 unsupported。默认 IdP 选型已冻结，见 [`spec/iam-provider-selection.md`](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/iam-provider-selection.md)。

通知接入详见 [通知模块 Notification](./notification)。完整接入见 [统一登录](./unified-login)。

## 安装（npmjs 公开包）

```ini
# .npmrc（公开 npmjs 包走默认源，无需单独指定 @luminaryworks registry）
engine-strict=true
```

```bash
pnpm add @luminaryworks/auth-core@^0.2.3
pnpm add @luminaryworks/auth-react@^0.4.1
pnpm add @luminaryworks/notification@^0.2.0
```

发布说明：[shared/PUBLISH.md](https://github.com/LuminaryWorks/shared/blob/master/PUBLISH.md)

GitHub 仓库可见性不变；只有 npm 包从 GitHub Packages 改为 npmjs 公开包。

## 本地联调（可选）

改 shared 尚未发版或离线时，可在消费方 `package.json` 用相对路径指向 sibling 布局下的 `shared` 包：

```jsonc
"@luminaryworks/auth-core": "file:../../LuminaryWorks/shared/packages/auth-core",
"@luminaryworks/notification": "file:../../LuminaryWorks/shared/packages/notification"
```

安装前：

```bash
cd LuminaryWorks/shared && pnpm build
```
