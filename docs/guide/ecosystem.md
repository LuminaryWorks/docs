# 生态叙事

AI 正在重塑软件价值链：从「写代码」到「编排 Agent」，从「看报表」到「设备自治」，从「中心化 SaaS」到「可私有化 + 链上结算」。单一产品难以覆盖 **创造/教育 → 设备 → 数据 → 视觉 → 运维 → 交易** 全链路。

**[LuminaryWorks（启明工坊）](https://luminaryworks.dev)** 用**六个可独立商业化的开源产品**，以标准协议拼接成可选的 AI 产业生态。平台本身不是这六个产品的运营方：各产品有自己的仓库、域名、条款和发布节奏，经 LuminaryWorks 按需共享身份与权益。

## 三个视角看同一套生态

### 产品：单品能卖，组合才有溢价

单品必须在兄弟产品全部关闭时仍能交付，否则「可独立商业化」只是口号。组合的溢价来自一条可拆开的业务链，而不是功能捆绑：

```text
看见（VistaCast：SMT / 波峰焊 AOI 判定，或现场告警）
  → 定性（SyncroBrain Incident / 设备上下文）
  → 计价与派工（DoerFlow Job / Receipt）
  → 人上去处理（VistaRemote 会话与审计）
  → 给管理层看（DataLuminary 看板）
  → 把处置写成可复用能力（BlockyEdu 课程 / 演练）
```

客户可以只买其中一环。BlockyEdu 在完整现场方案里是培训入口，`required=false`，不是产线运行依赖。VistaCast 与 VistaRemote 是两条视觉产品线：一个吃固定摄像头，一个吃远程桌面，品牌和仓库分开，避免「监控」和「远控」在合规叙事上缠在一起。

### 运营：账号、套餐、现场故障分开管

| 运营动作 | 落点 | 不该发生的事 |
|----------|------|----------------|
| 员工用企业 SSO 进任意已购产品 | Auth Gateway → 客户 IdP 或默认 Logto | 每个产品各发一套账号 |
| 开通 / 到期 / 席位 / 离线 License | 中央 Entitlement，或 `offline_license` | 把套餐写进 JWT，或各产品各建会员库 |
| 谁能看哪块看板、哪路摄像头、哪次会话 | 该产品的 Casbin | 用「企业管理员」一个角色打通全部资源 |
| 断网机房 | `air-gapped`：AI 不得走中央，权益可离线 | 为了报表把视频帧、学员档案、钱包私钥送出网 |
| 一个产品升级或宕机 | 该产品自己的库和 Compose project | 共享业务库把其它产品一起拖死 |

试用政策也按产品拆开：多数产品 7×24 小时、每用户每产品一次；**没有永久 Free**。DoerFlow 不提供 Trial，只卖 Pro / Ultra / Enterprise，因为平台配额和链上 Gas、Escrow 不是同一本账。VistaCast、SyncroBrain 在中央目录就绪前不可售、不发 Trial。

### 架构：优势来自拒绝耦合

技术优势不是「什么都有」，而是几条可执行的拒绝：

- **拒绝共享业务库。** 备份、迁移、删数、等保边界按产品切，不按「中台表」切。
- **拒绝用 JWT 携带权益。** 登录是快照，套餐是会变的事实，查询中央服务或验离线 License。
- **拒绝隐式关联。** 跨产品只认 `(issuer, sub)` 加上显式绑定；同名站点不能自动对上。
- **拒绝把实时视觉送进大模型网关。** 摄像头推理留在产品内；中央 AI 只负责密钥、补全和计量。领域意图仍归产品。质检判定不调用 LLM。

展开见 [总体架构](/guide/architecture)。

## 六个角色

| 品牌 | 中文名 | 官网 | 关键词 | 独立价值 | 在生态中 |
|------|--------|------|--------|----------|----------|
| [BlockyEdu](https://blockyedu.com) | 智码工坊 | [blockyedu.com](https://blockyedu.com) | 学 + 创 | AI 全民创造 + **VibeLearn 企业大学私有化**（对标知鸟） | 产出可发布作品；也可单独交付企业内部培训 LMS |
| [SyncroBrain](https://syncrobrain.com) | 万物智脑 | [syncrobrain.com](https://syncrobrain.com) | 连 | 开源 IoT PaaS | 设备接入与规则管道 |
| [DataLuminary](https://dataluminary.dev) | 数据明鉴 | [dataluminary.dev](https://dataluminary.dev) | 看 | 数据洞察 / 大屏 | 统一可视化与决策层 |
| [VistaCast](https://vistacast.dev) | 视界云遥 | [vistacast.dev](https://vistacast.dev) | 视 | 固定摄像头视觉事件 | 门店客流、仓储安防、产线 AOI 三条方向 |
| [VistaRemote](https://remote.vistacast.dev) | 视界远程 | [remote.vistacast.dev](https://remote.vistacast.dev) | 控 | WebRTC 远程桌面 | 人工远程运维触达 |
| [DoerFlow](https://doerflow.dev) | 智工网 | [doerflow.dev](https://doerflow.dev) | 赚 | Agent / Skill 交易网络 | Agent、云与人类服务的调用结算 |

> **VistaCast 与 VistaRemote 并存**：前者是固定摄像头（客流、安防、产线 AOI），后者是远程桌面。品牌与仓库分开，可独立售卖。

## 组合场景（按需，非捆绑）

| 客户 | 推荐组合 |
|------|----------|
| 硬件创业公司 / 创客教育 | SyncroBrain + BlockyEdu（创造 + 标准玩具 / 实验课） |
| 培训机构 / 学校 | BlockyEdu 学中创；或 **VibeLearn 私有化**企业大学 |
| 大中型企业内训 / 合规 | **VibeLearn `edu-standalone`**（知鸟类：组织/SSO/必修/考试/证书） |
| 电子制造 / PCBA | VistaCast 工位 AOI（SMT / 波峰 / DIP）+ DataLuminary 直通率；需要上手时加 VistaRemote |
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

- **默认统一账号**：经 [Auth Gateway](/develop/auth-gateway) → IAM Adapter（**默认 Logto**，选型已冻结；或企业 OIDC / 预留 ZITADEL）；各产品同一用户主体（`issuer + sub`）
- **登录页**：产品品牌自建；主 CTA 为统一账号 / 企业 SSO，本地账密仅开发回退
- **权限解耦**：身份归 IdP；商业权益归 Entitlement；资源 ACL 归各产品 Casbin（[PAL](https://github.com/LuminaryWorks/shared)）
- **数据隔离**：无跨产品外键；仅 JWT / API / 事件关联；本地 `user_id ↔ sub` 便于业务剥离
- **可替换协议**：OIDC、MQTT、REST、WebRTC、ONVIF；换 IdP 不改产品代码

详见 [统一登录](/develop/unified-login)。

## 开源与商业

生态核心产品采用 **[Polyform Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/)**（Polyform-NC）：允许非商业使用、学习与私有化部署；商业授权可按产品独立洽谈，形成清晰的开源获客 + 商业变现路径。

DoerFlow 的商业层与协议层分开：平台账号采用 Logto，非托管钱包继续由用户本地签名；只提供 Pro、Ultra、Enterprise，不提供免费 Trial。平台套餐覆盖托管 API/配额，Gas、Escrow 与协议费仍按协议规则结算。客户端明确区分 401 登录、402 套餐/配额与 403 资源权限。
