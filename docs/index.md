---
pageType: home

hero:
  name: LuminaryWorks
  text: 启明工坊 · AI 原生开源生态
  tagline: 六个可独立部署的产品，通过统一登录与标准协议互相成长 —— 学 · 连 · 看 · 视 · 控 · 赚
  actions:
    - theme: brand
      text: 了解生态
      link: /guide/ecosystem
    - theme: alt
      text: 开发者快速开始
      link: /develop/getting-started

features:
  - title: BlockyEdu · 智码工坊 · 学
    details: AI 编程教育与 IoT 实验平台，培养能接入物联网、开发 Agent、驾驭数据的工程师。
    icon: 🎓
    link: https://github.com/blockyedu/VibeEdu
    linkText: blockyedu/VibeEdu
  - title: SyncroBrain · 万物智脑 · 连
    details: 开源、AI 驱动的 IoT PaaS。EMQX + ThingsBoard，硬件厂商低成本上云，成本优于闭源方案。
    icon: 🔌
    link: https://github.com/syncrobrain/LuminaryIoTChain
    linkText: syncrobrain/LuminaryIoTChain
  - title: DataLuminary · 数据明鉴 · 看
    details: 数据洞察与 DataTalk 可视化大屏，把设备遥测与业务数据变成可决策的图表。
    icon: 📊
    link: https://github.com/dataluminary/DataLuminary-Platform
    linkText: dataluminary/DataLuminary-Platform
  - title: VistaCast · 视界云遥 · 视
    details: AI 摄像头云监控 — 客流、防盗、异常检测；纯软件兼容 ONVIF/RTSP（规划阶段，文档先行）。
    icon: 📹
    link: /products/vistacast
    linkText: 产品页
  - title: VistaRemote · 视界远程 · 控
    details: WebRTC 远程桌面与自托管 AI 录制洞察，工控/IT 私有化运维。
    icon: 🖥️
    link: https://github.com/VistaRemote/vibeCode
    linkText: VistaRemote/vibeCode
  - title: DoerFlow · 智工网 · 赚
    details: 以太坊上的 AI Agent / Skill 去中心化市场，设备算力与 AI 能力链上交易、分成。
    icon: ⛓️
    link: https://github.com/doerflow/VibeAgent
    linkText: doerflow/VibeAgent
  - title: 统一身份 · 一次登录
    details: 中央 Logto OIDC，六产品同一 sub；PAL 可插拔权限；私有化可直连企业 IdP。
    icon: 🔐
    link: https://github.com/LuminaryWorks/identity
    linkText: LuminaryWorks/identity
---

## 一条价值链，六种能力

```text
   学                连                  看           视/控              赚
BlockyEdu ──► SyncroBrain ──► DataLuminary ──► VistaCast / VistaRemote ──► DoerFlow
                     │
                     └─ 设备与视频数据 → AI 推理 → 链上变现 闭环
```

| 品牌 | 中文名 | 角色 |
|------|--------|------|
| [BlockyEdu](https://github.com/blockyedu/VibeEdu) | 智码工坊 | 学 |
| [SyncroBrain](https://github.com/syncrobrain/LuminaryIoTChain) | 万物智脑 | 连 |
| [DataLuminary](https://github.com/dataluminary/DataLuminary-Platform) | 数据明鉴 | 看 |
| [VistaCast](/products/vistacast) | 视界云遥 | 视 — AI 摄像头（规划） |
| [VistaRemote](/products/vistaremote) | 视界远程 | 控 — 远程桌面 |
| [DoerFlow](https://github.com/doerflow/VibeAgent) | 智工网 | 赚 |

每个产品都能**单独商业化**；VistaCast 与 VistaRemote **并存**，分别服务摄像头 AI 与远程桌面场景。

## 为什么选 LuminaryWorks

- **开源可私有化**：核心栈 Apache/MIT，部署与许可成本低于闭源 IoT 云。
- **AI 驱动，而非仅设备管理**：推理、Agent、链上结算、数据洞察贯穿全链路。
- **不锁定**：标准 OIDC / MQTT / REST / WebRTC，可随时替换或迁出。
- **开发者友好**：BlockyEdu AI 辅导降低接入门槛，共享 [`@luminaryworks/*`](https://github.com/LuminaryWorks/shared) 库免重复造轮子；[新人上手](/develop/onboarding) 覆盖 MetaRepo 与子仓两种开发模式。
