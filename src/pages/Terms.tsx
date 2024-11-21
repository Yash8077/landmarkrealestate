'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function TermsOfService() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [accepted, setAccepted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleAccept = () => {
    if (accepted) {
      setToastMessage('Thank you for accepting our Terms of Service.')
      setShowToast(true)
      // Here you would typically send this acceptance to your backend
    } else {
      setToastMessage('You must accept the Terms of Service to continue.')
      setShowToast(true)
    }
    setTimeout(() => setShowToast(false), 3000)
  }

  const sections = [
    {
      id: '1',
      title: 'Acceptance of Terms',
      content: (
        <p>
          By accessing and using the services provided by Landmark Real Estate Dehradun, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>
      )
    },
    {
      id: '2',
      title: 'Use of Service',
      content: (
        <div className="space-y-4">
          <p>You agree to use our real estate services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else&rsquo;s use and enjoyment of the website and services.</p>
          <p>Prohibited activities include, but are not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing false or misleading information about properties or transactions</li>
            <li>Attempting to manipulate property listings or market data</li>
            <li>Harassing or intimidating other users, clients, or our staff</li>
            <li>Violating any applicable real estate laws or regulations</li>
          </ul>
        </div>
      )
    },
    {
      id: '3',
      title: 'Property Listings',
      content: (
        <div className="space-y-4">
          <p>We strive to provide accurate property listings and information. However, we do not warrant that property descriptions or other content is 100% accurate, complete, reliable, or error-free.</p>
          <p>All property features, prices, and availability are subject to change without notice. The inclusion of any property on our website does not guarantee its availability.</p>
        </div>
      )
    },
    {
      id: '4',
      title: 'Transactions and Payments',
      content: (
        <div className="space-y-4">
          <p>Landmark Real Estate Dehradun facilitates property transactions but is not responsible for the final terms of any property sale or rental agreement between buyers/renters and sellers/landlords.</p>
          <p>Any payments made through our platform for services (e.g., property valuation, consultation) are subject to our refund policy, which is available upon request.</p>
        </div>
      )
    },
    {
      id: '5',
      title: 'Privacy and Data Protection',
      content: (
        <p>
          Your use of our services is also governed by our Privacy Policy. By accepting these Terms of Service, you also agree to the collection, use, and sharing of your information as described in our Privacy Policy.
        </p>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-14">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Terms of Service
            </h1>
            <p className="mt-4 text-center text-gray-600">
              Landmark Real Estate Dehradun - Your Trusted Property Partner
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {section.title}
                  </span>
                  {openSection === section.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                    openSection === section.id ? 'max-h-[1000px] py-4' : 'max-h-0'
                  }`}
                >
                  <div className="text-gray-600">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-gray-50">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="accept-terms"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
                I have read and accept the Terms of Service
              </label>
            </div>
            <button
              onClick={handleAccept}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                accepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              Accept Terms
            </button>
          </div>
        </div>
      </div>
      
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  )
}