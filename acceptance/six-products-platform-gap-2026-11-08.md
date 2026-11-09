# 六产品平台适配缺口（2026-11-08）

## MetaRepo 本轮已修

- Account Center `.env.example`：六产品启动器（含 SyncroBrain）；公开站点 URL。
- `deploy/env/control-plane.env.example`：补充六产品 `ACCOUNT_CENTER_APPS_JSON` 注释示例。
- Entitlement 种子：DoerFlow / VistaCast `trialPolicy=disabled`，去掉 trial 计划（对齐 `spec/partners.md`）。
- 官网 `website/lib/products.ts`：VistaCast / SyncroBrain `status=preview`（不可售）。

## 产品仓现状（只读扫描）

| 产品 | Entitlement | AI 双轨 | 登录协议 | OIDC |
|------|-------------|---------|----------|------|
| DataLuminary | PASS | PASS | PASS | PASS |
| BlockyEdu | PASS | PASS | PASS | PASS |
| VistaRemote | PASS | PASS | PASS | PASS |
| VistaCast | PASS | PARTIAL（仅 edge polish） | PASS | PASS |
| DoerFlow | PASS | MISSING | PARTIAL（硬编码链接） | PARTIAL（example 空 client id） |
| SyncroBrain | PARTIAL（自研 client，`shadow` 非 `shadow_read`） | PASS | PASS | PASS |

## 建议下一刀（产品仓）

1. DoerFlow：接入 `@luminaryworks/ai-client` + vault / `LUMINARY_AI_*`；登录改用 `readLoginLegalConfigFromEnv`；example 钉住 registered client id。
2. SyncroBrain：换 `@luminaryworks/entitlement-client`，模式名对齐 `shadow_read`。
3. VistaCast：服务端补 AI vault / ai-client（若需要托管调用），不只 edge brief-polish。
4. 各产品默认仍 `ENTITLEMENT_MODE=off`：lab/pilot 再升 `shadow_read` → `enforce`。
