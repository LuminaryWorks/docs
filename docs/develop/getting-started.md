# 快速开始

LuminaryWorks（启明工坊）是编排型 MetaRepo，子仓为独立 Git。本地推荐目录（Phase C）：

```text
D:\www\
├── LuminaryWorks\              # 本仓（叙事 + 标准 + 脚本）
│   ├── docs\                   # 本文档站
│   ├── identity\               # 统一登录授权服务
│   └── shared\                 # @luminaryworks/* 共享库
├── dataluminary\               # DataLuminary · 数据明鉴
├── blockyedu\                  # BlockyEdu · 智码工坊
├── doerflow\                   # DoerFlow · 智工网
├── vistacast\                  # VistaCast · 视界云遥（规划 spec）
├── vistaremote\                # VistaRemote · 视界远程
└── syncrobrain\                # SyncroBrain · 万物智脑
```

## 1. 拉起统一登录

```bash
cd LuminaryWorks/identity
./bootstrap.sh          # Windows: ./bootstrap.ps1
```

OIDC `http://localhost:3001/oidc` · Admin `http://localhost:3002`。注册应用见 [统一登录接入](./unified-login)。

## 2. 构建共享库

```bash
cd LuminaryWorks/shared
pnpm install && pnpm build
```

产出 `@luminaryworks/auth-core`、`@luminaryworks/auth-react`、`@luminaryworks/pal`。

## 3. 一键编排（meta 仓）

```bash
cd LuminaryWorks
pnpm bootstrap          # 起 identity + 构建 shared
```

## 4. 启动某个产品

进入对应产品仓，按其 **ONBOARDING.md** 或 README 配置 `.env`（填入 identity 输出的 `CLIENT_ID`）后启动。

详细矩阵（MetaRepo vs 子仓）：[新人上手指南](./onboarding)。

## 本地端口速查

| 服务 | 端口 |
|------|------|
| Identity OIDC / Admin | 3001 / 3002 |
| DataView / DataTalk | 3003 / 8084 |
| VibeEdu edu-app | 18082 |
| DoerFlow web / api | 5174 / 13008 |
| VistaRemote admin | 5175 |
| VistaCast admin（规划） | 13120 |
| iot-console / gateway | 5180 / 13100 |
| EMQX / Mosquitto | 1883 |
| DataTalk PostgreSQL | 5433 |
| IoT PostgreSQL | 5434 |

## 延伸阅读

- [新人上手（六产品）](./onboarding)
- [数据存储与 PostgreSQL](./datastore)
- [登录/权限路线图](./identity-roadmap)
- [统一登录接入](./unified-login)
