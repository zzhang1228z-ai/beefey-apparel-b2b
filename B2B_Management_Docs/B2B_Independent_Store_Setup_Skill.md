---
name: b2b-independent-store-setup
description: >-
  A comprehensive guide for building, deploying, optimizing, and maintaining a high-converting, high-performance static B2B independent website in China. Includes standard SEO/AIO optimization, multi-page routing, layout bug troubleshooting, and cross-border Git proxy diagnostics. Make sure to consult this skill whenever the user mentions static site setup, Vercel/GitHub deployment, website updates, or when troubleshooting Chinese Windows batch file errors and Git push timeouts.
---

# B2B Independent Store Setup Guide

This skill encapsulates the end-to-end engineering, visual, and network-level workflows for deploying a high-converting B2B factory independent website under strict network and system conditions (specifically tailored for traders and factories in China using Windows systems).

---

## 目录
1. [B2B 核心信任度与转化漏斗优化](#1-b2b-核心信任度与转化漏斗优化)
2. [静态站点无后缀美化与 Clean URLs 配置](#2-静态站点无后缀美化与-clean-urls-配置)
3. [Windows 本地 CMD 中文批处理脚本设计 (GBK 规范)](#3-windows-本地-cmd-中文批处理脚本设计-gbk-规范)
4. [系统代理自适应嗅探与 Git 跨境推送优化](#4-系统代理自适应嗅探与-git-跨境推送优化)
5. [常见经典布局 Bug 调试排卡指南](#5-常见经典布局-bug-调试排卡指南)
6. [多媒体视频/画册与官方证书极速接入规范](#6-多媒体视频画册与官方证书极速接入规范)
7. [谷歌收录 SEO 与 AI 搜索引擎 (AIO) 极速激活](#7-谷歌收录-seo-与-ai-搜索引擎-aio-极速激活)

---

## 1. B2B 核心信任度与转化漏斗优化

B2B 采购商（如批发商、品牌创始人、亚马逊卖家）与普通 B2C 消费者的决策逻辑有本质区别。他们不看重折扣券，而是严苛审核您的**工厂真实性、定制深度、面料资质与物流合规性**。

### 核心优化规范：
* **首屏三大痛点挂件**：在首屏最显眼位置通过 3 个 Badge 强力抛出大买家筛选门槛：
  * *MOQ 100 Sets Only* (降低新品牌冷启动门槛)
  * *BSCI & OEKO-TEX Certified* (打消合规性疑虑)
  * *Free Fabric Swatch Pack Available* (绝对的大买家强力诱饵)
* **硬核实力数字化**：不要使用感性描述。必须用大数字（Hero Stats）展现硬核产能：
  * **5,000㎡** Modern Factory | **80,000+** Monthly Capacity | **120+** Skilled Tailors.
* **定制信息透明化 (Customization Card)**：
  * 明确标出：打样周期（*7-10天*）、大货周期（*25-35天*）、质检标准（*AQL 2.5 Strict QC*）以及支持的国际贸易术语（*FOB, CIF, 适合亚马逊 FBA 卖家的 DDP*）。
* **零后端极速询盘表单 (FormSubmit 方案)**：
  * 摒弃传统的复杂后端。直接将 HTML 表单接入免费的 `formsubmit.co`：
    ```html
    <form class="contact-form" action="https://formsubmit.co/your-email@brand.com" method="POST">
      <input type="hidden" name="_subject" value="New Website Inquiry!">
      <!-- 收集面料意向、采购预估数量等高价值商业字段 -->
    </form>
    ```

---

## 2. 静态站点无后缀美化与 Clean URLs 配置

在国际大牌独立站规范中，网址栏中带有 `.html` 后缀（如 `brand.com/about.html`）会显得不够高档。我们需要在 Vercel 静态托管中开启隐藏后缀名（Clean URLs）规则。

### 核心操作步骤：
1. **生成 Vercel 路由规则文件**：
   In the project root, create **`vercel.json`**:
   ```json
   {
     "cleanUrls": true
   }
   ```
2. **全站 HTML 链接清洗**：
   遍历项目内所有的 `.html` 网页，使用 Python 脚本或正则表达式，将所有超链接中的 `.html` 后缀彻底剥离：
   * `href="./index.html"` $\rightarrow$ `href="./"`
   * `href="./about.html"` $\rightarrow$ `href="./about"`
   * `href="./collections/women-pajamas.html"` $\rightarrow$ `href="./collections/women-pajamas"`

---

## 3. Windows 本地 CMD 中文批处理脚本设计 (GBK 规范)

### 🚨 信号避坑：
在 Windows 简体中文系统（代码页 936）中，如果将 `.bat` 文件保存为 `UTF-8`（无BOM）格式，命令提示符（cmd.exe）在执行时会产生**严重的汉字解析对位错乱**！
这会导致系统将错乱的乱码拆解为各种单字母，引发 `'g' 不是内部或外部命令`、`'it' 不是内部或外部命令` 等离奇报错，甚至将无辜字符识别为“未定义的环境变量”导致执行终止。

### 🌟 终极规范：
所有 Windows 本地 `.bat` 批处理文件的内容，**必须强制以 GBK（简体中文国标码）编码保存**！

---

## 4. 系统代理自适应嗅探与 Git 跨境推送优化

由于国内特殊的跨境网络封锁，在本地命令行中通过 HTTPS 向 GitHub 推送（`git push`）几十兆的视频、证书、画册等大文件时，直连 100% 会遭遇 `Connection was reset`（网络连接被重置）。

### 🌟 AI 级自适应代理解决方案：
在 `.bat` 发布脚本中，加入**系统代理自动探测逻辑**。它每次在双击运行时，能自动读取 Windows 注册表，动态获取当前 VPN 客户端（如 Clash、v2rayN、Trojan）正在工作的真实本地端口（如 `33210`），自适应设置 Git 代理；在关闭代理时，又能自动清理代理，不憋死 Git。

#### 完整的 `.bat` 黄金自适应发布脚本代码：
```cmd
@echo off
echo ===================================================
echo             Beefey Apparel B2B Site Auto-Update
echo ===================================================
echo.

:: Detect Windows System Proxy automatically from Registry
set "SYSTEM_PROXY="
for /f "tokens=3" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer 2^>nul') do set "SYSTEM_PROXY=%%a"

if not "%SYSTEM_PROXY%"=="" (
    echo [System Proxy Detected: http://%SYSTEM_PROXY%]
    git config --local http.proxy http://%SYSTEM_PROXY%
    git config --local https.proxy http://%SYSTEM_PROXY%
) else (
    echo [No System Proxy Detected, using direct connection]
    git config --local --unset http.proxy
    git config --local --unset https.proxy
)
echo.

echo [1/3] Scanning and preparing files...
git add .
echo.
echo [2/3] Committing changes...
git commit -m "feat: Upgrade independent store to new multi-page template"
echo.
echo [3/3] Pushing to GitHub... (Please check for popup windows!)
git push origin main
echo.
echo ===================================================
echo Success! Push Completed!
echo Vercel will rebuild and publish your site in 10-20 seconds.
echo Live website: https://your-website.com
echo ===================================================
echo.
pause
```

---

## 5. 常见经典布局 Bug 调试排卡指南

### 5.1 悬停空白间距（Hover Gap）大菜单闪退 Bug
* **现象**：当鼠标划过一级导航与下拉面板（Megamenu）之间的空白缝隙时，下拉面板瞬间消失，用户根本点不到类目。
* **原因**：CSS 设置了 `top: calc(100% + 18px);`。在 18px 留白处鼠标处于非 Hover 状态。
* **终极 CSS 伪元素桥接解法**：
  在 `.mega-menu` 样式下方，生成一个**完全透明、隐形的 `:before` 悬空保护层**，桥接这 18px：
  ```css
  .mega-menu::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    height: 20px;
    background: transparent;
  }
  ```

### 5.2 底部 Logo 突兀白色背景框 Bug
* **现象**：在深色底栏中，原本透明的 PNG 格式 Logo 外围出现了一个极不协调的白色实心大方块。
* **原因**：样式表中被硬编码了 `.footer-brand img{background:#fff;}`。
* **解法**：直接将背景色修改为 **`transparent`**，使其自然融入背景色。

---

## 6. 多媒体视频/画册与官方证书极速接入规范

### 6.1 PDF 证书高清渲染展示
1. **重命名去乱码**：将复杂的中文名/长名字 PDF，命名为干净、简短的英文（如 `iso9001.pdf`, `oeko-tex.pdf`, `grs.pdf`）。
2. **PyMuPDF (fitz) 高清 JPG 导出**：
   在本地使用 Python 的 `fitz` 库将 PDF 证书第一页以 150 DPI 高清导出为 `.jpg`：
   ```python
   import fitz
   doc = fitz.open("oeko-tex.pdf")
   page = doc.load_page(0)
   pix = page.get_pixmap(dpi=150)
   pix.save("oeko-tex.jpg")
   ```
3. **高转化 clickable 双维交互网格**：
   每一个证书卡片外部，包裹一个指向 PDF 原件的超链接，支持大买家点击新标签页无限放大预览，达成顶级背书：
   ```html
   <article class="certificate-card">
     <a href="assets/documents/certificates/oeko-tex.pdf" target="_blank" style="text-decoration: none; color: inherit;">
       <img src="assets/images/certificates/oeko-tex.jpg" alt="OEKO-TEX certificate">
       <div class="card-body">
         <h3>OEKO-TEX Standard 100</h3>
         <p>Certified safe textile and fabric safety standard for premium skin comfort.</p>
       </div>
     </a>
   </article>
   ```

### 6.2 工厂实拍视频无缝集成
* **视频属性黄金组合**：将实拍 MP4 拷贝至 `assets/videos/factory-video.mp4`，使用以下属性，使其在电脑和手机端都能像动态海报般流畅、静音、自动、循环播放：
  ```html
  <video style="width: 100%; height: auto; display: block;" controls autoplay loop muted playsinline>
    <source src="./assets/videos/factory-video.mp4" type="video/mp4">
  </video>
  ```

---

## 7. 谷歌收录 SEO 与 AI 搜索引擎 (AIO) 极速激活

大买家已经习惯使用 ChatGPT、Perplexity 或 Claude 搜索优质供应链。我们不仅需要对谷歌友好，更需要对 AI 友好。

### 7.1 FAQ 自然语言一问一答布局 (AIO 优化)
在页面底部设立专门的 `Buyer FAQs` 板块，采用最简单标准的 H3 标题 + P 段落，精准提炼买家爱在 AI 窗口里提问的自然语言问题。AI 爬虫能瞬间以“一问一答”形式提取，将其推荐给采购商并附带您的官网链接！
* **示例**：
  * `Q: Can you manufacture sleepwear according to custom sizing charts?`
  * `A: Yes! We can develop custom patterns based on your US/EU/AU sizing guides...`

### 7.2 谷歌 Search Console 与 Sitemap 极速绑定
1. 在 **[Google Search Console]** 中，输入域名所有权申请。
2. **Cloudflare 免代码所有权验证**：直接选择通过 Cloudflare（DNS 服务商）自动关联。点击授权（Authorize），实现秒级自动免代码验证。
3. 提交站点地图：在控制台左侧 Sitemaps 里，输入并提交：**`sitemap.xml`**。谷歌爬虫会在 24 小时内全自动为您抓取并收录！
