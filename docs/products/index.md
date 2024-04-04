# 六大产品概览

LuminaryWorks（启明工坊）生态由六个**可独立部署、可单独商业化**的开源产品组成（含 VistaCast 与 VistaRemote 两条独立视觉产品线）。

| 品牌 | 中文名 | GitHub 组织 | 生态角色 | 产品页 |
|------|--------|-------------|----------|--------|
| [DataLuminary](https://github.com/dataluminary/DataLuminary-Platform) | 数据明鉴 | dataluminary | 看 — 数据洞察 / 大屏 | [DataLuminary](./dataluminary) |
| [BlockyEdu](https://github.com/blockyedu/VibeEdu) | 智码工坊 | blockyedu | 学 — AI 编程教育 | [BlockyEdu](./blockyedu) |
| [SyncroBrain](https://github.com/syncrobrain/LuminaryIoTChain) | 万物智脑 | syncrobrain | 连 — IoT PaaS | [SyncroBrain](./syncrobrain) |
| [VistaCast](https://github.com/VistaCast) | 视界云遥 | VistaCast | 视 — AI 摄像头云监控 | [VistaCast](./vistacast) |
| [VistaRemote](https://github.com/VistaRemote/vibeCode) | 视界远程 | VistaRemote | 控 — WebRTC 远程桌面 | [VistaRemote](./vistaremote) |
| [DoerFlow](https://github.com/doerflow/VibeAgent) | 智工网 | doerflow | 赚 — 链上 AI 市场 | [DoerFlow](./doerflow) |

## VistaCast vs VistaRemote

| | VistaCast | VistaRemote |
|---|-----------|-------------|
| 输入 | ONVIF/RTSP 摄像头 | 远程桌面 |
| 状态 | 📋 文档 / 规划 | ✅ 已有实现 |
| 编码优先级 | DataLuminary、BlockyEdu 之后 | 持续维护 |

## 共享基础设施

| 仓库 | 职责 |
|------|------|
| [LuminaryWorks/LuminaryWorks](https://github.com/LuminaryWorks/LuminaryWorks) | 生态 MetaRepo、规格与编排脚本 |
| [LuminaryWorks/identity](https://github.com/LuminaryWorks/identity) | 中央 Logto OIDC |
| [LuminaryWorks/shared](https://github.com/LuminaryWorks/shared) | `@luminary/*` 共享库 |
| [LuminaryWorks/docs](https://github.com/LuminaryWorks/docs) | 本宣传站 |

每个产品可独立部署；通过[统一登录](/develop/unified-login)与标准协议可选组合。
