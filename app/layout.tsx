import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "白噪島 - 最新消息",
  description: "白噪島官方網站，提供最新的消息和資訊",
  keywords: ["白噪島", "新聞", "最新消息", "官方網站"],
  authors: [{ name: "白噪島團隊" }],
  openGraph: {
    title: "白噪島 - 最新消息",
    description: "白噪島官方網站，提供最新的消息和資訊",
    type: "website",
  },
};

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
