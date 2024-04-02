# AgentSkillMesh · 链上 AI 市场

> 角色 **赚** · 组织 [AgentSkillMesh](https://github.com/AgentSkillMesh) · MetaRepo [VibeAgent](https://github.com/AgentSkillMesh/VibeAgent)

以太坊上的 AI Agent / Skill 去中心化市场：发布、订阅、托管结算、风控与声誉。可单独服务 Web3 + AI 社区，也可作为生态「变现层」。

## 核心能力

| 模块 | 说明 |
|------|------|
| **Skill 市场** | Agent / Skill 上架、版本、定价与订阅 |
| **链上结算** | 智能合约托管、分成与提现 |
| **API 网关** | NestJS 后端，Skill 调用鉴权与用量计量 |
| **Worker** | 链下执行器，对接大模型与工具链 |
| **统一登录** | 平台 `sub` 与钱包地址映射（集成层，非强耦合） |

## 技术栈

- **链**：以太坊 / EVM 兼容链（Hardhat 开发）
- **后端**：NestJS + TypeORM + **SQLite**（链下索引；单机/边缘部署，不引入 MySQL/PG）
- **前端**：React 市场与管理台
- **共享库**：`@luminaryworks/auth-core`（OIDC 验签）

## 在生态中

- IoT 设备可注册视觉 / 控制 Agent，设备 owner 获链上收益
- LuminaryIoTChain 遥测事件可触发链下 Skill 推理，结果回写或结算
- DataLuminary 展示交易、调用量与运行健康度

## 典型集成

| 兄弟产品 | 场景 |
|----------|------|
| LuminaryIoTChain | 设备 Agent 上架、遥测触发推理 |
| DataLuminary | 交易与运行数据可视化 |
| BlockyEdu | 合约 / Agent / Skill 开发课程 |
| VistaRemote | Worker 端远程调试与录制审计 |

## 快速开始

```bash
git clone https://github.com/AgentSkillMesh/VibeAgent.git
cd VibeAgent
# 见 spec/development/unified-login.md
```
