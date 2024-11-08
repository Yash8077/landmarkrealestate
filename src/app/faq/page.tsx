'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id)
  }

  const faqData = [
    {
      id: '1',
      question: 'What areas does Landmark Real Estate cover in Dehradun?',
      answer: 'Landmark Real Estate covers all major areas in Dehradun, including but not limited to Rajpur Road, Clement Town, Balliwala, Dalanwala, and GMS Road. We also handle properties in nearby regions like Mussoorie and Rishikesh.'
    },
    {
      id: '2',
      question: 'What types of properties do you deal with?',
      answer: 'We deal with a wide range of properties including residential homes, apartments, commercial spaces, plots, and agricultural land. Whether you\'re looking for a cozy apartment in the city center or a spacious villa in the outskirts, we\'ve got you covered.'
    },
    {
      id: '3',
      question: 'How can I list my property with Landmark Real Estate?',
      answer: 'Listing your property with us is easy. You can either call our office, send us an email with property details, or use the "List Your Property" form on our website. One of our agents will get in touch with you to gather more information and start the listing process.'
    },
    {
      id: '4',
      question: 'What documents do I need to buy a property in Dehradun?',
      answer: 'To buy a property in Dehradun, you typically need ID proof (Aadhar Card, PAN Card), address proof, passport-size photographs, and bank statements. For the property, you\'ll need documents like the Sale Deed, No Objection Certificate (NOC), and property tax receipts. Our team will guide you through the specific requirements for your chosen property.'
    },
    {
      id: '5',
      question: 'Do you offer property management services?',
      answer: 'Yes, we offer comprehensive property management services for both residential and commercial properties. This includes tenant screening, rent collection, property maintenance, and handling legal compliances. It\'s ideal for property owners who live outside Dehradun or prefer hassle-free management of their investments.'
    },
    {
      id: '6',
      question: 'How long does it typically take to close a property deal in Dehradun?',
      answer: 'The time to close a property deal can vary depending on various factors. Generally, it takes about 30-60 days from the initial agreement to the final registration. This includes time for document verification, obtaining NOCs if required, and completing the registration process. Our experienced team works to make this process as smooth and quick as possible.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-14">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-center text-gray-600">
              Find answers to common questions about Landmark Real Estate Dehradun
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {faqData.map((faq) => (
              <div key={faq.id} className="border-b border-gray-200">
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
                >
                  <span className="text-lg font-semibold text-gray-800 text-left">
                    {faq.question}
                  </span>
                  {openQuestion === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                    openQuestion === faq.id ? 'max-h-[1000px] py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              Can't find the answer you're looking for? Contact us at{' '}
              <a href="mailto:info@landmarkrealestate.com" className="text-blue-600 hover:underline">
                info@landmarkrealestate.com
              </a>{' '}
              or call us at +91 135 2555 555
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}