# VistaCast · 视界云遥

> 角色 **视** · 组织 [VistaCast](https://github.com/VistaCast) · 官网 [vistacast.dev](https://vistacast.dev) · **状态**：📋 D0 规划 / 文档阶段

**AI Visual Autopilot** — 纯软件 AI 云监控，兼容海康、大华、小米、TP-Link 等 ONVIF/RTSP 摄像头。不做硬件，把固定摄像头变成结构化安全与运营事件。

## 定位

| 维度 | 说明 |
|------|------|
| 一句话 | 存量摄像头的 AI 升级层 — 客流、防盗、异常检测 |
| 生态角色 | **视** — 线下视觉数据流 + AI 事件源 |
| 独立商用 | 可不依赖兄弟产品单独部署 |
| 与 VistaRemote | **并存**：VC = 摄像头 AI；VR = 远程桌面人工触达 |

## 目标场景

| 优先级 | 场景 | AI 能力 |
|:------:|------|---------|
| P0 | 连锁门店（奶茶/快餐） | 客流、排队、时段分布 |
| P0 | 仓储防盗 | 陌生人脸、越界、夜间异动 |
| P1 | 工厂危险区域 | 闯入、跌倒/烟雾/打架 |
| P2 | 物业多站点 | 统一看板（M3） |

## 版本路线

| 阶段 | 代号 | 交付 |
|:----:|------|------|
| D0 | Blueprint | 战略、产品、架构 Spec（**当前**） |
| M1 | Horizon | ONVIF + Admin + 客流/陌生人告警 + Docker 私有化 |
| M2 | Sentinel | 规则引擎 GA、异常检测、Webhook/MQTT |
| M3 | Nexus | Re-ID、DataLuminary 大屏模板、SyncroBrain 联动 |

M1 编码启动条件：DataLuminary、BlockyEdu P0 完成 + 试点场景确认。

## 规划能力（按里程碑）

| 能力 | M1 | M2 | M3 |
|------|:--:|:--:|:--:|
| 陌生人脸告警 | ✅ | | |
| 客流统计与报表 | ✅ | | |
| 区域入侵 | ✅ | | |
| 规则引擎 / 告警去重 | 基础 | GA | |
| 异常检测（摔倒/打架/冒烟） | | ✅ | |
| Webhook / MQTT 出站 | | ✅ | |
| 跨摄像头 Re-ID | | | ✅ |
| DataLuminary 数据集模板 | | | ✅ |

## 与 VistaRemote 的区别

| | VistaCast | [VistaRemote](./vistaremote) |
|---|-----------|------------------------------|
| 输入 | 固定摄像头 ONVIF/RTSP | 远程桌面 WebRTC |
| 价值 | AI 自动告警、防盗、客流 | 人工远程操作、录制审计 |
| 状态 | 文档先行 | 已有代码基线 |

## 技术栈（规划）

NestJS + Fastify + TypeORM + PostgreSQL · ONVIF/RTSP · WebSocket · React Admin · `@luminaryworks/auth-core`

开发方法：**Spec-Driven + Artifacts Workflow**（`spec/` → `artifacts/contracts/` → `repos/`）

## 在生态中

```text
VistaCast（视）— vistacast.dev
  ├─► DataLuminary   dataluminary.dev — 告警/客流大屏
  ├─► SyncroBrain    syncrobrain.com — 设备台账互补
  ├─► VistaRemote    remote.vistacast.dev — 告警后可选人工介入
  ├─► DoerFlow       doerflow.dev — 视觉事件触发 Skill
  └─► BlockyEdu      blockyedu.com — 安防实训
```

## 文档

| 文档 | 链接 |
|------|------|
| 战略分析 | [spec/strategic-analysis.md](https://github.com/VistaCast/vistacast/blob/main/spec/strategic-analysis.md) |
| 产品路线图（FR/US） | [spec/product-roadmap.md](https://github.com/VistaCast/vistacast/blob/main/spec/product-roadmap.md) |
| 路线图 | [ROADMAP.md](https://github.com/VistaCast/vistacast/blob/main/ROADMAP.md) |
| LuminaryWorks spec | [spec/products/vistacast.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/products/vistacast.md) |

**当前无公开实现仓。** 规划 spec 见 [VistaCast/vistacast](https://github.com/VistaCast/vistacast)。请勿 clone 旧 vistacast 远程桌面仓库当作本产品。
