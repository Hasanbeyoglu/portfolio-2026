import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ertugrul Hasanbeyoglu | Frontend Developer",
  description: "Frontend Developer specializing in React, TypeScript, and Next.js. Building modern web experiences in Munich. Available for Blue Card sponsorship opportunities.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "TypeScript",
    "Next.js",
    "Munich",
    "Germany",
    "Web Development",
    "Software Engineer"
  ],
  authors: [{ name: "Ertugrul Hasanbeyoglu" }],
  creator: "Ertugrul Hasanbeyoglu",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Hasanbeyoglu", // TODO: Update URL
    title: "Ertugrul Hasanbeyoglu | Frontend Developer",
    description: "Frontend Developer specializing in React, TypeScript, and Next.js. Based in Munich, Germany.",
    siteName: "Ertugrul Hasanbeyoglu Portfolio",
    images: [
      {
        url: "/og-image.jpg", // TODO: Add image
        width: 1200,
        height: 630,
        alt: "Ertugrul Hasanbeyoglu - Frontend Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ertugrul Hasanbeyoglu | Frontend Developer",
    description: "Frontend Developer specializing in React, TypeScript, and Next.js",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        {children}
        <Navigation />
      </body>
    </html>
  );
}
