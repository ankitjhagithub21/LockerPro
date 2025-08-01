import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import StoreProvider from "./StoreProvider";
import Footer from "@/components/footer";


const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: "Locker Pro",
  description: "Password Manager App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <StoreProvider>
            <Navbar/>
          {children}
          <Footer/>
        </StoreProvider>
          <Toaster position="top-center" richColors/>
        </ThemeProvider>
      </body>
    </html>
  );
}
