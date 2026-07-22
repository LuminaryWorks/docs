# 技术接入概览

LuminaryWorks 以编排型 MetaRepo 管理生态叙事、统一身份与共享库；六个产品各自拥有独立仓库与交付边界，可单独私有化部署，也可按需组合。

推荐把生态仓放在同一工作区父目录下：

```text
<workspace>/
├── LuminaryWorks/              # 生态门户、身份、共享库
│   ├── docs/
│   ├── identity/
│   └── shared/
├── dataluminary/               # DataLuminary · 数据明鉴
├── blockyedu/                  # BlockyEdu · 智码工坊
├── doerflow/                   # DoerFlow · 智工网
├── vistacast/                  # VistaCast · 视界云遥
├── vistaremote/                # VistaRemote · 视界远程
└── syncrobrain/                # SyncroBrain · 万物智脑
```

## 1. 统一登录

```bash
cd LuminaryWorks/identity
./bootstrap.sh          # Windows: ./bootstrap.ps1
```

中央 OIDC 为各产品提供同一用户主体。详见 [统一登录接入](./unified-login)。

## 2. 共享组件

```bash
cd LuminaryWorks/shared
pnpm install && pnpm build
```

产出 `@luminaryworks/auth-core`、`@luminaryworks/auth-react`、`@luminaryworks/pal`，供各产品复用认证与权限能力。

## 3. 启动产品

进入对应产品仓，按其 README / ONBOARDING 配置环境变量与 `CLIENT_ID` 后启动。每个产品都可独立运行，不强制绑定完整生态。

## 参考端口

| 服务 | 端口 |
|------|------|
| Identity OIDC / Admin | 3001 / 3002 |
| DataView / DataTalk | 3003 / 8084 |
| VibeEdu edu-app | 18082 |
| DoerFlow web / api | 5174 / 13008 |
| VistaRemote admin | 5175 |
| VistaCast admin | 13120 |
| iot-console / gateway | 5180 / 13100 |

## 延伸阅读

- [统一登录接入](./unified-login)
- [数据存储与 PostgreSQL](./datastore)
- [共享库 @luminaryworks/*](./shared-packages)
- [总体架构](/guide/architecture)
