import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const ibmPLexSan = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-sans',
})
export const metadata: Metadata = {
  title: "Jobie - Quản lí chi tiêu",
  description: "Đạt mục tiêu tiết kiệm đề ra và quản lí chi tiêu của người thân",
  icons: {
    icon: '/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPLexSan.variable}`}>{children}</body>
    </html>
  );
}
