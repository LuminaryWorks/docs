---
pageType: home

hero:
  name: LuminaryWorks
  text: AI 原生开源生态
  tagline: 五个可独立部署的产品，通过统一登录与标准协议互相成长 —— 学 · 连 · 看 · 控 · 赚
  actions:
    - theme: brand
      text: 了解生态
      link: /guide/ecosystem
    - theme: alt
      text: 开发者快速开始
      link: /develop/getting-started

features:
  - title: BlockyEdu · 学
    details: AI 编程教育与 IoT 实验平台，培养能接入物联网、开发 Agent、驾驭数据的工程师。
    icon: 🎓
    link: https://github.com/BlockyEdu/VibeEdu
    linkText: BlockyEdu/VibeEdu
  - title: LuminaryIoTChain · 连
    details: 开源、AI 驱动的 IoT PaaS。EMQX + ThingsBoard，硬件厂商低成本上云，成本优于闭源方案。
    icon: 🔌
    link: https://github.com/LuminaryIoTChain/LuminaryIoTChain
    linkText: LuminaryIoTChain
  - title: DataLuminary · 看
    details: 数据洞察与 DataTalk 可视化大屏，把设备遥测与业务数据变成可决策的图表。
    icon: 📊
    link: https://github.com/DataLuminary/DataLuminary-Platform
    linkText: DataLuminary/DataLuminary-Platform
  - title: VistaRemote · 控
    details: WebRTC 实时远程桌面与自托管 AI 录制洞察，触达设备与现场。
    icon: 🖥️
    link: https://github.com/VistaRemote/vibeCode
    linkText: VistaRemote/vibeCode
  - title: AgentSkillMesh · 赚
    details: 以太坊上的 AI Agent / Skill 去中心化市场，设备算力与 AI 能力链上交易、分成。
    icon: ⛓️
    link: https://github.com/AgentSkillMesh/VibeAgent
    linkText: AgentSkillMesh/VibeAgent
  - title: 统一身份 · 一次登录
    details: 中央 Logto OIDC，五产品同一 sub；PAL 可插拔权限；私有化可直连企业 IdP。
    icon: 🔐
    link: https://github.com/LuminaryWorks/identity
    linkText: LuminaryWorks/identity
---

## 一条价值链，五种能力

```text
   学                连                  看                控                赚
BlockyEdu ──► LuminaryIoTChain ──► DataLuminary ──► VistaRemote ──► AgentSkillMesh
                     │
                     └─ 设备遥测 → AI 推理 → 链上变现 闭环
```

| 组织 | MetaRepo | 角色 |
|------|----------|------|
| [BlockyEdu](https://github.com/BlockyEdu/VibeEdu) | [VibeEdu](https://github.com/BlockyEdu/VibeEdu) | 学 — AI 编程教育 |
| [LuminaryIoTChain](https://github.com/LuminaryIoTChain/LuminaryIoTChain) | [LuminaryIoTChain](https://github.com/LuminaryIoTChain/LuminaryIoTChain) | 连 — IoT PaaS |
| [DataLuminary](https://github.com/DataLuminary/DataLuminary-Platform) | [DataLuminary-Platform](https://github.com/DataLuminary/DataLuminary-Platform) | 看 — 数据洞察 |
| [VistaRemote](https://github.com/VistaRemote/vibeCode) | [vibeCode](https://github.com/VistaRemote/vibeCode) | 控 — 远程运维 |
| [AgentSkillMesh](https://github.com/AgentSkillMesh/VibeAgent) | [VibeAgent](https://github.com/AgentSkillMesh/VibeAgent) | 赚 — 链上 AI 市场 |

每个产品都能**单独商业化**；组合后形成「人才培养 → 设备上线 → 数据洞察 → 远程运维 → AI 变现」的成长飞轮。

## 为什么选 LuminaryWorks

- **开源可私有化**：核心栈 Apache/MIT，部署与许可成本低于闭源 IoT 云。
- **AI 驱动，而非仅设备管理**：推理、Agent、链上结算、数据洞察贯穿全链路。
- **不锁定**：标准 OIDC / MQTT / REST / WebRTC，可随时替换或迁出。
- **开发者友好**：BlockyEdu AI 辅导降低接入门槛，共享 [`@luminaryworks/*`](https://github.com/LuminaryWorks/shared) 库免重复造轮子；[新人上手](/develop/onboarding) 覆盖 MetaRepo 与子仓两种开发模式。
