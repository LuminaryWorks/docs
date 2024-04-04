# 新人上手指南（六产品通用）

无论你在 **MetaRepo** 还是 **子仓库** 开发，按下面三步即可跑通本地环境。

## 0. 推荐目录布局（Phase C）

```text
D:\www\
├── LuminaryWorks\
│   ├── docs\          # 本文档站（公开）
│   ├── identity\      # 统一登录 Logto（私有）
│   └── shared\        # @luminaryworks/* 共享库（私有）
├── dataluminary\      # DataLuminary · 数据明鉴
├── blockyedu\         # BlockyEdu · 智码工坊
├── doerflow\          # DoerFlow · 智工网
├── vistacast\         # VistaCast · 视界云遥（规划 spec，暂无实现仓）
├── vistaremote\       # VistaRemote · 视界远程（远程桌面）
└── syncrobrain\       # SyncroBrain · 万物智脑
```

## 1. 生态公共步骤（所有产品必做）

| 步骤 | 命令 | 说明 |
|------|------|------|
| 统一登录 | `cd LuminaryWorks/identity && ./bootstrap.ps1` | OIDC `:3001` · Admin `:3002` |
| 共享库 | `cd LuminaryWorks/shared && pnpm install && pnpm build` | 消费方依赖 `@luminaryworks/auth-core` |
| 注册应用 | `identity` 仓内 `node scripts/register-apps.mjs` | 输出 `registered-apps.json` → 各产品 `.env` |

## 2. 六产品上手矩阵

### 编码优先级

| 优先级 | 产品 | 说明 |
|--------|------|------|
| **P0** | DataLuminary、BlockyEdu | 当前主力开发 |
| P1 | DoerFlow、SyncroBrain | 并行迭代 |
| 文档先行 | **VistaCast** | 仅 spec，见 `D:\www\vistacast\spec\` |
| 维护 | **VistaRemote** | 远程桌面已有基线，`D:\www\vistaremote` |

### 在 MetaRepo 开发

| 品牌 | MetaRepo | 状态 |
|------|----------|------|
| **DataLuminary** | [DataLuminary-Platform](https://github.com/dataluminary/DataLuminary-Platform) | ✅ |
| **BlockyEdu** | [VibeEdu](https://github.com/blockyedu/VibeEdu) | ✅ |
| **DoerFlow** | [VibeAgent](https://github.com/doerflow/VibeAgent) | ✅ |
| **VistaCast** | 规划 — [spec/products/vistacast](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/products/vistacast.md) | 📋 文档 |
| **VistaRemote** | [VistaRemote/vibeCode](https://github.com/VistaRemote/vibeCode) | ✅ `./init.ps1` |
| **SyncroBrain** | [LuminaryIoTChain](https://github.com/syncrobrain/LuminaryIoTChain) | ✅ |

### VistaCast vs VistaRemote

| | VistaCast | VistaRemote |
|---|-----------|-------------|
| 做什么 | AI 固定摄像头监控 | WebRTC 远程桌面 |
| 本地路径 | `D:\www\vistacast\spec\` | `D:\www\vistaremote\` |
| 能否跑起来 | 暂无 — 等 P0 完成后启动编码 | `.\init.ps1` → `pnpm dev:mvp` |

## 3. 本地端口速查

| 服务 | 端口 |
|------|------|
| Identity OIDC / Admin | 3001 / 3002 |
| DataView / DataTalk | 3003 / 8084 |
| VibeEdu edu-app | 18082 |
| DoerFlow web / api | 5174 / 13008 |
| VistaRemote admin | 5175 |
| iot-console / gateway | 5180 / 13100 |

## 4. 文档去哪找

| 需求 | 位置 |
|------|------|
| VistaCast 规划 | [products/vistacast](/products/vistacast) · `spec/products/vistacast.md` |
| VistaRemote | [products/vistaremote](/products/vistaremote) · `D:\www\vistaremote\spec\` |
| 统一登录 | [develop/unified-login](/develop/unified-login) |
