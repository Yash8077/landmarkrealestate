'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <span className="text-xl font-bold">DehradunEstate</span>
        </div>
        <nav className="hidden lg:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Properties
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Agents
              </Link>
            </li>
            <li>
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 lg:hidden pt-16">
          <nav className="container mx-auto px-4 py-8">
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="block text-xl text-gray-600 hover:text-gray-900"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-xl text-gray-600 hover:text-gray-900"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block text-xl text-gray-600 hover:text-gray-900"
                >
                  Agents
                </Link>
              </li>
              <li>
                <button className="w-full bg-black text-white px-4 py-2 rounded-md text-xl hover:bg-gray-800 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}