import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const interTight = Inter_Tight({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const siteTitle = "Shaheer Hussain Jafri - AI Systems Builder";
const siteDescription =
  "AI systems builder and automation engineer creating intelligent workflows, scalable backend automations, and high-performance digital products.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shaheer.dev"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://shaheer.dev",
    siteName: "Shaheer Hussain Jafri",
    locale: "en_US",
    type: "website",
  },
  keywords: [
    "AI automation developer",
    "AI systems builder",
    "Make.com automation",
    "n8n workflow automation",
    "business automation",
    "content automation systems",
    "AI workflow engineer",
    "automation developer Pakistan",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/models/im-signature.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${interTight.className} ${interTight.variable} text-offwhite bg-black`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
