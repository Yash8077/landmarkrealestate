'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function PrivacyPolicy() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const sections = [
    {
      id: '1',
      title: 'Information We Collect',
      content: (
        <div className="space-y-4">
          <p>At Landmark Real Estate Dehradun, we collect personal information that you provide directly to us, such as:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact details</li>
            <li>Email address and phone number</li>
            <li>Property preferences and requirements</li>
            <li>Financial information for property transactions</li>
            <li>Identification documents for property deals</li>
          </ul>
          <p>We also collect information automatically when you use our website, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Log data (IP address, browser type, pages visited)</li>
            <li>Device information</li>
            <li>Location information</li>
            <li>Cookie data for website functionality</li>
          </ul>
        </div>
      )
    },
    {
      id: '2',
      title: 'How We Use Your Information',
      content: (
        <div className="space-y-4">
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Help you find suitable properties</li>
            <li>Process property transactions</li>
            <li>Send property updates and newsletters</li>
            <li>Improve our real estate services</li>
            <li>Comply with real estate regulations</li>
          </ul>
        </div>
      )
    },
    {
      id: '3',
      title: 'Information Sharing',
      content: (
        <div className="space-y-4">
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Property owners and buyers</li>
            <li>Legal and financial advisors</li>
            <li>Government authorities when required</li>
            <li>Property management services</li>
          </ul>
          <p>We never sell your personal information to third parties.</p>
        </div>
      )
    },
    {
      id: '4',
      title: 'Data Security',
      content: (
        <div className="space-y-4">
          <p>We protect your information through:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure data encryption</li>
            <li>Regular security updates</li>
            <li>Restricted data access</li>
            <li>Employee privacy training</li>
          </ul>
          <p>We regularly review and update our security measures to ensure your data remains protected.</p>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Privacy Policy
            </h1>
            <p className="mt-4 text-center text-gray-600">
              Landmark Real Estate Dehradun - Protecting Your Privacy
            </p>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
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
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openSection === section.id && (
                  <div className="px-6 py-4 bg-gray-50">
                    <div className="text-gray-600">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Last updated: January 2024. For any privacy-related questions, please contact us at{' '}
              <a href="mailto:privacy@landmarkrealestate.com" className="text-blue-600 hover:underline">
                privacy@landmarkrealestate.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}