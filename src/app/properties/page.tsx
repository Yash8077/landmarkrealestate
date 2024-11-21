import React from 'react'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import type { Metadata } from 'next'
import Properties from '@/pages/Properties'
export const metadata: Metadata = {
  title: 'Products',
  description:       "Explore our wide range of properties. Find your perfect house.",
  applicationName: '', //application name
  referrer: 'origin-when-cross-origin',
  keywords: [
    "Dehradun real estate",
    "Property Dehradun",
    "Dehradun homes",
    "Buy property",
    "Rent property",
    "Real estate deals",
    "Dehradun flats",
    "Real estate agents",
    "Dehradun plots",
    "Dehradun property",
    "Homes in Dehradun",
    "Dehradun investments",
    "Real estate market",
    "Dehradun listings",
    "Uttarakhand property",
    "Real estate trends",
    "Commercial property",
    "Dehradun brokers",
    "Luxury homes",
    "Dehradun land",
    "Dehradun apartments",
    "Dehradun realty",
    "Dehradun housing",
    "Property for sale",
    "Dehradun rentals",
    "Real estate projects",
  ],  openGraph: {
    title: 'Properties',
    description:       "Explore our wide range of properties. Find your perfect house.",
    url: "https://thelandmarkrealestate.com/properties",
    siteName: 'E-Wood',
    type: 'website',
    images: [
      {
        url: '/404.svg',  /* sharing card image url/path, must be absolute URL*/
        width: 800,
        height: 600,
        alt: '404 Not Found',
      },
    ],
    videos: [
      {
        url: 'https://nextjs.org/video.mp4', // Must be an absolute URL
        width: 800,
        height: 600,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourwebsite', // The Twitter username of the website or content creator
    title: 'Products',
    description:       "Explore our wide range of properties. Find your perfect house.",
    images: [
      {
        url: '/404.svg',
        width: 800,
        height: 600,
        alt: '404 not found'
      }
    ], // The image URL for the Twitter card
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/404.svg',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'google',
  },
  assets: ['https://nextjs.org/assets'],  // url for all assets
  category: 'technology',
}

export default function page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-24 h-24 animate-spin" />
      </div>}>
      <Properties />
    </Suspense>
  )
}
