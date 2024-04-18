# 通知模块 NotificationModule

平台级消息能力：一期以共享 NestJS 包 `@luminaryworks/notification` 提供 **Email** 投递；Slack / Teams / Webhook / SMS 仅保留通道扩展点。逻辑独立、代码模块独立，**部署先合并进各产品后端**；生态规模起来后再拆成独立 Notification Service。

完整决策与契约见 MetaRepo：[spec/notification-service.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/notification-service.md)。  
包源码：[shared/packages/notification](https://github.com/LuminaryWorks/shared/tree/master/packages/notification)。

## 架构一句话

```text
产品 Backend（业务 HTML / 调度 / 权限）
        │
        ▼
NotificationModule  →  NotificationService
        │
        ▼
EmailChannel（@nestjs-modules/mailer）
        │
        ▼
SMTP（推荐 Amazon SES Mail Manager · 587 STARTTLS）
```

生态位置：

```text
                 LuminaryWorks

           @luminaryworks/notification
              NotificationModule
                     |
        +------------+------------+
        |                         |
      Email                    Future
        |                         |
   SES Mail Manager        Slack/Teams/Webhook/SMS
        |
   已验证 From（如 report@…）

          ↑ 各产品 Backend 调用
 ----------------------------
 DataLuminary · BlockyEdu · VistaRemote · …
```

## 决策摘要（一期）

| # | 决策 | 落地 |
|---|------|------|
| D-N1 | Notification 是**平台级**能力，不属于任一产品后台 | `@luminaryworks/notification` |
| D-N2 | 一期：共享 NestJS 代码包，随产品进程部署 | `shared/packages/notification` |
| D-N3 | 后期：独立 `notification-service`（K8s / HTTP / 事件） | 公开契约尽量不变，换实现 |
| D-N4 | 一期只实现 **Email** | 其它通道仅枚举占位 |
| D-N5 | **不引入** BullMQ、独立 DB、独立 HTTP | 用户量上来后再加队列 |
| D-N6 | SMTP 凭据只进环境变量 / Secret | 禁止写入源码或示例真实值 |

## 职责边界

| 层 | 负责 | 不负责 |
|----|------|--------|
| **共享包** | 通道抽象、`isConfigured`、SMTP 投递、稳定契约 | 不读 `process.env`；不写业务模板；不调度 |
| **产品 Backend** | Cron / 收件人解析 / 业务 HTML / 截图 PDF / 审计日志 / Casbin | 不直连 Nodemailer（经 NotificationService） |
| **Logto** | 注册 / 找回 / MFA 认证邮件 | 不属于 Notification |

典型产品适配（DataLuminary）：

```text
DataTalk ReportModule
  └─ MailService（仪表盘 HTML、截图 CID、PDF）
       └─ NotificationService.sendEmail()
```

## 公开契约（一期）

```ts
type NotificationChannel = "email" | "slack" | "teams" | "webhook" | "sms";

interface EmailMessage {
  from: string;
  fromName?: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
    cid?: string;
  }>;
}

class NotificationService {
  isConfigured(channel?: NotificationChannel): boolean;
  sendEmail(message: EmailMessage): Promise<SendEmailResult>;
}
```

- 未配置 Email：`isConfigured("email") === false`；`sendEmail` 抛 `NotificationChannelNotConfiguredError`（**禁止假成功**）。
- 发送失败向上抛错，由产品侧写业务日志；一期无队列 / DLQ。
- 契约**不暴露** Nodemailer / Mailer 类型，便于日后换成远程客户端。

## 后端接入（NestJS）

### 依赖

```bash
pnpm add @luminaryworks/notification
# peer: @nestjs/common @nestjs/core reflect-metadata
```

本地 sibling 布局：

```jsonc
"@luminaryworks/notification": "file:../../LuminaryWorks/shared/packages/notification"
```

```bash
cd LuminaryWorks/shared && pnpm install && pnpm --dir packages/notification build
```

### 注册模块

宿主通过 `forRoot` / `forRootAsync` **注入** SMTP 配置（包内不读环境变量）：

```ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  NotificationModule,
  NotificationService,
  type NotificationModuleOptions,
} from "@luminaryworks/notification";

@Module({
  imports: [
    ConfigModule,
    NotificationModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): NotificationModuleOptions => {
        const host = config.get<string>("SMTP_HOST")?.trim();
        if (!host) return {};
        const port = Number(config.get<string>("SMTP_PORT") ?? 587);
        const secureRaw = config.get<string>("SMTP_SECURE");
        const requireTlsRaw = config.get<string>("SMTP_REQUIRE_TLS");
        return {
          email: {
            transport: {
              host,
              port,
              user: config.get<string>("SMTP_USER") || undefined,
              pass: config.get<string>("SMTP_PASS") || undefined,
              secure:
                secureRaw === undefined
                  ? undefined
                  : secureRaw === "true" || secureRaw === "1",
              requireTLS:
                requireTlsRaw === undefined
                  ? undefined
                  : requireTlsRaw === "true" || requireTlsRaw === "1",
            },
          },
        };
      },
    }),
  ],
})
export class AppModule {}
```

### 发送

```ts
constructor(private readonly notifications: NotificationService) {}

await this.notifications.sendEmail({
  from: "report@example.com",
  fromName: "Reports",
  to: ["user@example.com"],
  subject: "Hello",
  html: "<p>Hello</p>",
});
```

## 环境变量（宿主约定）

| 变量 | 说明 |
|------|------|
| `SMTP_HOST` | SMTP hostname（有值才启用 Email） |
| `SMTP_PORT` | 推荐 `587`（SES Mail Manager STARTTLS） |
| `SMTP_USER` / `SMTP_PASS` | SMTP 凭据（勿提交真实值） |
| `SMTP_SECURE` | 可选；`true` 时隐式 TLS（465） |
| `SMTP_REQUIRE_TLS` | 可选；587 建议 `true` |
| `MAIL_FROM_OFFICIAL` | 产品官方 From（须为 SES **已验证身份**） |

### SES Mail Manager 要点

| 项 | 建议 |
|----|------|
| Endpoint | 控制台 Ingress hostname（`*.mail-manager-smtp.amazonaws.com`） |
| Port / TLS | `587` · `secure=false` · `requireTLS=true`（STARTTLS） |
| From | 已验证域名身份；产品侧可把「自己发送」做成 **显示名 + Reply-To**，SMTP From 仍用官方地址 |
| AWS 前置 | verified identity、sandbox/收件人策略、规则含 **Send to internet** |

传输层默认偏好 **IPv4** 与 TLS1.2，避免部分 Windows 双栈环境出现 SMTP greeting 超时。

可选联调（凭据仅放本机环境变量）：

```bash
# PowerShell — 勿把真实值写入仓库
$env:SMTP_HOST="your-ingress.example.amazonaws.com"
$env:SMTP_PORT="587"
$env:SMTP_REQUIRE_TLS="true"
$env:SMTP_USER="..."
$env:SMTP_PASS="..."
$env:SMOKE_FROM="report@example.com"
$env:SMOKE_TO="you@example.com"
pnpm --dir packages/notification smoke:smtp
```

## 首个消费者：DataLuminary 订阅推送

| 位置 | 说明 |
|------|------|
| DataTalk `ReportModule` | `NotificationModule.forRootAsync` 映射 `SMTP_*` |
| DataTalk `MailService` | 产品适配：仪表盘 HTML、CID 截图、PDF |
| DataView `ReportForm` | 测试推送（发给自己 / 全部收件人）+ 保存调度 |
| 契约 | [report-subscription.md](https://github.com/dataluminary/DataLuminary-Platform/blob/main/spec/contracts/report-subscription.md) |

业务侧仍负责：cron、Puppeteer 无头渲染、`report_send_log`、空间权限。Notification 只做投递。

## 演进路径

| 阶段 | 形态 | 说明 |
|------|------|------|
| **一期（当前）** | `@luminaryworks/notification` 共享包 | 逻辑独立、部署合并 |
| **二期** | + BullMQ / 重试 / 限流 | 用户量与投递量上升后 |
| **三期** | 独立 `notification-service` | 产品改 HTTP/事件客户端；`NotificationService` API 尽量不变 |

```text
FutureProducts → NotificationService -.future.→ RemoteClient(IndependentService)
```

## 安全

1. SMTP 密码、Ingress 用户名**禁止**写入 Git、README、示例中的真实值。
2. 凭据若曾出现在聊天或临时文件：在 AWS **轮换**后再写入本机 `.env.local`。
3. `.env.example` 仅保留空值或占位符。

## 相关文档

| 文档 | 说明 |
|------|------|
| [共享库 @luminaryworks/*](./shared-packages) | 包清单与安装方式 |
| [统一登录](./unified-login) | 认证邮件归 Logto，与本模块边界分离 |
| [接入矩阵](./onboarding) | 六产品与公共能力 |
| [总体架构](/guide/architecture) | 共享服务层位置 |
| MetaRepo 规格 | [`spec/notification-service.md`](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/notification-service.md) |
| 包 README | [`shared/packages/notification`](https://github.com/LuminaryWorks/shared/tree/master/packages/notification) |
