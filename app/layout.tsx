import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.millegao.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "米乐高｜数字光影与沉浸式空间综合解决方案",
    template: "%s｜米乐高"
  },
  description: "米乐高提供文旅夜游、商业空间、展馆展厅、沉浸式餐饮、舞台视觉与互动数字装置综合解决方案。",
  keywords: ["数字光影", "沉浸式空间", "文旅夜游", "建筑投影", "数字展厅", "沉浸式餐厅", "互动装置"],
  authors: [{ name: "成都米乐高图像科技有限公司" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: "米乐高｜数字光影与沉浸式空间综合解决方案",
    description: "创意、内容、技术、工程与运维一体化的数字视觉服务。",
    images: ["/images/case-cultural-building.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04101f"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
