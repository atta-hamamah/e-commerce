import { ProductProvider } from '../app/context/ProductContext';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div className="!min-h-[calc(100vh-296px)]">
          <ProductProvider>
            {children}
          </ProductProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
