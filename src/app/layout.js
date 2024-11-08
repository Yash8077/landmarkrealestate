import localFont from "next/font/local";
import "./globals.css";
import Header from '../components/header'
import Footer from '../components/footer'
import { ScrollToTop } from "../components/ScrollToTop";
import { ScrollProgressBar } from '../components/ScrollProgressBar'

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

export const metadata = {
  title: "TheLandmarkRealEstate",
  description: "Unlocking Dreams, One Home At A Time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <ScrollProgressBar />
      </body>
    </html>
  );
}
