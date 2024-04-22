# 生态叙事

AI 正在重塑软件价值链：从「写代码」到「编排 Agent」，从「看报表」到「设备自治」，从「中心化 SaaS」到「可私有化 + 链上结算」。单一产品难以覆盖 **创造/教育 → 设备 → 数据 → 视觉 → 运维 → 交易** 全链路。

**[LuminaryWorks（启明工坊）](https://luminaryworks.dev)** 用**六个可独立商业化的开源产品**，以标准协议拼接成可选的 AI 产业生态。

## 六个角色

| 品牌 | 中文名 | 官网 | 关键词 | 独立价值 | 在生态中 |
|------|--------|------|--------|----------|----------|
| [BlockyEdu](https://blockyedu.com) | 智码工坊 | [blockyedu.com](https://blockyedu.com) | 学 + 创 | AI 全民创造 + **VibeLearn 企业大学私有化**（对标知鸟） | 产出可发布作品；也可单独交付企业内部培训 LMS |
| [SyncroBrain](https://syncrobrain.com) | 万物智脑 | [syncrobrain.com](https://syncrobrain.com) | 连 | 开源 IoT PaaS | 设备接入与规则管道 |
| [DataLuminary](https://dataluminary.dev) | 数据明鉴 | [dataluminary.dev](https://dataluminary.dev) | 看 | 数据洞察 / 大屏 | 统一可视化与决策层 |
| [VistaCast](https://vistacast.dev) | 视界云遥 | [vistacast.dev](https://vistacast.dev) | 视 | AI 摄像头云监控 | 线下视觉事件流 |
| [VistaRemote](https://remote.vistacast.dev) | 视界远程 | [remote.vistacast.dev](https://remote.vistacast.dev) | 控 | WebRTC 远程桌面 | 人工远程运维触达 |
| [DoerFlow](https://doerflow.dev) | 智工网 | [doerflow.dev](https://doerflow.dev) | 赚 | Agent / Skill 交易网络 | Agent、云与人类服务的调用结算 |

> **VistaCast 与 VistaRemote 并存**：前者为固定摄像头 AI 分析，后者为远程桌面运维；品牌、组织与产品线分离，可独立售卖、按需组合。

## 组合场景（按需，非捆绑）

| 客户 | 推荐组合 |
|------|----------|
| 硬件创业公司 / 创客教育 | SyncroBrain + BlockyEdu（创造 + 标准玩具 / 实验课） |
| 培训机构 / 学校 | BlockyEdu 学中创；或 **VibeLearn 私有化**企业大学 |
| 大中型企业内训 / 合规 | **VibeLearn `edu-standalone`**（知鸟类：组织/SSO/必修/考试/证书） |
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
 BlockyEdu 创造作品 + VibeLearn 企业大学   VistaCast AI 告警 + DoerFlow Agent
   （Web / 小程序 / 玩具 · 私有化内训）              │
        │                                      │
        └──────► VistaRemote 人工运维 ◄────────┘
```

## 统一体验

- **默认统一账号**：经 [Auth Gateway](/develop/auth-gateway) → IdP（中心 Logto 或企业 SSO）；各产品同一用户主体（`sub`）
- **登录页**：产品品牌自建；主 CTA 为统一账号 / 企业 SSO，本地账密仅开发回退
- **权限解耦**：身份归 IdP；商业权益归 Entitlement；资源 ACL 归各产品 Casbin（[PAL](https://github.com/LuminaryWorks/shared)）
- **数据隔离**：无跨产品外键；仅 JWT / API / 事件关联；本地 `user_id ↔ sub` 便于业务剥离
- **可替换协议**：OIDC、MQTT、REST、WebRTC、ONVIF；换 IdP 不改产品代码

详见 [统一登录](/develop/unified-login)。

## 开源与商业

生态核心产品采用 **[Polyform Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/)**（Polyform-NC）：允许非商业使用、学习与私有化部署；商业授权可按产品独立洽谈，形成清晰的开源获客 + 商业变现路径。

DoerFlow 的商业层与协议层分开：平台账号采用 Logto，非托管钱包继续由用户本地签名；只提供 Pro、Ultra、Enterprise，不提供免费 Trial。平台套餐覆盖托管 API/配额，Gas、Escrow 与协议费仍按协议规则结算。客户端明确区分 401 登录、402 套餐/配额与 403 资源权限。
