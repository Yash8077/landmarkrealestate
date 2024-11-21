'use client'

import * as React from 'react'
import Link from 'next/link'

import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ]

  return (
    <nav className="bg-background border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">LandmarkRealEstate</span>
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {/* <div className="hidden md:flex items-center space-x-4">
            <Button variant="default" className="text-base">
              Login
            </Button>
          </div> */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}

          </div>
        </div>
      )}
    </nav>
  )
}

export default Header