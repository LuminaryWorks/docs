# 生态叙事

AI 正在重塑软件价值链：从「写代码」到「编排 Agent」，从「看报表」到「设备自治」，从「中心化 SaaS」到「可私有化 + 链上结算」。单一产品难以覆盖 **教育 → 设备 → 数据 → 运维 → 交易** 全链路。

LuminaryWorks 用**五个可独立商业化的开源产品**，以标准协议拼接成可选的 AI 生态。

## 五个角色

| 组织 | MetaRepo | 关键词 | 独立价值 | 在生态中 |
|------|----------|--------|----------|----------|
| [BlockyEdu](https://github.com/BlockyEdu/VibeEdu) | VibeEdu | 学 | AI 编程教育 | 培养接入 IoT/Agent/BI 的工程师 |
| [LuminaryIoTChain](https://github.com/LuminaryIoTChain/LuminaryIoTChain) | LuminaryIoTChain | 连 | 开源 IoT PaaS | 设备 MQTT 管道与多租户大脑 |
| [DataLuminary](https://github.com/DataLuminary/DataLuminary-Platform) | DataLuminary-Platform | 看 | 数据洞察 / 大屏 | 统一图表与分析层 |
| [VistaRemote](https://github.com/VistaRemote/vibeCode) | vibeCode | 控 | WebRTC 远程运维 | 设备 / 桌面现场触达 |
| [AgentSkillMesh](https://github.com/AgentSkillMesh/VibeAgent) | VibeAgent | 赚 | 链上 AI 市场 | AI 能力与设备算力变现 |

## 组合场景（按需，非捆绑）

| 客户 | 推荐组合 |
|------|----------|
| 硬件创业公司 | LuminaryIoTChain + BlockyEdu |
| 制造企业 | LuminaryIoTChain + DataLuminary + VistaRemote |
| 数据团队 | DataLuminary 单体 |
| Web3 / AI 团队 | AgentSkillMesh + LuminaryIoTChain |
| 运维服务商 | VistaRemote + DataLuminary |

## 成长飞轮

```text
更多厂商接入 IoT ──► 更多遥测数据 ──► DataLuminary 洞察增值
        │                                      │
        ▼                                      ▼
 BlockyEdu 输送工程师                 AgentSkillMesh 上架行业 Agent
        │                                      │
        └──────────► VistaRemote 运维 ◄────────┘
```

## 统一体验

- **一次登录**：中央 [Logto OIDC](/develop/unified-login)（[LuminaryWorks/identity](https://github.com/LuminaryWorks/identity)），五产品同一 `sub`
- **权限统一**：`resource:action`（[PAL](https://github.com/LuminaryWorks/shared)）
- **数据隔离**：无跨产品外键，仅 JWT / API / 事件关联
