import { Link } from "@rspress/theme-default";

const products = [
  {
    badge: "学",
    name: "BlockyEdu · 智码工坊",
    description: "AI 编程教育与 IoT 实训平台。",
    href: "/products/blockyedu",
    logo: "/brand/blockyedu-logo.svg",
  },
  {
    badge: "连",
    name: "SyncroBrain · 万物智脑",
    description: "开源 AI 驱动的 IoT PaaS。",
    href: "/products/syncrobrain",
    logo: "/brand/syncrobrain-logo.svg",
  },
  {
    badge: "看",
    name: "DataLuminary · 数据明鉴",
    description: "数据洞察、可视化与运营大屏。",
    href: "/products/dataluminary",
    logo: "/brand/dataluminary-logo.svg",
  },
  {
    badge: "视",
    name: "VistaCast · 视界云遥",
    description: "兼容 ONVIF/RTSP 的 AI 摄像头云监控。",
    href: "/products/vistacast",
    logo: "/brand/vistacast-logo.svg",
  },
  {
    badge: "控",
    name: "VistaRemote · 视界远程",
    description: "WebRTC 远程桌面与录制洞察。",
    href: "/products/vistaremote",
    logo: "/brand/vistaremote-logo.svg",
  },
  {
    badge: "赚",
    name: "DoerFlow · 智工网",
    description: "Agent 调用 Agent、云资源与人类服务的交易网络。",
    href: "/products/doerflow",
    logo: "/brand/doerflow-logo.svg",
  },
] as const;

export function ProductOverview() {
  return (
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
  );
}
