import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Creative Developer Portfolio",
  description: "Scrollytelling portfolio experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className={`${inter.variable} font-sans`}>
        <CustomCursor />
        <BackToTop />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
