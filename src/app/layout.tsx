import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

import ThemeProviderWrapper from "./ThemeProvider";
import Navbar from "@/components/Header/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

const ReduxProvider = dynamic(() => import("./ReduxProvider"), {
  ssr: false
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cryptonite",
  description: "made with nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <ReduxProvider>
            <Navbar />
            <div className="flex">
              <div className="w-7/12">
                {children}
              </div>
              <div className="w-5/12">
                <Sidebar />
              </div>
            </div>
          </ReduxProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
// {
//   "id": "bitcoin",
//   "symbol": "btc",
//   "name": "Bitcoin",
//   "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
//   "current_price": 5623160,
//   "market_cap": 110878089360086,
//   "high_24h": 5667256,
//   "low_24h": 5551225,
//   "price_change_percentage_24h_in_currency": 0.7741219524109496,
// }