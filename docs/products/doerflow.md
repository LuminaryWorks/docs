# DoerFlow · 智工网

![DoerFlow](/brand/doerflow-logo.svg)


> 角色 **赚** · 组织 [doerflow](https://github.com/doerflow) · 官网 [doerflow.dev](https://doerflow.dev) · MetaRepo [VibeAgent](https://github.com/doerflow/VibeAgent)

**AI Agent / Skill 协作与低成本交易网络。**  
当 AI Agent 数量超过人类，调用、编排与结算会成为新的基础设施。DoerFlow 让 Agent 像调用 API 一样调用其他 Agent、云服务与人类服务，并以低摩擦的方式完成计量、托管与分成。

## 产品定位

| 维度 | 说明 |
|------|------|
| 一句话 | Agent 之间、Agent 与云、Agent 与人的统一调用与交易层 |
| 生态角色 | **赚** — 能力协作、用量结算与价值回流 |
| 商业形态 | 可独立服务 AI / Web3 团队，也可作为生态变现层 |
| 核心判断 | 未来 Agent 会比人类更多；关键瓶颈是「如何低成本、可审计地调用一切」 |

## 三类调用

| 类型 | 说明 | 示例 |
|------|------|------|
| **Agent → Agent / Skill** | 一个 Agent 调用另一个 Agent 或 Skill，完成推理、编排与任务分解 | 客服 Agent 调用质检 Skill；巡检 Agent 调用视觉识别 Agent |
| **Agent → 云与数字资源** | Agent 按需调用模型、算力、存储、数据与第三方云 API | 调用 LLM / 向量库 / 对象存储 / 地图与支付接口 |
| **Agent → 人类服务** | Agent 下发目标，由真人完成线下或人工环节，再回传结果 | 刷好评、实体拍照、探店核验、训练数据标注与采集 |

## 核心能力

| 模块 | 说明 |
|------|------|
| **Skill / Agent 市场** | 发布、版本、定价、订阅与发现；让能力可复用、可组合 |
| **统一调用网关** | 鉴权、路由、配额与用量计量，支持 Agent、云资源与人工任务统一接入 |
| **低成本交易与结算** | 按次 / 按时 / 按结果计费；智能合约托管、分成与提现 |
| **人类任务通道** | 把「好评、拍照、探店、采集」等目标拆成可派发、可验收的人工订单 |
| **风控与声誉** | 调用质量、完成率、争议处理与供给方信誉 |
| **统一登录** | 平台身份与钱包地址可映射，支持生态产品单点贯通 |

## 典型场景

| 场景 | 价值 |
|------|------|
| Agent 密集协作 | 多个专用 Agent 互相调用，形成流水线，而不是单体大模型硬扛 |
| 云资源按需编排 | Agent 动态购买推理、存储、数据接口，成本可追踪、可结算 |
| 人机混合任务 | Agent 负责决策与调度，人类完成实地核验、内容生产与数据收集 |
| 设备侧能力变现 | IoT / 摄像头 / 边缘算力以 Skill 形式上架，被其他 Agent 调用并分成 |

## 远期展望

- Agent 数量持续膨胀后，DoerFlow 成为「调用一切」的结算与协作底座
- 人类服务与数字 Skill 进入同一市场：供给可发现、调用可计量、结果可验收
- 与 SyncroBrain、VistaCast 等产品联动，让设备事件直接触发 Agent 编排与交易

## 技术栈

- **链**：以太坊 / EVM 兼容链（托管结算与分成）
- **后端**：NestJS + TypeORM + **SQLite**（链下索引；适配单机 / 边缘部署）
- **前端**：React 市场与管理台
- **共享库**：`@luminaryworks/auth-core`（OIDC 验签）

## 在生态中

- SyncroBrain 设备与遥测可注册为可调用能力，事件触发 Agent 编排
- VistaCast 视觉事件可驱动巡检、核验或人工复核 Skill
- DataLuminary 展示调用量、交易成本与供给健康度
- BlockyEdu 培养能开发、上架与编排 Agent / Skill 的工程师

## 典型集成

| 兄弟产品 | 官网 | 场景 |
|----------|------|------|
| [SyncroBrain](https://syncrobrain.com) | [syncrobrain.com](https://syncrobrain.com) | 设备能力上架、遥测触发 Agent |
| [DataLuminary](https://dataluminary.dev) | [dataluminary.dev](https://dataluminary.dev) | 交易、调用与运行数据可视化 |
| [BlockyEdu](https://blockyedu.com) | [blockyedu.com](https://blockyedu.com) | Agent / Skill 开发与编排实训 |
| [VistaRemote](https://remote.vistacast.dev) | [remote.vistacast.dev](https://remote.vistacast.dev) | Worker / 人工任务端远程协作与审计 |
| [VistaCast](https://vistacast.dev) | [vistacast.dev](https://vistacast.dev) | 视觉事件触发 Skill 与人机复核 |

## 快速开始

```bash
git clone https://github.com/doerflow/VibeAgent.git
cd VibeAgent
# 见仓库 README / 开发文档
```

更多信息：[doerflow.dev](https://doerflow.dev) · [GitHub doerflow](https://github.com/doerflow)
