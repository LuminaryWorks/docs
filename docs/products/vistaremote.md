# VistaRemote · 远程运维

> 角色 **控** · 组织 [VistaRemote](https://github.com/VistaRemote) · MetaRepo [vibeCode](https://github.com/VistaRemote/vibeCode)

WebRTC 实时远程桌面控制与自托管 AI 录制洞察。适配工控机、边缘网关、IT 桌面、客服远程协助等场景，可单独交付私有化运维产品。

## 核心能力

| 模块 | 说明 |
|------|------|
| **实时控制** | WebRTC 低延迟远程桌面，支持多会话与权限分级 |
| **AI 录制洞察** | 会话录制 + 自托管 AI 摘要、异常检测与检索 |
| **管理台** | 设备/会话管理、审计日志、PAL 权限 |
| **Agent Worker** | 可选对接 AgentSkillMesh 做自动化运维脚本 |
| **统一登录** | LuminaryWorks OIDC，与企业 IdP 可替换 |

## 技术栈

- **信令 / 媒体**：WebRTC + 自托管 TURN（可配置）
- **后端**：NestJS + TypeORM（**PostgreSQL**）
- **前端**：React 控制端与被控端
- **存储**：MinIO/S3 录制对象（可选）

## 在生态中

- 触达 IoT 设备、边缘网关、工控机的**远程运维入口**
- 录制 → AI 摘要/异常检测 → 结果写入 DataLuminary 报表
- 与 LuminaryIoTChain 设备台账联动（设备 ID / 租户隔离）

## 典型集成

| 兄弟产品 | 场景 |
|----------|------|
| LuminaryIoTChain | 设备远程维护、固件调试入口 |
| DataLuminary | 运维报表、会话审计大屏 |
| AgentSkillMesh | Worker 端调试、自动化脚本下发 |
| BlockyEdu | 远程运维与 WebRTC 教学实验 |

## 快速开始

```bash
git clone https://github.com/VistaRemote/vibeCode.git
cd VistaRemote
# 见 docs/development/luminaryworks-identity.md
```
