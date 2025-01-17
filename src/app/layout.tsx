import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { WishlistProvider } from "@/context/store";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | TheLandmarkRealEstate",
    default: "TheLandmarkRealEstate",
  },
  metadataBase: new URL("https://landmarkrealestate.com/"), // canonical link
  description: "Unlocking Dreams, One Home At A Time",
  referrer: "origin-when-cross-origin",
  keywords: ["TheLandmarkRealEstate", "tech"],
  icons: {
    icon: [
      { url: "/assets/logo/favicon-16x16.png" },
      new URL(
        "/assets/logo/favicon-16x16.png",
        "https://landmarkrealestate.com"
      ),
      {
        url: "/assets/logo/favicon-16x16.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      { url: "/assets/logo/apple-touch-icon.png" },
      {
        url: "/assets/logo/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheLandmarkRealEstate",
    description: "Unlocking Dreams, One Home At A Time",
    creator: "@nextjs",
    images: ["https://landmarkrealestate.com/logo/logo.png"], // Must be an absolute URL
  },
  verification: {
    google: "google",
  },
  assets: ["https://landmarkrealestate.com/assets"], // url for all assets
  category: "technology",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WishlistProvider>
          <Header />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Footer />
          <ScrollToTop />
          <ScrollProgressBar />
          <Toaster />
        </WishlistProvider>
      </body>
    </html>
  );
}
