import { Inter } from "next/font/google";
import { Metadata, Viewport } from "next";
import { ThemeProviders } from "@/components/theme-providers";
import { siteConfig } from "@/config/site";
import "../globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem]">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased h-screen",
          inter.variable,
        )}
      >
        <NextTopLoader />
        <ToastContainer
          position="bottom-right"
          pauseOnFocusLoss={false}
          className={"text-sm"}
          pauseOnHover={false}
        />
        <ThemeProviders>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProviders>
      </body>
    </html>
  );
}

export default LoginLayout;
