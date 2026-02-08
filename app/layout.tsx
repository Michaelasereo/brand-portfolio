import type { Metadata } from "next";
import { DM_Mono, Geist, Geist_Mono } from "next/font/google";
import { StyleProvider } from "@/components/StyleProvider";
import { LoaderProvider } from "@/context/LoaderContext";
import { PageLoader } from "@/components/PageLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: "400",
  variable: "--font-dm-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Michael's Portfolio",
    template: "%s | Michael's Portfolio",
  },
  description: "Michael's Portfolio — Brand design, product design, and design engineering",
  metadataBase: new URL("https://ti3cket.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} antialiased`}
        style={{ fontFamily: 'var(--font-main, "Helvetica Neue", Helvetica, Arial, sans-serif)' }}
      >
        <StyleProvider>
          <LoaderProvider>
            <PageLoader />
            {children}
          </LoaderProvider>
        </StyleProvider>
      </body>
    </html>
  );
}
