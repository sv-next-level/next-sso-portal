import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import { SiteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SiteConfig.name,
    template: SiteConfig.name,
  },
  description: SiteConfig.description,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-300`}>{children}</body>
    </html>
  );
}
