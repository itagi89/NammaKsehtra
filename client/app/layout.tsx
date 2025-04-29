import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LeftNav from "@/components/LeftNav/LeftNav";
import TopNav from "@/components/TopNav/TopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Namma Ksehtra",
  description: "Namma Ksehtra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="main-content">
          <LeftNav />
          <div className="content">
            <TopNav />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
