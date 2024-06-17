import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { ThemeProviders } from "@/components/theme-providers";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem]">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <NextTopLoader shadow={false} showSpinner={false} />
        <ThemeProviders>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <SiteHeader />
            <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProviders>
      </body>
    </html>
  );
}
