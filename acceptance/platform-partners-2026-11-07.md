# Acceptance checklist — LW 平台整合与合作伙伴化

Date: 2026-11-07 (local). Verifier: lead after [Final verify-accept](agent stalled) failed with connection stall. No commit/push.

## Pass

| Area | Result |
|------|--------|
| AI Platform unit | 61 passed (`pnpm check` + `pnpm test`) |
| Entitlement unit | 315 passed, 21 skipped (DB integration needs `RUN_DB_INTEGRATION=1`) |
| Control Console | `tsc` + biome (1 pre-existing CSS specificity warning) + rstest **34** + server **10** (serial re-run after parallel worker timeout) |
| Account Center | check + lint + test (incl. 4 server) |
| `@luminaryworks/ui` | 8 passed |
| Partner onboard | 5 passed; `pnpm partner:onboard -- --list` / `--check dataluminary` ok |
| Postgres consolidation | Single control-plane PG healthy on `127.0.0.1:5433`; old `luminary-*-db` containers **Exited** (volumes retained) |
| Identity | Account Center SPA + AI Platform API resource registered; partner scopes in `apps.json`; client id present in env (len 21) |
| Compose | `account-center` service + `AI_PLATFORM_CORS_ORIGINS` wired in `deploy/compose/control-plane.yaml` |
| Branding grep | No hits for 旗下 / 同一公司 / 母公司 / House of Brands / 一个工坊 in website/, spec/legal/, domain-and-branding |
| Legal version | `lw-legal-v2026-11-07` default in entitlement + deploy env example |
| Kill-switch code | Admin product status / force-revoke APIs; Console Partners page; OPERATOR §13 updated |
| Console AI | BFF `/bff/ai/*` + pages; internal admin on AI Platform |
| Account Center BYOK/wallet | SPA + `/v1/me/{wallet,grants,usage}` |

## Fail / blocked

| Item | Notes |
|------|--------|
| Live kill-switch HTTP drill | **Blocked**: Entitlement `:3040` not running; Control Console `:3050` / Account Center `:3060` not running. Port `13100/ready` answers **VistaCast API**, not AI Platform. |
| Playwright E2E | No Playwright configs under apps/control-console or apps/account-center. |
| Signed-in UI walkthrough | Needs operator/user OIDC login against live services. |

## Skipped (with reason)

- Entitlement DB integration suites (21) — require `RUN_DB_INTEGRATION=1` + migration `1731200000000`.
- Full screenshot gallery of signed-in pages — only login/legal shells captured earlier; `apps/account-center/docs/screenshots/verify-accept/login-shell.png` present.
- AI Platform live `/ready` on 13100 — port owned by VistaCast in this lab; use `--profile ai` compose when drilling AI.

## Remaining gaps for lead

1. Wire `assertPartnerOrAdmin` into Entitlement AuthGuard (scopes exist in Logto; runtime enforcement still reference-only in `scripts/lib/partner-scopes.mjs`).
2. Start control-plane entitlement + `--profile ai` + account-center/console for a signed-in Partners suspend/resume drill on a non-critical product (e.g. syncrobrain), then restore `active`.
3. Rotate previously exposed keys in `identity/.env.ai` and seed via vault script.
4. Partner / product legal templates still need French counsel review (not legal advice).
5. Console: products with `active:false` outside the six partner codes may not list; tenant create may need follow-up PUT for `merchantAccountId`.
6. No automatic Logto app disable on suspend (manual Admin Console step per OPERATOR §13).
7. Do **not** `docker start` old `luminary-identity-db` / entitlement / notification DB containers.

## Suggested next commands (human signed-in walkthrough)

```bash
# from repo root
docker compose --env-file deploy/env/control-plane.env \
  -f deploy/compose/control-plane.yaml \
  -f deploy/compose/control-plane.dev-ports.yaml \
  --profile ai up -d entitlement ai-platform control-console account-center

# Partners UI: http://127.0.0.1:3050/partners  (entitlement:admin)
# Account Center: http://127.0.0.1:3060/keys   (BYOK)
# API drill alternative: see deploy/OPERATOR.md §13 curl examples
```
