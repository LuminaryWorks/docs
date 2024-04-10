# LuminaryWorks `docs` — GitHub Actions 配置说明

> 站点栈：**Rspress**（可静态导出）· 推荐发布：**Cloudflare Pages**（`docs.luminaryworks.dev`）  
> 仓库路径：`LuminaryWorks/docs`（与 Meta 仓并列）

---

## 一、`.github/workflows/deploy.yml`（Meta 仓内复制用）

下列内容可复制到 **GitHub 仓库 `LuminaryWorks/docs`** 的 `.github/workflows/deploy.yml`。源模板随 Meta 维护于 [`scripts/templates/docs-rspress/.github/workflows/deploy.yml`](../scripts/templates/docs-rspress/.github/workflows/deploy.yml)。

```yaml
# docs.luminaryworks.dev · LuminaryWorks/docs · Rspress static export → Cloudflare Pages
#
# One-time (this repository):
#   GitHub → Settings → Secrets and variables → Actions
#     CLOUDFLARE_API_TOKEN   — Cloudflare API token (Account / Pages Edit)
#     CLOUDFLARE_ACCOUNT_ID  — Cloudflare account ID
#
# One-time (Cloudflare):
#   Pages project (e.g. luminaryworks-docs) → Custom domain docs.luminaryworks.dev
#   Build output directory: doc_build

name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main, master]
  workflow_dispatch:

concurrency:
  group: pages-deploy-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '24'

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build static site
        run: pnpm run build

      - name: Verify build output
        run: |
          if [ ! -d doc_build ]; then
            echo "Expected Rspress output directory doc_build/ (rspress.config exportDir)."
            exit 1
          fi
          if [ ! -f doc_build/index.html ]; then
            echo "doc_build/index.html missing — build may have failed silently."
            exit 1
          fi
          echo "doc_build ready ($(du -sh doc_build | cut -f1))"

      - name: Publish to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy doc_build --project-name=luminaryworks-docs --branch=${{ github.ref_name }}

      - name: Deployment summary
        if: success()
        run: |
          echo "### LuminaryWorks Docs deployed" >> "$GITHUB_STEP_SUMMARY"
          echo "- **Site:** https://docs.luminaryworks.dev" >> "$GITHUB_STEP_SUMMARY"
          echo "- **Branch:** ${{ github.ref_name }}" >> "$GITHUB_STEP_SUMMARY"
          echo "- **Commit:** \`${{ github.sha }}\`" >> "$GITHUB_STEP_SUMMARY"
```

### 构建约定

| 项 | 值 |
|----|-----|
| 包管理 | `pnpm`（根目录 `.npmrc` / `packageManager`） |
| 构建命令 | `pnpm run build`（`rspress build`） |
| 产物目录 | **`doc_build/`**（见本仓 `rspress.config.ts` 中 `root.outDir` / `exportDir`） |
| Cloudflare 项目名 | 示例 `luminaryworks-docs`（可与 Pages 控制台一致后改 workflow） |
| 默认分支 | `main` 或 `master`（与仓库一致即可） |

---

## 二、DNS / Pages 一次性配置

```powershell
# 在 LuminaryWorks MetaRepo 根目录
.\scripts\setup-cloudflare-docs-dns.ps1 `
  -Title LuminaryWorks `
  -Subdomain docs `
  -Fqdn docs.luminaryworks.dev `
  -RepoOwner LuminaryWorks `
  -RepoName docs
```

若 **SSH 克隆** `LuminaryWorks/docs` 且 remote 尚无 token，先准备 PAT 或可 `gh auth` 的机器，再：

```powershell
.\scripts\setup-github-docs.ps1 `
  -RepoOwner LuminaryWorks `
  -RepoName docs `
  -DeployFqdn docs.luminaryworks.dev `
  -MetaRepoRoot (Get-Location).Path `
  -GitHubToken '<github_pat_…>'   # 可选；缺省则试 gh / Git Credential Manager
```

该脚本会：克隆/检出 `docs`、写入 workflow、创建/更新 Cloudflare Pages 占位项目、推送 `init/luminaryworks-docs-cicd` 分支（**不自动开 PR**）。

---

## 三、GitHub Secrets（仓库 `LuminaryWorks/docs`）

在 **Settings → Secrets and variables → Actions** 添加：

| Secret | 说明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → 模板 **Edit Cloudflare Workers** 或自定义：`Account.Cloudflare Pages:Edit`、`Zone.DNS:Edit`（若脚本同时管 DNS） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 控制台右侧 Account ID |

无需 `GITHUB_TOKEN` 额外配置即可部署 Pages；`contents: read` 足够 checkout。

---

## 四、验证部署结果

Meta 仓统一验证（HTTP / TLS / 首页关键字）：

```powershell
.\scripts\verify-docs-deployment.ps1 -Sites luminaryworks
# 快速：-SkipTls
# 仅 HTTP：-SkipTls -TlsTimeoutSec 3
```

预期：**https://docs.luminaryworks.dev** 返回 200，页面含 LuminaryWorks / 启明工坊 / Rspress 等文案。

本地与 CI 对齐检查时：

```bash
cd docs   # 克隆后的 LuminaryWorks/docs 根
pnpm install
pnpm run build
# 确认生成 doc_build/index.html
```

---

## 五、与六兄弟文档站的关系

| 站点 | 仓库 | 工作流模板目录 |
|------|------|----------------|
| docs.luminaryworks.dev | `LuminaryWorks/docs` | `scripts/templates/docs-rspress/` |
| docs.dataluminary.dev | `dataluminary/Docs` | 同上 |
| docs.doerflow.dev | `doerflow/Docs` | `scripts/templates/docs-rspress/`（Rspress） |
| docs.blockyedu.com | `BlockyEdu/docs` | `docs-vitepress`（VitePress） |
| docs.vistacast.dev 等 | 各产品 `docs` 仓 | 见 `scripts/docs-sites.config.ps1` |

LuminaryWorks **hub 文档**与产品文档 **分仓**；workflow 结构一致，仅 **项目名 / 域名 / 构建目录** 按仓内框架配置调整。
