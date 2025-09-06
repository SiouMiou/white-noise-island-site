import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "../lib/siteSettings";
import { urlFor } from "../lib/sanity.image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  
  const title = siteSettings?.title || "白噪島";
  const description = siteSettings?.description || "白噪島官方網站，提供最新的消息和資訊";
  
  // 生成 favicon URL
  let faviconUrl = "/favicon.ico"; // 預設 favicon
  if (siteSettings?.favicon) {
    try {
      faviconUrl = urlFor(siteSettings.favicon).width(32).height(32).url();
    } catch (error) {
      console.error('Failed to generate favicon URL:', error);
    }
  }

  return {
    title: `${title} - 最新消息`,
    description,
    keywords: ["白噪島", "新聞", "最新消息", "官方網站"],
    authors: [{ name: "白噪島團隊" }],
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      title: `${title} - 最新消息`,
      description,
      type: "website",
      images: siteSettings?.ogImage ? [
        {
          url: urlFor(siteSettings.ogImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - 最新消息`,
      description,
      images: siteSettings?.ogImage ? [urlFor(siteSettings.ogImage).width(1200).height(630).url()] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
