# 产品登录与权限 — Cursor 提示词

各产品仓实现统一登录 + Casbin 权限时，复制下列提示词到 Agent 对话（完整版见 MetaRepo skill）。

规范文件：

- MetaRepo：[`product-auth-implementation/SKILL.md`](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/.cursor/skills/product-auth-implementation/SKILL.md)
- 各产品：`.cursor/skills/product-auth-implementation/SKILL.md` + `PROMPT.md`

---

Implement LuminaryWorks unified login and product authorization for **this** product.

## Spec (must follow)

1. Read and follow skill: `LuminaryWorks/.cursor/skills/product-auth-implementation/SKILL.md` (also under this repo `.cursor/skills/product-auth-implementation/` if present).
2. Architecture decisions: `LuminaryWorks/spec/identity-and-permissions.md`
3. Developer guide: [unified-login](./unified-login)

## Decisions already made

- **AuthN**: Luminary IAM Adapter. Logto is the current default IdP (`IDP_ISSUER=http://localhost:3001/oidc` locally). Enterprise private deploy may use `external_oidc`.
- **Login UI**: `LoginExperienceAdapter` + OIDC PKCE via `@luminaryworks/auth-react`. Logto defaults to Experience Headless; providers without Headless use Hosted Redirect. No IdP Experience fork. No Management API in browser or product services.
- **Identity key**: map `issuer + sub` → local `user_id` (existing `logtoSub` columns are compatibility names).
- **AuthZ**: **Casbin** in this product. JWT / `LuminaryPrincipal` carries identity + platform access only — not resource ACL or commercial entitlements.
- Shared libs: `@luminaryworks/auth-core`, `@luminaryworks/auth-react`, `@luminaryworks/auth-dev-proxy`, optional `@luminaryworks/pal`.

## Your tasks

1. Audit current auth (guards, login pages, RBAC tables).
2. Wire NestJS backend to `@luminaryworks/auth-core` + env `IDP_*`; consume normalized `LuminaryPrincipal`.
3. Add Casbin `PermissionService`; map `issuer + sub` → local user; compute `permission(s)` on resource APIs.
4. Wire SPA login/callback with `@luminaryworks/auth-react` + `VITE_IDP_*` (and same-origin Experience proxy when needed).
5. Update `.env.example`, product README/spec with Luminary IAM Adapter + Casbin notes.
6. Prefer minimal diffs; migrate existing `@RequirePermission` to Casbin without rewriting all business modules at once.
7. Do not commit unless asked.

Report: files changed, how to run against local Logto, remaining gaps.
