# VistaCast · 视界云遥

![VistaCast](/brand/vistacast-logo.svg)


> 角色 **视** · 组织 [VistaCast](https://github.com/VistaCast) · 官网 [vistacast.dev](https://vistacast.dev)

**AI Visual Autopilot** — 纯软件 AI 云监控层，兼容海康、大华、小米、TP-Link 等 ONVIF/RTSP 摄像头。把存量固定摄像头升级为结构化安全与运营事件源，可独立私有化交付。

## 产品定位

| 维度 | 说明 |
|------|------|
| 一句话 | 存量摄像头的 AI 升级层 — 客流、防盗、异常检测 |
| 生态角色 | **视** — 线下视觉数据流与 AI 事件源 |
| 商业形态 | 可单独部署，也可与兄弟产品组合交付 |
| 与 VistaRemote | **并存**：VC = 摄像头 AI；VR = 远程桌面人工触达 |

## 核心能力

| 能力 | 说明 |
|------|------|
| **摄像头接入** | 兼容主流 ONVIF / RTSP 设备，无需绑定专用硬件 |
| **智能告警** | 陌生人脸、区域入侵、夜间异动等自动识别与推送 |
| **客流分析** | 排队、时段分布、门店运营热力，服务连锁与零售 |
| **规则引擎** | 告警去重、阈值策略、场景化规则编排 |
| **异常检测** | 跌倒、打斗、烟雾等更高阶安全事件识别 |
| **生态出站** | Webhook / MQTT 事件输出，对接大屏、运维与 Agent |
| **统一登录** | 接入 LuminaryWorks OIDC，支持企业 IdP |

## 目标场景

| 场景 | 能力价值 |
|------|----------|
| 连锁门店 | 客流、排队、营业时段洞察 |
| 仓储物流 | 陌生人识别、越界与夜间异动 |
| 工厂安全 | 危险区域闯入与异常行为告警 |
| 物业多站点 | 统一视觉安防看板与事件中枢 |

## 远期展望

- 跨摄像头 Re-ID 与多站点统一身份轨迹
- 与 DataLuminary 深度联动的安防 / 客流大屏模板
- 与 SyncroBrain 设备台账、DoerFlow Skill 形成事件驱动闭环
- 告警后一键联动 VistaRemote，实现「自动发现 → 人工介入」

## 技术栈

NestJS + Fastify + TypeORM + PostgreSQL · ONVIF / RTSP · WebSocket · React Admin · `@luminaryworks/auth-core`

## 在生态中

```text
VistaCast（视）— vistacast.dev
  ├─► DataLuminary   dataluminary.dev — 告警 / 客流大屏
  ├─► SyncroBrain    syncrobrain.com — 设备台账互补
  ├─► VistaRemote    remote.vistacast.dev — 告警后人工介入
  ├─► DoerFlow       doerflow.dev — 视觉事件触发 Skill
  └─► BlockyEdu      blockyedu.com — 安防与视觉 AI 实训
```

更多信息：[vistacast.dev](https://vistacast.dev) · [GitHub VistaCast](https://github.com/VistaCast)
