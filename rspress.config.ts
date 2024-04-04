import path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: "docs",
  title: "LuminaryWorks · 启明工坊",
  description: "AI 原生开源生态 — 学 · 连 · 看 · 视 · 控 · 赚",
  icon: "/logo.png",
  logo: "/logo.png",
  logoText: "启明工坊",
  globalStyles: path.join(__dirname, "styles/index.css"),
  themeConfig: {
    darkMode: true,
    socialLinks: [
      { icon: "github", mode: "link", content: "https://github.com/LuminaryWorks" },
    ],
    nav: [
      { text: "生态", link: "/guide/ecosystem" },
      { text: "产品", link: "/products/" },
      { text: "开发者", link: "/develop/getting-started" },
      { text: "架构", link: "/guide/architecture" },
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
          text: "开发者指南",
          items: [
            { text: "快速开始", link: "/develop/getting-started" },
            { text: "新人上手（六产品）", link: "/develop/onboarding" },
            { text: "统一登录接入", link: "/develop/unified-login" },
            { text: "登录/权限路线图", link: "/develop/identity-roadmap" },
            { text: "数据存储（弃 MySQL · 默认 PG）", link: "/develop/datastore" },
            { text: "共享库 @luminaryworks/*", link: "/develop/shared-packages" },
            { text: "协作规范 (SDD)", link: "/develop/collaboration" },
          ],
        },
      ],
    },
    footer: {
      message: "LuminaryWorks · 启明工坊 · AI 原生开源生态 · Apache-2.0",
    },
  },
});
