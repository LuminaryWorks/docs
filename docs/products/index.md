# 五大产品概览

LuminaryWorks 生态由五个**可独立部署、可单独商业化**的开源产品组成。下表使用各项目的 **GitHub 组织名** 与 **MetaRepo** 仓库名，便于定位源码与贡献入口。

| 组织 | MetaRepo | 角色 | 产品页 |
|------|----------|------|--------|
| [DataLuminary](https://github.com/DataLuminary/DataLuminary-Platform) | [DataLuminary-Platform](https://github.com/DataLuminary/DataLuminary-Platform) | 看 — 数据洞察 / 大屏 | [DataLuminary](./dataluminary) |
| [BlockyEdu](https://github.com/BlockyEdu/VibeEdu) | [VibeEdu](https://github.com/BlockyEdu/VibeEdu) | 学 — AI 编程教育 | [BlockyEdu](./vibeedu) |
| [LuminaryIoTChain](https://github.com/LuminaryIoTChain/LuminaryIoTChain) | [LuminaryIoTChain](https://github.com/LuminaryIoTChain/LuminaryIoTChain) | 连 — IoT PaaS | [LuminaryIoTChain](./iotchain) |
| [VistaRemote](https://github.com/VistaRemote/vibeCode) | [vibeCode](https://github.com/VistaRemote/vibeCode) | 控 — 远程运维 | [VistaRemote](./vistaremote) |
| [AgentSkillMesh](https://github.com/AgentSkillMesh/VibeAgent) | [VibeAgent](https://github.com/AgentSkillMesh/VibeAgent) | 赚 — 链上 AI 市场 | [AgentSkillMesh](./vibeagent) |

## 共享基础设施

| 仓库 | 职责 |
|------|------|
| [LuminaryWorks/LuminaryWorks](https://github.com/LuminaryWorks/LuminaryWorks) | 生态 MetaRepo、规格与编排脚本 |
| [LuminaryWorks/identity](https://github.com/LuminaryWorks/identity) | 中央 Logto OIDC 开发环境 |
| [LuminaryWorks/shared](https://github.com/LuminaryWorks/shared) | `@luminary/auth-core`、`auth-react`、`pal`、`tooling` |
| [LuminaryWorks/docs](https://github.com/LuminaryWorks/docs) | 本宣传站 |

每个产品可独立部署；通过[统一登录](/develop/unified-login)与标准协议（OIDC、MQTT、REST、WebRTC）可选组合。
