# BlockyEdu · 智码工坊

![BlockyEdu](/brand/blockyedu-logo.svg)


> 角色 **学 + 创** · 组织 [blockyedu](https://github.com/blockyedu) · 官网 [blockyedu.com](https://blockyedu.com) · MetaRepo [VibeEdu](https://github.com/blockyedu/VibeEdu)

AI 全民创造平台：用户用自然语言、积木或代码，把想法变成可预览、可发布、可履约的作品（Artifact）。默认路径是 **Create**；原有 Blockly / Monaco / AI 辅导与课程能力保留为同一产品中的 **Learn / Code** 模式，不拆第二套 C 端。

同时提供 **VibeLearn 企业大学**：对标知鸟类内部培训 LMS，可为企业做**私有化 / 专属云**独立交付，数据可留在客户内网，**无需引入**编程 IDE 或创造发布沙箱。

## 双轨道一览

| 轨道 | 名称 | 卖给谁 | 部署 |
|------|------|--------|------|
| C 端创造 | BlockyEdu Create | 创作者、学校学中创、创客 | `code-standalone` / full |
| B 端企业大学 | **VibeLearn** | 企业内训、合规培训、机构 LMS | **`edu-standalone` 私有化** |

创造主循环：

```text
想法 / 模板 → 构建 → 实时预览 → 校验 → 网站发布 / 小程序提审 / 玩具下单
```

企业内训主循环：

```text
组织 / SSO → 必修指派 → 学习 → 考试 → 证书 → 学情报表
```

## 核心能力

| 模块 | 说明 |
|------|------|
| **统一作品（Artifact）** | Web 网站、微信小程序、智能玩具、编程练习共用账户与作品库 |
| **三屏一助手工作台** | 资源 / Design·Blockly·Monaco / 实时预览 + AI 助手 |
| **安全预览** | 作品预览走隔离沙箱；控制台运行仅用于脚本练习 |
| **Web 发布** | 静态站 / 落地页 / 作品集：预览 → 平台托管发布 → 版本回滚 |
| **微信小程序** | 工程生成、预览码、上传与审核状态编排（不承诺无条件一键过审） |
| **智能玩具** | 标准主控 + 模块 SKU、数字孪生、BOM/DFM，再进入限定履约 |
| **学中创** | 课程任务可创建/提交同一 Artifact；Blockly ↔ Monaco 与 AI 辅导保留 |
| **VibeLearn 企业大学** | 对标知鸟：私有化内部培训；组织/SSO、必修、考试、证书、学情；直播可选 |
| **统一登录** | 与 LuminaryWorks 中央 IdP 同一 `sub`，机构可接企业 IdP |

## VibeLearn 私有化（对标知鸟）

面向企业「只买培训、数据不出域」的采购场景：

| 交付包 | 包含 | 不含 |
|--------|------|------|
| **Standard** | 组织/SSO、课程、进度、考试、证书、管理端、备份升级 | 直播、编程 IDE、创造发布 |
| **Professional** | Standard + 必修/学习地图增强 + 报表 + 品牌换肤 | 直播默认不加 |
| **Live** | Professional + media-platform 同栈直播 | 编程 IDE |
| **+ Code（加购）** | 编程考试 HTTP 桥接 | 创造履约默认仍关 |

技术边界：

- 后端：独立 `edu-server`；前端：`edu-app-web`
- 部署包：`deploy/edu`（Compose / 规划 Helm）
- **零依赖** code-server、Preview Host、玩具履约
- 企业 OIDC（AD / 自建 IdP / Logto）可接

权威规划在 BlockyEdu MetaRepo：

- `docs/roadmap/vibelearn-enterprise-lms-blueprint.md`
- `spec/edu-platform-standalone.md`

## 技术栈

- **创造 / 编程后端**：NestJS（code-server）+ TypeORM + **PostgreSQL**
- **教育后端**：独立 `edu-server`（VibeLearn）
- **前端**：`code-app-web`（Rsbuild + React + Blockly + Monaco）；`edu-app-web`（Next.js）
- **AI**：教辅 / 创造编排在产品内；模型密钥与补全走 [LuminaryWorks AI 平台](/develop/ai-platform) 契约（`ai-bridge` 作 BFF，不新建平行 `ai-engine`）
- **预览**：独立 origin Preview Host（与脚本控制台执行解耦）
- **直播（Live 包）**：`media-platform`（WebRTC / 信令）

## 在生态中

- **学 + 创**入口：既输送工程师，也产出可发布网站、小程序与标准玩具订单
- **企业大学**入口：VibeLearn 私有化服务内训与合规，不强迫采购创造能力
- AI 辅导降低硬件厂商固件 / MQTT 接入成本，缩短 SyncroBrain onboarding 周期
- 玩具真机连接 / OTA 走 SyncroBrain 边界；数字孪生与订单在 BlockyEdu
- 课程与创作漏斗数据可对接 DataLuminary；Agent / Skill 课出口对接 DoerFlow

## 典型集成

| 兄弟产品 | 官网 | 场景 |
|----------|------|------|
| [SyncroBrain](https://syncrobrain.com) | [syncrobrain.com](https://syncrobrain.com) | 真机 / OTA；ESPHome/MQTT/ThingsBoard 实验课 |
| [DataLuminary](https://dataluminary.dev) | [dataluminary.dev](https://dataluminary.dev) | 创作漏斗、学情与企业培训报表分析 |
| [DoerFlow](https://doerflow.dev) | [doerflow.dev](https://doerflow.dev) | 智能合约 / Agent / Skill 开发课 |
| [VistaRemote](https://remote.vistacast.dev) | [remote.vistacast.dev](https://remote.vistacast.dev) | WebRTC 远程运维实验 |
| [VistaCast](https://vistacast.dev) | [vistacast.dev](https://vistacast.dev) | 安防与客流分析实训 |

## 明确边界

- 不拆 Create / Learn 两套 C 端产品线
- 企业客户可只采购 **VibeLearn 私有化**，无需创造/编程沙箱
- VibeLearn Standard **不**捆绑直播与编程判题
- 不承诺微信无条件一键上线或代替用户持有主体资质
- 玩具首期不做任意定制制造（标准 SKU + 受约束 UI DSL）
- 不承诺任意 Web CSS → LVGL；AI 不绕过确定性校验直接发布

## 快速开始

```bash
git clone https://github.com/blockyedu/VibeEdu.git
cd VibeEdu

# 创造平台蓝图
# docs/roadmap/ai-creation-platform-blueprint.md

# 企业大学私有化（知鸟类）
# docs/roadmap/vibelearn-enterprise-lms-blueprint.md
# pnpm run dev:edu-standalone
# 或 deploy/edu

# 身份联调
# docs/development/luminaryworks-identity.md
```
