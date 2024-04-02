# LuminaryIoTChain · IoT PaaS

> 角色 **连** · 组织 [LuminaryIoTChain](https://github.com/LuminaryIoTChain) · MetaRepo [LuminaryIoTChain](https://github.com/LuminaryIoTChain/LuminaryIoTChain)

开源、AI 驱动的 IoT PaaS：参考涂鸦类生态，以更低成本为硬件厂商提供设备接入、多租户控制台、规则引擎与 App 能力。Apache/MIT 栈，可私有化部署。

## 核心能力

| 模块 | 说明 |
|------|------|
| **设备接入** | MQTT（EMQX）、设备影子、OTA、多租户隔离 |
| **规则引擎** | ThingsBoard CE 规则链 + 自定义 iot-gateway 编排 |
| **控制台** | iot-console-web 设备管理、遥测、告警 |
| **生态网关** | NestJS iot-gateway：JWT 验签、PAL、与 DataTalk / Agent 对接 |
| **终端 App** | Flutter / RN 模板（规划中） |

## 四层架构

| 层 | 选型 | 职责 |
|----|------|------|
| Edge | ESPHome / Tasmota | 硬件标准化、OTA |
| Pipe | EMQX (OSS) | 高并发 MQTT |
| Brain | ThingsBoard CE + iot-gateway | 设备影子、规则、多租户、生态编排 |
| Client | Flutter/RN + iot-console-web | 控制监控；DataTalk 图表嵌入 |

## 与闭源 IoT 云差异

- **开源可私有化**，许可与扩容成本更低
- **不止设备管理**：AI 推理（AgentSkillMesh）+ 专业大屏（DataLuminary）+ 远程运维（VistaRemote）
- **BlockyEdu AI 辅助接入**，缩短固件与 MQTT 联调周期
- **标准协议**：MQTT、REST、OIDC，无厂商锁定

## 核心链路

```text
设备 ──MQTT──► EMQX ──► ThingsBoard / iot-gateway ──API──► 控制台 & App
                              │
                              ├──► DataLuminary 大屏
                              ├──► AgentSkillMesh 推理
                              └──► VistaRemote 远程维护
```

## 数据存储

- **OLTP**：PostgreSQL（`iot-gateway`，与 Logto / DataTalk 同栈）
- **时序 / 分析**：ClickHouse 增量引入（IoT-M5）

选型说明：[数据存储 / PostgreSQL](/develop/datastore)

## 仓库模型

对齐 BlockyEdu：**公开 docs**、**私有** MetaRepo + gateway + console — [repository-split 计划](https://github.com/LuminaryIoTChain/LuminaryIoTChain/blob/master/plan/repository-split.md)

## 快速开始

```bash
git clone https://github.com/LuminaryIoTChain/LuminaryIoTChain.git
cd LuminaryIoTChain
# 详见 ONBOARDING.md
```

[新人上手（IoT）](https://github.com/LuminaryIoTChain/LuminaryIoTChain/blob/main/ONBOARDING.md) · [生态新人指南](/develop/onboarding) · [统一登录](/develop/unified-login)
