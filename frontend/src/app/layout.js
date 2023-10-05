"use client";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { MoralisProvider } from "react-moralis";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script async src="https://saturn.tech/widget.js"></Script>

      <Script src="https://vjs.zencdn.net/8.3.0/video.min.js"></Script>
      <body className={inter.className}>
        <MoralisProvider initializeOnMount={false}>{children}</MoralisProvider>
      </body>
    </html>
  );
}
