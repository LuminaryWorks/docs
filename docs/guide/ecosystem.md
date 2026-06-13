# 生态叙事

AI 正在重塑软件价值链：从「写代码」到「编排 Agent」，从「看报表」到「设备自治」，从「中心化 SaaS」到「可私有化 + 链上结算」。单一产品难以覆盖 **教育 → 设备 → 数据 → 视觉 → 运维 → 交易** 全链路。

**LuminaryWorks（启明工坊）** 用**六个可独立商业化的开源产品**，以标准协议拼接成可选的 AI 生态。

## 六个角色

| 品牌 | 中文名 | 关键词 | 独立价值 | 在生态中 |
|------|--------|--------|----------|----------|
| [BlockyEdu](https://github.com/blockyedu/VibeEdu) | 智码工坊 | 学 | AI 编程教育 | 培养工程师 |
| [SyncroBrain](https://github.com/syncrobrain/LuminaryIoTChain) | 万物智脑 | 连 | 开源 IoT PaaS | 设备 MQTT 管道 |
| [DataLuminary](https://github.com/dataluminary/DataLuminary-Platform) | 数据明鉴 | 看 | 数据洞察 / 大屏 | 统一图表层 |
| [VistaCast](https://github.com/vistacast) | 视界云遥 | 视 | AI 摄像头云监控 | 线下视觉数据流（规划） |
| [VistaRemote](https://github.com/VistaRemote/vibeCode) | 视界远程 | 控 | WebRTC 远程桌面 | 人工远程触达 |
| [DoerFlow](https://github.com/doerflow/VibeAgent) | 智工网 | 赚 | 链上 AI 市场 | AI 能力变现 |

> **VistaCast 与 VistaRemote 并存**：前者为固定摄像头 AI 分析，后者为远程桌面运维；品牌、组织、代码仓分离。

## 组合场景（按需，非捆绑）

| 客户 | 推荐组合 |
|------|----------|
| 硬件创业公司 | SyncroBrain + BlockyEdu |
| 制造企业 | SyncroBrain + DataLuminary + VistaCast + VistaRemote |
| 连锁零售 | VistaCast + DataLuminary |
| 数据团队 | DataLuminary 单体 |
| 运维服务商 | VistaRemote + DataLuminary |
| Web3 / AI 团队 | DoerFlow + SyncroBrain |

## 成长飞轮

```text
更多厂商接入 IoT ──► 更多遥测与视频数据 ──► DataLuminary 洞察增值
        │                                      │
        ▼                                      ▼
 BlockyEdu 输送工程师          VistaCast AI 告警 + DoerFlow Agent
        │                                      │
        └──────► VistaRemote 人工运维 ◄────────┘
```

## 统一体验

- **一次登录**：中央 [Logto OIDC](/develop/unified-login)，各产品同一 `sub`
- **权限统一**：`resource:action`（[PAL](https://github.com/LuminaryWorks/shared)）
- **数据隔离**：无跨产品外键，仅 JWT / API / 事件关联
