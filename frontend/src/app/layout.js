"use client";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { MoralisProvider } from "react-moralis";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script async src="https://saturn.tech/widget.js"></script>
      <body className={inter.className}>
        <MoralisProvider initializeOnMount={false}>{children}</MoralisProvider>
      </body>
    </html>
  );
}
