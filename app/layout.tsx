import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/header";
import { lemonade } from "./utilities/fonts";
import Footer from "./components/footer/footer";

export const metadata: Metadata = {
  title: "Rose Hips Dance",
  description: "Where Middle Eastern dance meets modern healing; gently restoring your body, your confidence, and helping you connect to your Aliveness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lemonade.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
