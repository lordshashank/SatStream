"use client";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { MoralisProvider } from "react-moralis";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import "@/styles/video-js.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://saturn.tech/widget.js"></Script>
      <Script src="https://vjs.zencdn.net/8.0.4/video.min.js"></Script>
      <body className={inter.className}>
        <MoralisProvider initializeOnMount={false}>{children}</MoralisProvider>
      </body>
    </html>
  );
}
