import "./globals.css";
import { Inter } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ✅ Apply font here */}
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
       <LayoutWrapper>
  <main>{children}</main>
</LayoutWrapper>
      </body>
    </html>
  );
}