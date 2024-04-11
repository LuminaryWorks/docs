import type { ReactNode } from "react";
import { Link } from "@rspress/theme-default";

const products = [
  {
    badge: "学",
    name: "BlockyEdu · 智码工坊",
    description: "面向 AI 编程教育与 IoT 实验教学。",
    href: "/products/blockyedu",
    logo: "/brand/blockyedu-logo.svg",
  },
  {
    badge: "连",
    name: "SyncroBrain · 万物智脑",
    description: "连接设备、协议与云边协同的 IoT PaaS。",
    href: "/products/syncrobrain",
    logo: "/brand/syncrobrain-logo.svg",
  },
  {
    badge: "看",
    name: "DataLuminary · 数据明鉴",
    description: "数据洞察、可视化与 AI 驱动分析。",
    href: "/products/dataluminary",
    logo: "/brand/dataluminary-logo.svg",
  },
  {
    badge: "视",
    name: "VistaCast · 视界云遥",
    description: "兼容 ONVIF/RTSP 的 AI 摄像头云监控能力。",
    href: "/products/vistacast",
    logo: "/brand/vistacast-logo.svg",
  },
  {
    badge: "控",
    name: "VistaRemote · 视界远程",
    description: "WebRTC 远程桌面与录制洞察，面向私有化运维。",
    href: "/products/vistaremote",
    logo: "/brand/vistaremote-logo.svg",
  },
  {
    badge: "赚",
    name: "DoerFlow · 智工网",
    description: "让 Agent 调用 Agent、云资源与人类服务，并完成低成本结算。",
    href: "/products/doerflow",
    logo: "/brand/doerflow-logo.svg",
  },
] as const;

const flow = [
  {
    badge: "学",
    href: "https://blockyedu.com",
    name: "BlockyEdu",
    description: "AI 编程教育与 IoT 实训",
    logo: "/brand/blockyedu-logo.svg",
  },
  {
    badge: "连",
    href: "https://syncrobrain.com",
    name: "SyncroBrain",
    description: "开源 IoT PaaS 底座",
    logo: "/brand/syncrobrain-logo.svg",
  },
  {
    badge: "看",
    href: "https://dataluminary.dev",
    name: "DataLuminary",
    description: "数据洞察与可视化大屏",
    logo: "/brand/dataluminary-logo.svg",
  },
  {
    badge: "视",
    href: "https://vistacast.dev",
    name: "VistaCast",
    description: "AI 摄像头云监控",
    logo: "/brand/vistacast-logo.svg",
  },
  {
    badge: "控",
    href: "https://remote.vistacast.dev",
    name: "VistaRemote",
    description: "WebRTC 远程桌面",
    logo: "/brand/vistaremote-logo.svg",
  },
  {
    badge: "赚",
    href: "https://doerflow.dev",
    name: "DoerFlow",
    description: "Agent / Skill 低成本调用与交易",
    logo: "/brand/doerflow-logo.svg",
  },
] as const;

const why = [
  {
    title: "开源可私有化",
    description:
      "适合学校、企业、集成商与开发团队逐步落地，不必先接受一套封闭平台。",
  },
  {
    title: "标准协议优先",
    description:
      "围绕 OIDC、MQTT、REST、WebRTC 构建，降低接入、替换与迁移成本。",
  },
  {
    title: "AI 贯穿全链路",
    description:
      "从教育、设备接入、数据理解到视频分析与 Agent 协作，不止是“做个后台”。",
  },
  {
    title: "一套共享基础设施",
    description:
      "统一登录、共享库与品牌体系已经沉淀，适合继续向各产品复用扩展。",
  },
] as const;

function ExternalLink({
  href,
  className,
  title,
  children,
}: {
  href: string;
  className?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <a
      className={className}
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function HomeSections() {
  return (
    <div className="lw-home-sections">
      <div className="lw-home-stats">
        <div className="lw-home-stat">
          <strong>6</strong>
          <span>独立产品</span>
        </div>
        <div className="lw-home-stat">
          <strong>1</strong>
          <span>统一身份体系</span>
        </div>
        <div className="lw-home-stat">
          <strong>4+</strong>
          <span>开放协议</span>
        </div>
        <div className="lw-home-stat">
          <strong>0</strong>
          <span>强绑定闭源依赖</span>
        </div>
      </div>

      <h2 className="lw-home-heading">从学习到产业落地</h2>
      <div className="lw-home-flow">
        {flow.map((item, index) => (
          <ExternalLink
            className="lw-home-flow-group"
            key={item.name}
            href={item.href}
            title="跳转到官网，查看详情"
          >
            {index > 0 ? <div className="lw-home-flow-arrow">→</div> : null}
            <div className="lw-home-flow-card">
              <div className="lw-home-logo-row">
                <img
                  className="lw-home-logo"
                  src={item.logo}
                  alt={`${item.name} logo`}
                />
                <span className="lw-home-flow-kicker">{item.badge}</span>
              </div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
            </div>
          </ExternalLink>
        ))}
      </div>

      <h2 className="lw-home-heading">六大产品</h2>
      <div className="lw-home-grid">
        {products.map((product) => (
          <Link
            key={product.href}
            className="lw-home-product-card"
            href={product.href}
          >
            <div className="lw-home-logo-row">
              <img
                className="lw-home-logo"
                src={product.logo}
                alt={`${product.name} logo`}
              />
              <span className="lw-home-product-badge">{product.badge}</span>
            </div>
            <strong>{product.name}</strong>
            <p>{product.description}</p>
          </Link>
        ))}
      </div>

      <h2 className="lw-home-heading">为什么用 LuminaryWorks</h2>
      <div className="lw-home-why">
        {why.map((item) => (
          <div className="lw-home-why-card" key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <p className="lw-home-closing">
        每个产品都能<strong>单独商业化</strong>；<code>VistaCast</code> 与{" "}
        <code>VistaRemote</code> <strong>并存</strong>
        ，分别服务摄像头 AI 与远程桌面场景。想先看全貌，可从
        <Link href="/products/">产品总览</Link>
        进入；想直接接入开发，可看
        <Link href="/develop/getting-started">开发者快速开始</Link>。
      </p>
    </div>
  );
}
