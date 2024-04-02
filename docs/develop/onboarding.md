# 新人上手指南（五产品通用）

无论你在 **MetaRepo（Vibe Code 编排仓）** 还是 **子仓库（前端 / 后端 / 文档）** 开发，按下面三步即可跑通本地环境。

## 0. 推荐目录布局

```text
D:\www\
├── LuminaryWorks\
│   ├── docs\          # 本文档站（公开）
│   ├── identity\      # 统一登录 Logto（私有）
│   └── shared\        # @luminaryworks/* 共享库（私有）
├── DataLuminary\DataLuminary-Platform\   # MetaRepo
├── BlockyEdu\VibeEdu\                    # MetaRepo
├── AgentSkillMesh\VibeAgent\             # MetaRepo
├── VistaRemote\                          # MetaRepo（vibeCode）
└── LuminaryIoTChain\                     # MetaRepo（拆解中）
```

## 1. 生态公共步骤（所有产品必做）

| 步骤 | 命令 | 说明 |
|------|------|------|
| 统一登录 | `cd LuminaryWorks/identity && ./bootstrap.ps1` | OIDC `:3001` · Admin `:3002` |
| 共享库 | `cd LuminaryWorks/shared && pnpm install && pnpm build` | 消费方依赖 `@luminaryworks/auth-core` |
| 注册应用 | `identity` 仓内 `node scripts/register-apps.mjs` | 输出 `registered-apps.json` → 各产品 `.env` |

`.npmrc`（从 GitHub Packages 安装共享库时）：

```ini
@luminaryworks:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

## 2. 五产品上手矩阵

### 在 MetaRepo 开发（编排 / Spec / 跨仓脚本）

| 产品 | MetaRepo | 一键初始化 | 常用命令 |
|------|----------|-----------|----------|
| **DataLuminary** | [DataLuminary-Platform](https://github.com/DataLuminary/DataLuminary-Platform) | [ONBOARDING](https://github.com/DataLuminary/DataLuminary-Platform/blob/main/ONBOARDING.md) | `pnpm dev:view` `dev:talk` `dev:docs` |
| **BlockyEdu** | [VibeEdu](https://github.com/BlockyEdu/VibeEdu) | [ONBOARDING](https://github.com/BlockyEdu/VibeEdu/blob/main/ONBOARDING.md) | Spec → contracts → 子仓 |
| **VibeAgent** | [VibeAgent](https://github.com/AgentSkillMesh/VibeAgent) | [ONBOARDING](https://github.com/AgentSkillMesh/VibeAgent/blob/main/ONBOARDING.md) | `repos/api` `repos/web` |
| **VistaRemote** | [vibeCode](https://github.com/VistaRemote/vibeCode) | [ONBOARDING](https://github.com/VistaRemote/vibeCode/blob/main/ONBOARDING.md) | `pnpm dev:mvp` |
| **LuminaryIoTChain** | [LuminaryIoTChain](https://github.com/LuminaryIoTChain/LuminaryIoTChain) | [ONBOARDING](https://github.com/LuminaryIoTChain/LuminaryIoTChain/blob/master/ONBOARDING.md) | `deploy/` + `services/` |

各 MetaRepo 根目录均有 **ONBOARDING.md**（或 README「快速开始」）— 以该文件为准。

### 在子仓库单独开发（只改前端 / 只改后端）

| 产品 | 子仓示例 | 克隆方式 | 依赖 MetaRepo？ |
|------|----------|----------|----------------|
| DataLuminary | `DataView` `DataTalk` `ProductWhitePaper` | MetaRepo `init.sh` 或单独 clone | 建议 MetaRepo 根目录 `pnpm install` |
| BlockyEdu | `server` `edu-app-web` `code-app-web` | [BlockyEdu 组织](https://github.com/BlockyEdu) 各仓 | Spec/合同在 VibeEdu |
| VibeAgent | `api` `web` | [AgentSkillMesh](https://github.com/AgentSkillMesh) | 规格在 VibeAgent MetaRepo |
| VistaRemote | `server` `web` `desktop` … | `vibeCode/init.sh` | 协议在 `shared` |
| LuminaryIoTChain | `iot-gateway` `iot-console-web`（规划独立仓） | 暂在 MetaRepo `services/` | [拆解计划](https://github.com/LuminaryIoTChain/LuminaryIoTChain/blob/master/plan/repository-split.md) |

**子仓开发最小清单：**

1. 完成上文「生态公共步骤」1～3
2. 进入子仓 `pnpm install`（配置 `.npmrc` 若用 GitHub Packages）
3. 复制 `.env.example` → `.env`，填入 `IDP_*` / `VITE_IDP_*`
4. 启动子仓 `dev` 脚本

## 3. 本地端口速查

| 服务 | 端口 |
|------|------|
| Identity OIDC / Admin | 3001 / 3002 |
| DataView / DataTalk | 3003 / 8084 |
| DataTalk PostgreSQL | 5433 |
| VibeEdu edu-app | 18082 |
| VibeAgent web / api | 5174 / 13008 |
| VistaRemote admin | 5175 |
| iot-console / gateway | 5180 / 13100 |
| IoT PostgreSQL | 5434 |
| EMQX / Mosquitto | 1883 |

## 4. 文档去哪找

| 需求 | 位置 |
|------|------|
| 生态叙事 | [guide/ecosystem](/guide/ecosystem) |
| 统一登录 | [develop/unified-login](/develop/unified-login) |
| 登录/权限路线图 | [develop/identity-roadmap](/develop/identity-roadmap) |
| 数据存储（后台弃 MySQL · 默认 PG） | [develop/datastore](/develop/datastore) |
| 共享库 | [develop/shared-packages](/develop/shared-packages) |
| 产品 MetaRepo Spec | 各仓 `spec/` 目录 |
| 对外产品说明 | 各组织 **公开 docs 仓**（如 BlockyEdu/docs） |

## 5. 常见卡点

| 现象 | 处理 |
|------|------|
| `pnpm install` 403 `@luminaryworks/*` | 配置 `.npmrc` + PAT（`read:packages`）或 `file:` 指向 `LuminaryWorks/shared` 并先 `pnpm build` |
| DataTalk 连不上库 | 确认 `pnpm db:up`（PostgreSQL `:5433`），非 MySQL |
| OIDC 回调 404 | 检查 Logto 注册的 Redirect URI 与前端路由一致 |
| 只 clone 子仓缺 Spec | 再 clone 对应 MetaRepo，或读 LuminaryWorks/docs |
