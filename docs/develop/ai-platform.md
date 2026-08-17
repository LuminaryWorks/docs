# AI 平台（共享网关）

> **受众**：各产品后端 / 架构  
> **权威规格**：[LuminaryWorks/spec/ai-platform.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/ai-platform.md)  
> **关联**：[Provider 与 Vault](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/ai-provider-and-vault.md) · [计量](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/ai-metering.md) · [产品集成](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/ai-product-integration.md)

## 1. 定位

LuminaryWorks AI Platform 是六产品共享的 **推理与密钥网关**，不是第二个业务产品。

| 中央平台做 | 产品自己做 |
|------------|------------|
| Provider 目录、Vault、流式补全、embedding | 意图、领域工具、Semantic / 教辅 / 录制摘要 |
| BYOK 与托管额度计量 | Casbin 资源 ACL、申请权限 UX |
| `@luminaryworks/ai-client` 契约 | 对话持久化与业务证据 |

三层顺序不变：**Logto AuthN → Entitlement → 产品 Casbin**。AI 不判断 space / dashboard / device 权限。

## 2. 产品分工

| 产品 | 产品内 | 用中央网关 |
|------|--------|------------|
| DataLuminary | DataInsight（DataTalk `modules/ai`）、ChartIntent、分析引擎 | LLM / Vault / stream |
| BlockyEdu | 教辅 prompt、Blockly/Monaco、artifact 校验；`ai-bridge` 作 BFF | 替换直连多厂商 key |
| VistaRemote | 端侧、BullMQ、产品 RAG、Python ML | 仅 LLM；默认不出网 |
| VistaCast | ONVIF / ONNX / 告警 | 可选叙事推理；实时 CV 不走 LLM |
| SyncroBrain | 设备、MQTT、规则 | 可选摘要 / RAG |
| DoerFlow | ChainSkill、Escrow、SIWE | 可选；`ai.strategy.run` 预留未实现 |

## 3. 接入清单

1. 声明 Entitlement feature（如 DataLuminary `ai.analysis`）。
2. 产品 orchestrator：意图 + 工具 + 领域校验。
3. 每次 tool call 重做 Casbin。
4. 经 `@luminaryworks/ai-client`（或同契约本地适配器）调模型。
5. 用量写成 `AiUsageEvent`。

未设 `LUMINARY_AI_BASE_URL` 时，产品可用本地 BYOK 适配器，**语义须与中央契约一致**，禁止另造平行 Vault。

## 4. DataLuminary 现状

MVP 已在 DataTalk / DataView 落地：统一对话框、空间 Provider、问数 / 洞察 / 原生图表生成。产品文档见 [dataluminary.dev 文档站 · AI 洞察](https://docs.dataluminary.dev/product/ai-insights)（以各环境实际域名为准）及产品仓 ProductWhitePaper。

## 5. 实施顺序

```text
规格 → AI Platform MVP + ai-client → DataLuminary MVP
  → BlockyEdu 迁移 → VistaRemote 迁移
  → SyncroBrain 事件桥 → VistaCast 文本能力 → DoerFlow 结算环
```
