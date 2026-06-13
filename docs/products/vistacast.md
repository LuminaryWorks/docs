# VistaCast · 视界云遥

> 角色 **视** · 组织 [VistaCast](https://github.com/VistaCast) · **状态**：📋 规划 / 文档阶段

**AI Visual Autopilot** — 纯软件 AI 云监控 SaaS，兼容海康、大华、小米、TP-Link 等 ONVIF/RTSP 摄像头。不做硬件，只做软件。

## 定位

把线下场景变成可分析的数字化视频流：

| 场景 | AI 能力 |
|------|---------|
| 仓储防盗 | 陌生人脸告警、越界检测 |
| 奶茶店出餐口 | 客流统计、排队时长 |
| 工厂危险区域 | 人员闯入、跌倒/烟雾/打架识别 |

## 规划能力

- 人脸识别：陌生人自动告警
- 异常检测：摔倒、打架、冒烟
- 客流统计：进店人数、时段分布
- 员工监管：离岗检测（可配置）
- 跨摄像头追踪：Re-ID 轨迹（M3）

## 与 VistaRemote 的区别

| | VistaCast | [VistaRemote](./vistaremote) |
|---|-----------|------------------------------|
| 输入 | 固定摄像头 | 远程桌面屏幕 |
| 价值 | AI 自动告警、防盗、客流 | 人工远程操作、录制审计 |
| 状态 | 文档先行 | 已有代码基线 |

## 技术栈（规划）

NestJS + Fastify + TypeORM + PostgreSQL · ONVIF/RTSP · WebSocket · React Admin

## 在生态中

- 告警与客流 → **DataLuminary** 大屏
- 设备台账 → **SyncroBrain** 互补
- 告警后人工介入 → 可选 **VistaRemote**

## 文档

规划 spec 见 [LuminaryWorks/spec/products/vistacast.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/products/vistacast.md)。**当前无公开实现仓，请勿 clone 旧 vistacast 远程桌面仓库当作本产品。**
