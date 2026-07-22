# 共享库 @luminaryworks/*

收敛在 [`LuminaryWorks/shared`](https://github.com/LuminaryWorks/shared) 的 pnpm 工作区，为六产品提供统一认证、权限与工程基线。

## 包清单

| 包 | 用途 | 端 |
|----|------|----|
| `@luminaryworks/auth-core` | OIDC JWKS 验签、`LuminaryAuthModule` | NestJS 后端 |
| `@luminaryworks/auth-react` | OIDC PKCE、`LuminaryAuthProvider` | React SPA |
| `@luminaryworks/pal` | 权限抽象层（native / oidc-claims） | NestJS 后端 |
| `@luminaryworks/tooling` | Biome preset、tsconfig base | workspace 内部 |

## 安装（GitHub Packages）

```ini
# .npmrc（PAT 需 read:packages）
@luminaryworks:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```bash
pnpm add @luminaryworks/auth-core@^0.2.0
```

发布说明：[shared/PUBLISH.md](https://github.com/LuminaryWorks/shared/blob/master/PUBLISH.md)

## 本地联调（可选）

未配置 registry 或离线时，可在消费方 `package.json` 用相对路径指向 sibling 布局下的 `shared` 包：

```jsonc
"@luminaryworks/auth-core": "file:../LuminaryWorks/shared/packages/auth-core"
```

安装前：

```bash
cd LuminaryWorks/shared && pnpm build
```
