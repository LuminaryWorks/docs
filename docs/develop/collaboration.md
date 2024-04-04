# 协作规范 (Spec-Driven)

团队采用 **VibeCode Spec-Driven Development**：先规格，后实现。

## 工作流

```text
1. 改 spec/（本仓或产品仓）       → 架构 + 产品评审
2. 改 contracts/（如涉及接口）    → 生成类型
3. 改实现仓                       → 单仓 PR + CI
4. 更新状态页 / 里程碑             → docs 同步
```

## 强约束

跨产品 **JWT claim**、`iot.*`/`agent.*`/`remote.*` 权限码、**MQTT topic** 变更，必须先改 LuminaryWorks spec，再改实现。

## 仓库治理

| 项 | 标准 |
|----|------|
| 语言 | TypeScript-first |
| 格式 | Biome 2.x（`@luminary/tooling` preset） |
| 前端 | React + Ant Design + Rsbuild |
| 后端 | NestJS + TypeORM |
| 文档 | RsPress |
| 分支 | `main` 保护，功能 `feat/*` |

## 集成契约

| 类型 | 格式 | 存放 |
|------|------|------|
| REST | OpenAPI 3.1 | 各产品 `contracts/` |
| 身份 | OIDC + `pal.v1.yaml` | DataLuminary `spec/contracts/`（→ LuminaryWorks/contracts） |
| MQTT | Topic 表 | SyncroBrain `spec/` |
| 事件 | CloudEvents | Kafka topic 在 spec 登记 |

## 版本兼容

- 共享 npm 包：Semver，breaking → major
- OpenAPI：URL 版本 `/api/v1`，废弃保留 ≥1 里程碑
