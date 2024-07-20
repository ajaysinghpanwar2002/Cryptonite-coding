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
                <Sidebar/>
              </div>
            </div>
          </ReduxProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
