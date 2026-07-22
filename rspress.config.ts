import path from "node:path";
import rehypeExternalLinks from "rehype-external-links";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: "docs",
  title: "LuminaryWorks · 启明工坊",
  description: "AI 原生开源生态 — 学 · 连 · 看 · 视 · 控 · 赚",
  icon: "/logo.svg",
  logo: "/logo.svg",
  logoText: "启明工坊",
  globalStyles: path.join(__dirname, "styles/index.css"),
  globalUIComponents: [path.join(__dirname, "theme/ExternalLinkGuard.tsx")],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        },
      ],
    ],
  },
  themeConfig: {
    darkMode: true,
    socialLinks: [
      { icon: "github", mode: "link", content: "https://github.com/LuminaryWorks" },
    ],
    nav: [
      { text: "生态", link: "/guide/ecosystem" },
      { text: "产品", link: "/products/" },
      { text: "架构", link: "/guide/architecture" },
      { text: "技术", link: "/develop/getting-started" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "了解 LuminaryWorks",
          items: [
            { text: "生态叙事", link: "/guide/ecosystem" },
            { text: "总体架构", link: "/guide/architecture" },
          ],
        },
      ],
      "/products/": [
        {
          text: "六大产品",
          items: [
            { text: "概览", link: "/products/" },
            { text: "DataLuminary · 数据明鉴", link: "/products/dataluminary" },
            { text: "BlockyEdu · 智码工坊", link: "/products/blockyedu" },
            { text: "SyncroBrain · 万物智脑", link: "/products/syncrobrain" },
            { text: "VistaCast · 视界云遥", link: "/products/vistacast" },
            { text: "VistaRemote · 视界远程", link: "/products/vistaremote" },
            { text: "DoerFlow · 智工网", link: "/products/doerflow" },
          ],
        },
      ],
      "/develop/": [
        {
          text: "技术能力",
          items: [
            { text: "技术接入概览", link: "/develop/getting-started" },
            { text: "产品接入矩阵", link: "/develop/onboarding" },
            { text: "统一登录", link: "/develop/unified-login" },
            { text: "数据存储（PostgreSQL）", link: "/develop/datastore" },
            { text: "共享库 @luminaryworks/*", link: "/develop/shared-packages" },
            { text: "协作规范", link: "/develop/collaboration" },
          ],
        },
      ],
    },
    footer: {
      message: "LuminaryWorks · 启明工坊 · AI 原生开源生态",
    },
  },
});
