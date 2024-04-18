import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import { SiteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/sonner";

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

export default function RootLayout(props: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-300`}>
        {props.children}
        <Toaster richColors position="bottom-left" />
      </body>
    </html>
  );
}
