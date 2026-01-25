import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { APP_NAME, SERVER_URL } from "@/lib/constants";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    template: `%s | Tutor Seekers`,
    default: APP_NAME
  },
  description: "A state of the art platform built for tutors to run their business from, helping them connect with students.",
  metadataBase: new URL (SERVER_URL)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-off-white min-h-screen flex flex-col`}
      >
          <Header />
          {/* <main className="flex-1"> */}
            {children}
          {/* </main> */}
          <Footer />
          <Toaster />
      </body>
    </html>
  );
}
