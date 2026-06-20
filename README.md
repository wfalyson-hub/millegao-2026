# 米乐高 2026 Next.js 官网

深蓝光感视觉、沉浸式滚动叙事、玻璃卡片、案例展示墙、AI 智能咨询和 GEO/SEO 基础已经整合到 Next.js App Router 项目中。

## 本地运行

```powershell
npm install
npm run dev
```

生产验证：

```powershell
npm run build
npm run start
```

## 内容维护

主要内容位于 `lib/content.ts`：

- `solutions`：六大解决方案。
- `cases`：案例展示墙。
- `faqs`：用户常见问题及 GEO 可提取答案。

新增案例时：

1. 将图片放入 `public/images`。
2. 向 `cases` 数组增加一条记录。
3. 填写分类、摘要和技术标签。

筛选、案例墙和弹窗会自动读取新数据。

## Vercel 自动部署

1. 将 `website-2026` 项目提交到 GitHub、GitLab 或 Bitbucket。
2. 在 Vercel 中导入该仓库。
3. Framework Preset 选择 Next.js，Root Directory 指向 `website-2026`（如果它不是仓库根目录）。
4. 设置环境变量：

```text
NEXT_PUBLIC_SITE_URL=https://你的正式域名
```

5. 首次部署完成后绑定正式域名。

之后每次推送默认分支，Vercel 会自动执行生产部署；其他分支和 Pull Request 会生成预览地址。

## GEO / SEO

已包含：

- Next.js Metadata 与 canonical
- Open Graph 分享信息
- Organization、Service、FAQ JSON-LD
- 自动生成 `/robots.txt`
- 自动生成 `/sitemap.xml`
- `/llms.txt`
- 清晰的标题层级、服务摘要和 FAQ 答案

正式上线前请确认：

- `.env` 中的正式域名
- 公司工商名称、地址与联系电话
- 项目名称、地点、年份、客户授权和成果数据
- 为重点案例建立独立详情页，增强搜索与 AI 引用价值

## 后续正式接入

- 企业微信、邮箱或 CRM 线索接口
- 正式 AI 模型及审核后的公司知识库
- 内容管理后台
- 图片 AVIF/WebP 与视频多码率/CDN
- 百度、必应和 Google 站长平台
