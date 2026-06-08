# 统一登录接入

所有产品共用 [`LuminaryWorks/identity`](https://github.com/LuminaryWorks/identity)（Logto OIDC）。一次登录，全生态同一 `sub`。

## 启动服务

```bash
cd LuminaryWorks/identity && ./bootstrap.sh
```

## 注册应用

1. Admin `http://localhost:3002` 创建管理员
2. 创建 Machine-to-Machine 应用（授予 Logto Management API），ID/Secret 填入 `identity/.env`
3. `node scripts/register-apps.mjs` —— 幂等创建 6 个 SPA + 5 个 API 资源
4. 解析出的 `CLIENT_ID` 写入 `identity/registered-apps.json`

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

`.env`：

```bash
IDP_ISSUER=http://localhost:3001/oidc
IDP_AUDIENCE=https://api.<product>.local
```

## 前端接入（SPA）

```ts
// @luminary/auth-react — OIDC PKCE
VITE_IDP_ISSUER=http://localhost:3001/oidc
VITE_IDP_CLIENT_ID=<registered-apps.json 中对应 ID>
VITE_IDP_REDIRECT_URI=http://localhost:<port>/auth/callback
```

## 私有化部署

| 模式 | 配置 |
|------|------|
| 自托管 Logto | identity compose 上生产（换密码/域名/TLS） |
| 直连企业 IdP | 产品 `IDP_MODE=external_oidc` + 企业 `IDP_ISSUER`，无需本服务 |
| SAML | Logto SAML Connector，产品无感 |

## 权限（PAL）

统一 `resource:action` 权限码，命名空间隔离：

| 前缀 | 产品 |
|------|------|
| `iot.*` | LuminaryIoTChain |
| `agent.*` | VibeAgent |
| `remote.*` | VistaRemote |
| `edu.*` | VibeEdu |

详见 [共享库 @luminary/*](./shared-packages)。
