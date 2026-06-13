# VistaRemote · 视界远程

> 角色 **控** · 组织 [VistaRemote](https://github.com/VistaRemote) · MetaRepo [vibeCode](https://github.com/VistaRemote/vibeCode)

WebRTC 实时远程桌面控制与自托管 AI 录制洞察。适配工控机、边缘网关、IT 桌面、客服远程协助等场景，可单独交付私有化运维产品。

## 核心能力

| 模块 | 说明 |
|------|------|
| **实时控制** | WebRTC 低延迟远程桌面，支持多会话与权限分级 |
| **AI 录制洞察** | 会话录制 + 自托管 AI 摘要、异常检测与检索 |
| **管理台** | 设备/会话管理、审计日志、PAL 权限 |
| **多端** | Electron Agent、Web Client/Admin、React Native 主控 |
| **统一登录** | LuminaryWorks OIDC，与企业 IdP 可替换 |

## 技术栈

- **信令 / 媒体**：WebRTC + 自托管 TURN
- **后端**：NestJS + TypeORM + PostgreSQL
- **前端**：React（Rsbuild）· Electron · React Native

## 与 VistaCast 的区别

[VistaCast](./vistacast) 为 **AI 固定摄像头云监控**（ONVIF），与本产品 **并存**：VistaCast 自动告警，VistaRemote 人工远程介入。

## 在生态中

- 触达 IoT 设备、边缘网关、工控机的**远程运维入口**
- 录制 → AI 摘要 → 结果写入 DataLuminary 报表
- 与 SyncroBrain 设备台账联动

## 快速开始

```bash
git clone https://github.com/VistaRemote/vibeCode.git
# 或本地 D:\www\vistaremote
./init.ps1
```

详见 [LuminaryWorks/spec/products/vistaremote.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/products/vistaremote.md)
