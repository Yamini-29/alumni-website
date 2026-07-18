import "./globals.css";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/public/LayoutWrapper";
import SmoothScroll from "@/components/providers/SmoothScroll";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <LayoutWrapper>
          <SmoothScroll>
          <main>{children}</main>
          </SmoothScroll>
        </LayoutWrapper>
      </body>
    </html>
  );
}