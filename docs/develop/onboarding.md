# 产品接入矩阵

无论单独交付某个产品，还是组合多个产品形成完整方案，都可以按统一身份与标准协议接入。

## 推荐工作区布局

```text
<workspace>/
├── LuminaryWorks/
│   ├── docs/          # 生态门户
│   ├── identity/      # 统一登录
│   └── shared/        # 共享组件
├── dataluminary/
├── blockyedu/
├── doerflow/
├── vistacast/
├── vistaremote/
└── syncrobrain/
```

## 生态公共能力

| 能力 | 入口 | 说明 |
|------|------|------|
| 统一登录 | `LuminaryWorks/identity` | 中央 Logto OIDC |
| 共享组件 | `LuminaryWorks/shared` | 认证、权限与工程基线 |
| 应用注册 | `identity` 脚本 | 输出各产品 `CLIENT_ID` |

## 六产品入口

| 品牌 | 仓库 | 官网 |
|------|------|------|
| **DataLuminary** | [DataLuminary-Platform](https://github.com/dataluminary/DataLuminary-Platform) | [dataluminary.dev](https://dataluminary.dev) |
| **BlockyEdu** | [VibeEdu](https://github.com/blockyedu/VibeEdu) | [blockyedu.com](https://blockyedu.com) |
| **DoerFlow** | [VibeAgent](https://github.com/doerflow/VibeAgent) | [doerflow.dev](https://doerflow.dev) |
| **VistaCast** | [VistaCast/vistacast](https://github.com/VistaCast/vistacast) | [vistacast.dev](https://vistacast.dev) |
| **VistaRemote** | [VistaRemote/vibeCode](https://github.com/VistaRemote/vibeCode) | [remote.vistacast.dev](https://remote.vistacast.dev) |
| **SyncroBrain** | [LuminaryIoTChain](https://github.com/syncrobrain/LuminaryIoTChain) | [syncrobrain.com](https://syncrobrain.com) |

## VistaCast vs VistaRemote

| | VistaCast | VistaRemote |
|---|-----------|-------------|
| 做什么 | AI 固定摄像头监控 | WebRTC 远程桌面 |
| 仓库 / 文档 | [产品页](/products/vistacast) | [产品页](/products/vistaremote) |
| 典型启动 | 按产品仓 README 部署 | `./init.ps1` → `pnpm dev:mvp` |

## 延伸阅读

| 需求 | 位置 |
|------|------|
| VistaCast | [products/vistacast](/products/vistacast) |
| VistaRemote | [products/vistaremote](/products/vistaremote) |
| 统一登录 | [develop/unified-login](/develop/unified-login) |
