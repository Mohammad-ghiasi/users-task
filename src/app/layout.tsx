import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Users Manager",
  description: "Admin panel for manging users information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="px-3  md:px-20 ">
          <Header />
          <div className="ps-1 mt-5">{children}</div>
        </div>
      </body>
    </html>
  );
}
