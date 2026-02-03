import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omkar Thipparthi | Software Engineer",
  description: "Software Engineer with 3+ years of experience building scalable applications, cloud-native solutions, and AI-powered systems. MS in Computer Science from ASU.",
  keywords: ["Software Engineer", "Full Stack Developer", "React", "Next.js", "Python", "Cloud", "AI/ML"],
  authors: [{ name: "Omkar Thipparthi" }],
  openGraph: {
    title: "Omkar Thipparthi | Software Engineer",
    description: "Software Engineer with 3+ years of experience building scalable applications and cloud-native solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
