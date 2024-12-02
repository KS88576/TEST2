import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Toast } from "@/components/ui/toast"
import { Suspense } from 'react';
import { AuthProvider } from '@/contexts/AuthContext'
import Loading from '@/components/Loading';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Stable",
  description: "Launch stablecoins backed by government bonds with secure yield. Built on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Suspense fallback={<Loading />}>
        <Providers>
          <AuthProvider>
          {children}
          </AuthProvider>
        </Providers>
        </Suspense>
        <Toast />
      </body>
    </html>
  );
}