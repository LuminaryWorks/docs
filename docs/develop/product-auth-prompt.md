# 产品登录与权限 — Cursor 提示词

各产品仓实现 Logto 登录 + Casbin 权限时，复制下列提示词到 Agent 对话（完整版见 MetaRepo skill）。

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

- **AuthN**: Logto OIDC (`IDP_ISSUER=http://localhost:3001/oidc` locally).
- **Login UI**: Experience API / Headless (or `@luminary/auth-react` OIDC PKCE). Multi-brand per product. No Logto Experience fork. No Management API in browser.
- **AuthZ**: **Casbin** in this product. JWT carries identity + platform access only — not resource ACL.
- Shared libs: `@luminaryworks/auth-core`, `@luminary/auth-react`, optional `@luminary/pal`.

## Your tasks

1. Audit current auth (guards, login pages, RBAC tables).
2. Wire NestJS backend to `@luminaryworks/auth-core` + env `IDP_*`.
3. Add Casbin `PermissionService`; map Logto `sub` → local user; compute `permission(s)` on resource APIs.
4. Wire SPA login/callback with `@luminary/auth-react` + `VITE_IDP_*`.
5. Update `.env.example`, product README/spec with Logto + Casbin notes.
6. Prefer minimal diffs; migrate existing `@RequirePermission` to Casbin without rewriting all business modules at once.
7. Do not commit unless asked.

Report: files changed, how to run against local Logto, remaining gaps.
