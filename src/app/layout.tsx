import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import FloatingAI from "@/components/FloatingAI";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeatherGPT AI",
  description: "Regime-Aware AI Post-Processing of Monsoon Rainfall Forecasts",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: '#0f1c3d',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <Header />
        <main id="main" className="flex-1 flex flex-col">
          {children}
        </main>
        <FloatingAI />
        <ServiceWorkerRegistration />
        <Ticker />
        <Footer />
      </body>
    </html>
  );
}

