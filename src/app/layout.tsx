import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import ToastProvider from "./components/ToastProvider";
import CartProvider from "./components/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PickNest | Your Next Great Find",
    template: "%s | PickNest",
  },
  description:
    "Discover electronics, fashion, home essentials, beauty, and sports products at PickNest.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <CartProvider>
            <ToastProvider />
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}