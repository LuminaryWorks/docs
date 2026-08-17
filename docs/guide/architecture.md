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
│  Identity · Auth Gateway · auth-* · pal · notification · entitlement · AI Platform │
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
| 统一身份 Identity | 中央 Logto OIDC；登录 UI 默认 Experience API（Headless）多品牌 |
| **Auth Gateway** | OIDC 反代；产品不直绑 IdP 厂商，换 Logto/Auth0/Keycloak 只改 upstream |
| auth-core / auth-react | 后端 JWKS 验签与前端 OIDC PKCE |
| Casbin（各产品） | 资源级 AuthZ；JWT 不塞业务 ACL |
| Entitlement | 中央商业权益（Trial / 套餐 / License）；不进 JWT |
| PAL 权限层 | 可插拔 `resource:action` 抽象，可对接 Casbin |
| notification | 平台 NotificationModule（一期 Email / SMTP） |
| 工程基线 tooling | 统一代码质量与 TypeScript 基线 |

```text
AuthN: Auth Gateway → IdP (Logto / 企业 SSO)
Entitlement: 中央权益服务（商业能力）
AuthZ: 产品 Casbin PermissionService（资源 ACL）
```

详情：[统一登录](/develop/unified-login) · [Auth Gateway](/develop/auth-gateway) · [通知模块](/develop/notification) · MetaRepo [`spec/identity-and-permissions.md`](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/identity-and-permissions.md)。

这套架构让生态既能形成完整价值链，又不牺牲各产品独立融资、独立交付与独立演进的能力。
