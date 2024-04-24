# 共享库 @luminaryworks/*

收敛在 [`LuminaryWorks/shared`](https://github.com/LuminaryWorks/shared) 的 pnpm 工作区，为六产品提供统一认证、权限、通知与工程基线。

## 包清单

| 包 | 用途 | 端 |
|----|------|----|
| `@luminaryworks/auth-core` | OIDC JWKS 验签、`LuminaryAuthModule` | NestJS 后端 |
| `@luminaryworks/auth-react` | OIDC PKCE、`HeadlessLoginPanel`（可用 `showSocialConnectors={false}` 关闭社交登录） | React SPA |
| `@luminaryworks/pal` | 权限抽象层（native / oidc-claims） | NestJS 后端 |
| `@luminaryworks/notification` | 平台 `NotificationModule`（一期 Email / SMTP） | NestJS 后端 |
| `@luminaryworks/tooling` | Biome preset、tsconfig base | workspace 内部 |

通知接入详见 [通知模块 Notification](./notification)。

## 安装（npmjs 公开包）

```ini
# .npmrc（公开 npmjs 包走默认源，无需单独指定 @luminaryworks registry）
engine-strict=true
```

```bash
pnpm add @luminaryworks/auth-core@^0.2.2
pnpm add @luminaryworks/auth-react@^0.3.1
pnpm add @luminaryworks/notification@^0.1.0
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
