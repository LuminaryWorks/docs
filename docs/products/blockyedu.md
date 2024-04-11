# BlockyEdu · 智码工坊

![BlockyEdu](/brand/blockyedu-logo.svg)


> 角色 **学** · 组织 [blockyedu](https://github.com/blockyedu) · 官网 [blockyedu.com](https://blockyedu.com) · MetaRepo [VibeEdu](https://github.com/blockyedu/VibeEdu)

AI 原生编程教育平台：Blockly 图形化 + Monaco 代码编辑 + AI 辅导 + IoT 实验课。面向 K12、高校、培训机构与硬件厂商工程师培训，可单独交付。

## 核心能力

| 模块 | 说明 |
|------|------|
| **图形化编程** | Blockly 积木 + 实时代码预览，降低嵌入式与 Web 入门门槛 |
| **AI 辅导** | 上下文感知的代码解释、纠错与练习生成 |
| **IoT 实验** | ESPHome / MQTT / ThingsBoard 实验模板，对接 SyncroBrain |
| **课程管理** | 班级、作业、进度追踪与权限隔离 |
| **统一登录** | 与 LuminaryWorks 中央 IdP 同一 `sub`，学校可接企业 IdP |

## 技术栈

- **后端**：NestJS + TypeORM + **PostgreSQL**
- **前端**：React + Blockly + Monaco
- **AI**：独立 ai-engine 微服务（向量检索可选 Milvus）

## 在生态中

- 培养能接入 SyncroBrain、开发 DoerFlow Skill、使用 DataLuminary 的工程师
- AI 辅导降低硬件厂商固件 / MQTT 接入成本，缩短 SyncroBrain onboarding 周期
- 课程产物（Agent、大屏）可直接部署到兄弟产品

## 典型集成

| 兄弟产品 | 官网 | 场景 |
|----------|------|------|
| [SyncroBrain](https://syncrobrain.com) | [syncrobrain.com](https://syncrobrain.com) | ESPHome/MQTT/ThingsBoard 实验课、设备上云实训 |
| [DataLuminary](https://dataluminary.dev) | [dataluminary.dev](https://dataluminary.dev) | 数据分析实训、运营大屏案例 |
| [DoerFlow](https://doerflow.dev) | [doerflow.dev](https://doerflow.dev) | 智能合约 / Agent / Skill 开发课 |
| [VistaRemote](https://remote.vistacast.dev) | [remote.vistacast.dev](https://remote.vistacast.dev) | WebRTC 远程运维实验 |
| [VistaCast](https://vistacast.dev) | [vistacast.dev](https://vistacast.dev) | 安防与客流分析实训 |

## 快速开始

```bash
git clone https://github.com/blockyedu/VibeEdu.git
cd VibeEdu
# 见仓库 docs/development/luminaryworks-identity.md
```
