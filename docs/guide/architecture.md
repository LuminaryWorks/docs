# 总体架构

在六产品**完全独立部署**前提下，定义可选集成层与共享服务。其中 **VistaCast**（AI 摄像头，规划）与 **VistaRemote**（WebRTC 远程桌面）为两条独立视觉产品线。

## 分层模型

```text
┌──────────────────────────────────────────────────────────────────┐
│  体验层（各产品独立前端）                                            │
│  DataView/DataTalk · edu-app · DoerFlow Web · VistaCast Admin     │
│  VistaRemote Client/Admin · iot-console-web                        │
├──────────────────────────────────────────────────────────────────┤
│  业务层（各产品独立后端 / 独立 Git）                                 │
│  DataTalk · VibeEdu server · DoerFlow api · VistaCast API（规划）  │
│  VistaRemote server · iot-gateway · ThingsBoard CE                 │
├──────────────────────────────────────────────────────────────────┤
│  LuminaryWorks 共享服务层                                           │
│  Identity (Logto) · @luminary/auth-* · @luminary/pal · tooling    │
├──────────────────────────────────────────────────────────────────┤
│  行业协议层                                                         │
│  OIDC/JWT · MQTT/EMQX · ONVIF/RTSP · WebRTC · REST/OpenAPI        │
├──────────────────────────────────────────────────────────────────┤
│  基础设施（按产品选型）                                              │
│  PostgreSQL · Redis · ClickHouse · MinIO · K8s                    │
└──────────────────────────────────────────────────────────────────┘
```

## VistaCast vs VistaRemote

| | VistaCast | VistaRemote |
|---|-----------|-------------|
| 协议 | ONVIF / RTSP | WebRTC |
| 输入 | 固定摄像头 | 远程桌面 |
| 状态 | 规划（文档） | 已有实现 |

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

迁移分阶段（LW-S0～S4），见 [ecosystem-refactoring.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/ecosystem-refactoring.md)。
