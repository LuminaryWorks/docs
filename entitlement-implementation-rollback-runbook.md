# Entitlement implementation & rollback runbook

> Todo 7 companion. Authority: [spec/subscription-and-entitlement.md](../spec/subscription-and-entitlement.md).  
> Rollout order for `ENTITLEMENT_MODE`: **DataLuminary → BlockyEdu → VistaRemote**.

## Architecture (must hold)

```text
AuthN (Logto / product JWT) → Entitlement (commercial) → Casbin/ABAC (resource ACL)
```

Frozen rules:

1. Authenticated `subjectId` never comes from request body.
2. Business entitlements are **not** authoritative in JWT.
3. Private License never sets Casbin bypass (`casbinBypass: false`).
4. Commercial deny → **402**; AuthN fail → **401**; resource ACL deny → **403**.
5. Write paths fail closed when entitlement state is uncertain (`ENTITLEMENT_MODE=enforce`).

## Components

| Component | Path |
|-----------|------|
| Central service | `services/entitlement` |
| Shared client | `shared/packages/entitlement-client` (`@luminaryworks/entitlement-client`) |
| DataLuminary | `DataTalk` + `DataView` |
| BlockyEdu | `edu-server`, `server`, `edu-app-web`, `code-app-web` |
| VistaRemote | `shared`, `server`, `web`, `desktop`, `mobile` |

## Local central service (Docker Postgres)

```bash
cd services/entitlement
cp env.example .env   # if needed
pnpm install
docker compose up -d entitlement-db
pnpm run migration:run
pnpm run seed
pnpm run build && node dist/main.js
# GET http://127.0.0.1:3040/health → {"status":"ok"}
```

Do **not** commit `.env`, PEM private keys, or filled `ENTITLEMENT_LICENSE_PRIVATE_KEY`.

## Product env flags

| Variable | Values | Meaning |
|----------|--------|---------|
| `ENTITLEMENT_MODE` | `off` \| `shadow_read` \| `enforce` | Local-only / dual-read / central authoritative |
| `ENTITLEMENT_SERVICE_BASE_URL` | URL | Central service |
| `ENTITLEMENT_SERVICE_API_KEY` | secret | M2M to central (server-side only) |
| `ENTITLEMENT_OFFLINE_GRACE_MS` / `_SECONDS` | `0` default | Offline grace; keep `0` until grace is subject-keyed and monitored |
| `ENTITLEMENT_LICENSE_PAYLOAD` / public keys | PEM/JSON | Private deploy License (commercial only) |
| `PRODUCT_CODE` | `dataluminary` / `blockyedu` / `vistaremote` | Bundle isolation key |

## Shadow-read rollout order

### Phase A — DataLuminary first

1. Deploy central entitlement (migrate + seed) in shared env.
2. Point DataTalk at central with `ENTITLEMENT_MODE=shadow_read`.
3. Confirm AuthN → EntitlementGuard → PermissionGuard on gated routes.
4. Watch shadow-diff logs for Trial / Pro / Ultra / org seat mismatches.
5. When diffs are acceptable for allowlist orgs/users, switch DataTalk to `enforce`.
6. DataView UX already keys off `/membership` + 402; no commercial claims in SPA tokens.

### Phase B — BlockyEdu

1. Keep `edu-server` / `server` on `shadow_read` after DataLuminary enforce is stable.
2. Confirm code-server `@RequireEntitlement` on execute/AI paths; membership dual-read endpoints.
3. Note: edu-server may still lack feature `@RequireEntitlement` on LMS routes — treat as product backlog before edu-wide enforce.
4. Flip `server` then `edu-server` to `enforce` independently if needed.

### Phase C — VistaRemote last

1. Ensure Controller JWT is required for billing commercial APIs when mode ≠ `off`.
2. Confirm `plan` is not required in JWT; clients read `/api/v1/billing/entitlements`.
3. `shadow_read` on server; SFU/AI/recording gates dual-read.
4. Flip to `enforce` after DataLuminary + BlockyEdu are green.

## Rollback

| Mode flip | Action |
|-----------|--------|
| Immediate commercial rollback | Set `ENTITLEMENT_MODE=off` on the product (local membership / License path). No JWT entitlement required. |
| Partial | Keep `shadow_read` (local decision wins; central for audit only). |
| Central outage under enforce | Fail closed (402/503). Optionally raise offline grace only after confirming subject-keyed cache. |
| Schema | Do **not** drop legacy plan/trial columns until audit window closes. Migration scripts are idempotent / dry-run capable. |

Central service rollback: stop traffic to products (`off`), then revert service deploy. DB migrations are additive for LW-ENT; revert only with `migration:revert` if a new migration is unsafe.

## Security checklist (ops)

- [ ] No private keys in git / env examples
- [ ] Partner scopes + HMAC replay window enabled
- [ ] User tokens cannot pass arbitrary `organizationId` / `deploymentId`
- [ ] Seat occupy only via service/admin (`POST /v1/entitlements/seats/occupy` or admin)
- [ ] License verify never grants Casbin ACL
- [ ] Simulate-paid disabled in production (`BILLING_ALLOW_SIMULATE_PAID` unset)

## Related docs

- Acceptance matrix/report: [entitlement-acceptance-matrix.md](../spec/entitlement-acceptance-matrix.md)
- Spec: [subscription-and-entitlement.md](../spec/subscription-and-entitlement.md)
- Product notes: `spec/products/{dataluminary,blockyedu,vistaremote}.md`
