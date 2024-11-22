import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Ready To Work With Us?</h2>
            <p className="text-gray-400 max-w-md">
              Experience top-notch customer service and let us guide you on your property journey
            </p>
          </div>
          <div className="bg-amber-500 rounded-full p-4 hidden md:flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6 text-gray-900" />
          </div>
        </div>
        <hr className="border-gray-800 mb-8" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Landmark Real Estate is your trusted partner in finding the perfect property in Dehradun and surrounding areas.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              
            <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/properties" className="text-gray-400 hover:text-white">Properties</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
            <li><Link href="/faq" className="text-gray-400 hover:text-white">Frequently Asked Questions</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>General Mahadev Singh Road, Dehradun</li>
              <li>Phone: +91 9412053365</li>
              <li>Email: info@thelandmarkrealestate.com</li>
            </ul>
          </div>
          
        </div>
        </div> 
        <div className="mt-8 pt-8 border-t border-gray-800  text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TheLandmarkRealEstate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}