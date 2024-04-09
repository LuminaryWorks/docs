# DataLuminary · 数据明鉴

> 角色 **看** · 组织 [dataluminary](https://github.com/dataluminary) · 官网 [dataluminary.dev](https://dataluminary.dev) · MetaRepo [DataLuminary-Platform](https://github.com/dataluminary/DataLuminary-Platform)

AI 数据洞察平台：空间化数据集管理、DataTalk 可视化大屏、细粒度权限与 AI 辅助分析。可单独商用于企业 BI、运营监控、IoT 遥测看板等场景。

## 核心能力

| 模块 | 说明 |
|------|------|
| **DataTalk** | NestJS 后端 + 大屏编排：空间、仪表盘、图表面板、数据集、数据源 |
| **DataView** | 前端可视化编辑器，拖拽式大屏搭建与主题定制 |
| **数据源插件** | 支持 PostgreSQL、MySQL（外部库）、Excel 导入等；`kind` 与 TypeORM 驱动对齐 |
| **权限 (PAL)** | `space` / `dashboard` / `dataset` / `datasource` 等资源级 `resource:action` |
| **统一登录** | Logto OIDC + 本地账号双模式；与 [LuminaryWorks/identity](https://github.com/LuminaryWorks/identity) 对齐 |

## 技术栈

- **OLTP**：PostgreSQL（平台主库，TypeORM migrations）
- **后端**：NestJS + Fastify + TypeORM
- **前端**：React + 自研图表引擎
- **共享库**：`@luminaryworks/auth-core`、`@luminaryworks/pal`（[LuminaryWorks/shared](https://github.com/LuminaryWorks/shared)）

为何平台 OLTP 用 PostgreSQL（而非 MySQL）：见 [数据存储策略](/develop/datastore)。

## 在生态中

- 设备遥测、远程录制、Agent 运行日志的**统一图表层**
- SyncroBrain 控制台可嵌入 DataTalk 大屏
- 暂托管共享库与生态级 spec（按 [MIGRATION.md](https://github.com/LuminaryWorks/shared/blob/master/MIGRATION.md) 逐步迁入 LuminaryWorks）

## 典型集成

| 兄弟产品 | 官网 | 场景 |
|----------|------|------|
| [SyncroBrain](https://syncrobrain.com) | [syncrobrain.com](https://syncrobrain.com) | 设备监控大屏、遥测数据集接入 |
| [VistaCast](https://vistacast.dev) | [vistacast.dev](https://vistacast.dev) | 摄像头告警、客流报表（规划） |
| [VistaRemote](https://remote.vistacast.dev) | [remote.vistacast.dev](https://remote.vistacast.dev) | 远程会话录制、AI 摘要报表 |
| [DoerFlow](https://doerflow.dev) | [doerflow.dev](https://doerflow.dev) | Agent 运行指标、链上交易可视化 |
| [BlockyEdu](https://blockyedu.com) | [blockyedu.com](https://blockyedu.com) | 数据分析实训、SQL/可视化课程 |

## 快速开始

```bash
git clone https://github.com/dataluminary/DataLuminary-Platform.git
cd DataLuminary-Platform
pnpm bootstrap    # 子仓、依赖、PostgreSQL、migrate、seed
pnpm dev:talk       # DataTalk API
pnpm dev:view       # DataView 前端
```

新人上手（MetaRepo / 子仓）：[DataLuminary ONBOARDING](https://github.com/dataluminary/DataLuminary-Platform/blob/main/ONBOARDING.md) · [生态新人指南](/develop/onboarding)  
统一登录：[统一登录接入](/develop/unified-login) · [路线图](/develop/identity-roadmap)
