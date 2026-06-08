# Beefey Apparel B2B 独立站技术搭建与部署指南

本指南专为 **Beefey Apparel B2B 独立站**（女士睡衣外贸工厂店）定制。我们已经为您完成了本地静态代码模版的解压、分析、Git 初始化以及 GitHub 远程仓库的创建。

由于安全与权限限制，我们将为您提供**本地终端一键推送指南**，并为您详述 **GitHub + Vercel + Cloudflare R2 + Namecheap** 这一技术栈的具体配置流程。

---

## 目录
1. [GitHub 远程仓库推送指南](#1-github-远程仓库推送指南)
2. [Vercel 独立站部署指南](#2-vercel-独立站部署指南)
3. [Cloudflare R2 静态资源存储与加速配置](#3-cloudflare-r2-静态资源存储与加速配置)
4. [Namecheap 域名解析与 Cloudflare 接入](#4-namecheap-域名解析与-cloudflare-接入)

---

## 1. GitHub 远程仓库推送指南

我们已经在您的 GitHub 账户（`zzhang1228z-ai`）下创建了全新的空仓库：
* **仓库地址**: `https://github.com/zzhang1228z-ai/beefey-apparel-b2b`
* **本地状态**: 代码已在本地完成初始化，成功排除了 Windows 系统保留字符 `nul` 的干扰，并完成了 Initial Commit（本地代码已打包就绪）。

### 您的操作步骤（仅需 1 分钟）：
请在您本地电脑的该项目工作区目录下打开终端（Terminal 或 Git Bash），依次复制并运行以下命令，使用您本地已经登录的 GitHub 凭证完成推送：

```bash
# 1. 关联刚才为您创建的远程仓库
git remote add origin https://github.com/zzhang1228z-ai/beefey-apparel-b2b.git

# 2. 将本地代码推送到 GitHub 的 main 分支
git push -u origin main
```

运行完成后，您所有的静态 HTML/CSS 文件（包括 `products/` 下的睡衣产品详情页、`assets/` 目录下的图片与 Lookbook PDF 等）都将同步到 GitHub。

---

## 2. Vercel 独立站部署指南

Vercel 是目前最顶级的全球静态网页托管平台，能够完美、免费地提供静态 HTML 独立站的托管，并自带全球 CDN 加速和自动 SSL 证书。

### 部署步骤：
1. **登录 Vercel 控制台**: 打开 [Vercel Dashboard](https://vercel.com/dashboard)，使用您的 Vercel 账号（`zzhang.1228z@gmail.com`）登录。
2. **导入项目**:
   * 点击右上角的 **"Add New..."** -> **"Project"**。
   * 在 Git 导入区域，选择您的 GitHub 账号 `zzhang1228z-ai`。
   * 找到 `beefey-apparel-b2b` 仓库，点击 **"Import"**。
3. **项目配置 (Project Settings)**:
   * **Framework Preset**: 选择 **Other**（因为这是纯静态 HTML 项目）。
   * **Root Directory**: 保持默认的主目录 `./`。
   * **Build and Output Settings**: 保持默认（无需填写 Build Command 或 Output Directory，Vercel 会自动将根目录作为静态站点发布）。
4. **一键部署**:
   * 点击 **"Deploy"**。
   * 5 秒钟内，您的独立站即刻全球上线！Vercel 会为您分配一个类似 `beefey-apparel-b2b.vercel.app` 的免费二级域名，点击即可预览。

---

## 3. Cloudflare R2 静态资源存储与加速配置

**Cloudflare R2** 是一种无出口流量费（Zero Egress Fee）的现代对象存储，非常适合用来存放 B2B 独立站的大量高分辨率睡衣产品图、高清工厂生产视频以及宣传 Lookbook PDF 文件，能大幅减轻 Vercel 的代码库容量并提升全球加载速度。

### R2 的配置与使用流程：

#### 步骤 A：创建 R2 存储桶 (Bucket)
1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2. 在左侧导航栏点击 **"R2"** -> **"Create bucket"**。
3. 输入存储桶名称（例如：`beefey-assets`），选择地理区域（建议选择靠近目标市场的区域，如 **WNAM (北美西部)** 或自动），点击 **"Create bucket"**。

#### 步骤 B：绑定自定义子域名（实现 CDN 加速与免流量费）
1. 在您刚创建的 R2 存储桶详情页中，切换到 **"Settings"** 选项卡。
2. 找到 **"Public Access"** 区域，点击 **"Connect Domain"**。
3. 输入您的独立站子域名（例如：`assets.beefeyapparel.com`，需保证该域名已托管在 Cloudflare 账号中）。
4. Cloudflare 会自动在您的 DNS 中添加对应的 CNAME 记录。绑定后，您上传到 R2 的图片便可通过 `https://assets.beefeyapparel.com/path-to-image.jpg` 极速访问。

#### 步骤 C：替换代码中的媒体链接（可选）
如果您希望把大文件（如 `assets/lookbook/Beefey_Lookbook_2026.pdf` 和高分辨率图片）放入 R2 以优化代码库：
1. 将这些大文件通过 Cloudflare R2 网页端控制台直接拖拽上传。
2. 修改本地网页（如 `index.html`）中的相应链接：
   ```html
   <!-- 替换前 -->
   <a class="btn" href="assets/lookbook/Beefey_Lookbook_2026.pdf" download>Download Lookbook</a>

   <!-- 替换后（使用 R2 自定义域名加速） -->
   <a class="btn" href="https://assets.beefeyapparel.com/Beefey_Lookbook_2026.pdf" download>Download Lookbook</a>
   ```
3. 重新 `git commit` 并推送，Vercel 会自动增量更新部署。

---

## 4. Namecheap 域名解析与 Cloudflare 接入

为了让独立站拥有最快的解析速度、DDoS 安全防御和免费 SSL（https 证书），我们**强烈推荐**您将注册在 Namecheap 的域名接入到 Cloudflare，再由 Cloudflare 统一管理解析并分配给 Vercel 和 R2。

### 配置全链路（最佳实践）：

#### 第一步：在 Cloudflare 中添加站点
1. 登录 Cloudflare 控制台，点击 **"Add a Site"**。
2. 输入您在 Namecheap 购买的主域名（例如：`beefeyapparel.com`），选择 **Free (免费)** 计划。
3. Cloudflare 会扫描您域名现有的 DNS 记录，并为您生成两行 **Cloudflare Name servers（DNS 服务器地址）**。

#### 第二步：在 Namecheap 修改 DNS 服务器
1. 登录 [Namecheap](https://www.namecheap.com/) 账户。
2. 找到您的域名，点击右侧的 **"Manage"**。
3. 找到 **"Nameservers"** 选项，将下拉菜单从 "Namecheap BasicDNS" 改为 **"Custom DNS"**。
4. 将 Cloudflare 为您生成的两行 Nameservers 填入并保存：
   * *例如: `dana.ns.cloudflare.com` 和 `norm.ns.cloudflare.com`*
5. 保存后，DNS 全球生效大约需要 10 分钟到几小时。生效后，您的域名解析权就交给了 Cloudflare。

#### 第三步：配置 Vercel 自定义域名
1. 回到 Vercel 控制台，进入您的 `beefey-apparel-b2b` 项目。
2. 点击 **"Settings"** -> **"Domains"**。
3. 输入您的自定义域名（例如：`www.beefeyapparel.com` 或主域名 `beefeyapparel.com`），点击 **"Add"**。
4. Vercel 会给出您需要配置的 DNS 记录，通常是：
   * **A 记录**：`@` 对应 `76.76.21.21` （主域名使用）
   * **CNAME 记录**：`www` 对应 `cname.vercel-dns.com` （子域名使用）

#### 第四步：在 Cloudflare 中添加 DNS 记录
1. 进入 Cloudflare 的 **"DNS"** -> **"Records"**。
2. 根据 Vercel 提供的记录进行添加：
   * **添加 A 记录**: Name 设为 `@`，IPv4 Address 设为 `76.76.21.21`，**Proxy Status 保持为 "Proxied"（已代理）**。
   * **添加 CNAME 记录**: Name 设为 `www`，Target 设为 `cname.vercel-dns.com`，**Proxy Status 保持为 "Proxied"（已代理）**。
3. 添加完成后，Vercel 会自动识别并生成 SSL 安全证书。

您的豪华女士睡衣外贸 B2B 独立站现在就正式完美上线了！全球买家将能以极速访问您的品牌网站并给您直接发送询盘！
