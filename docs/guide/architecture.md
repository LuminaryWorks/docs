# 总体架构

在五产品**完全独立部署**前提下，定义可选集成层与共享服务。

## 分层模型

```text
┌──────────────────────────────────────────────────────────────────┐
│  体验层（各产品独立前端）                                            │
│  DataView/DataTalk · edu/code-app · VibeAgent Web · VR Client      │
│  iot-console-web · Flutter IoT App (规划)                          │
├──────────────────────────────────────────────────────────────────┤
│  业务层（各产品独立后端 / 独立 Git）                                 │
│  DataTalk · VibeEdu server · VibeAgent api · VistaRemote server   │
│  iot-gateway · ThingsBoard CE                                      │
├──────────────────────────────────────────────────────────────────┤
│  LuminaryWorks 共享服务层                                           │
│  Identity (Logto) · @luminary/auth-* · @luminary/pal · tooling    │
├──────────────────────────────────────────────────────────────────┤
│  行业协议层                                                         │
│  OIDC/JWT · MQTT/EMQX · WebRTC · 链上合约 · REST/OpenAPI           │
├──────────────────────────────────────────────────────────────────┤
│  基础设施（按产品选型）                                              │
│  MySQL · PostgreSQL · Redis · Kafka · ClickHouse · MinIO · K8s    │
└──────────────────────────────────────────────────────────────────┘
```

## 硬规则

| 规则 | 说明 |
|------|------|
| 无跨仓 runtime import | 仅依赖 LuminaryWorks 发布的 `@luminary/*` 包 |
| 无跨产品 DB 外键 | 用 `sub` / `device_id` / API 关联 |
| Spec 先行 | 接口变更先改 `spec/` 或 `contracts/` |
| MetaRepo 不管业务 | LuminaryWorks 只放共享库与叙事 |

## 共享服务收敛

| 资产 | 现状 | 目标 |
|------|------|------|
| `@luminary/auth-core` | DataLuminary `packages/` | `LuminaryWorks/shared` |
| `@luminary/auth-react` | DataLuminary `packages/` | `LuminaryWorks/shared` |
| `@luminary/pal` | DataLuminary `packages/` | `LuminaryWorks/shared` |
| Biome preset | 各仓 `tooling/` | `LuminaryWorks/shared/packages/tooling` |
| Logto compose | DataLuminary `scripts/` | `LuminaryWorks/identity` |

迁移分阶段（LW-S0～S4），见仓库 [ecosystem-refactoring.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/ecosystem-refactoring.md)。
