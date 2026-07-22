# 总体架构

在六产品**完全独立部署**前提下，提供可选集成层与共享服务。**VistaCast**（AI 摄像头）与 **VistaRemote**（WebRTC 远程桌面）为两条独立视觉产品线，可单独商业化，也可按场景组合。

## 分层模型

```text
┌──────────────────────────────────────────────────────────────────┐
│  体验层（各产品独立前端）                                            │
│  DataView/DataTalk · edu-app · DoerFlow Web · VistaCast Admin     │
│  VistaRemote Client/Admin · iot-console-web                        │
├──────────────────────────────────────────────────────────────────┤
│  业务层（各产品独立后端 / 独立 Git）                                 │
│  DataTalk · VibeEdu server · DoerFlow api · VistaCast API          │
│  VistaRemote server · iot-gateway · ThingsBoard CE                 │
├──────────────────────────────────────────────────────────────────┤
│  LuminaryWorks 共享服务层                                           │
│  Identity (Logto) · @luminaryworks/auth-* · @luminaryworks/pal     │
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
| 价值 | AI 自动感知与告警 | 人工远程操作与审计 |

## 架构原则

| 原则 | 说明 |
|------|------|
| 产品可独立部署 | 每个产品都有完整交付边界，可单独私有化与商业化 |
| 共享不耦合 | 仅通过发布的 `@luminaryworks/*`、OIDC 与标准协议协作 |
| 无跨产品数据库绑定 | 用用户主体、设备 ID、API 与事件关联 |
| 协议优先 | 便于替换、扩展与企业 IdP / 既有系统对接 |

## 共享能力

| 能力 | 作用 |
|------|------|
| 统一身份 Identity | 中央 Logto OIDC，一次登录贯通多产品 |
| auth-core / auth-react | 后端验签与前端 PKCE 接入 |
| PAL 权限层 | 可插拔 `resource:action` 权限模型 |
| 工程基线 tooling | 统一代码质量与 TypeScript 基线 |

这套架构让生态既能形成完整价值链，又不牺牲各产品独立融资、独立交付与独立演进的能力。
