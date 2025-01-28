'use client'

import React from 'react'
import { CheckCircle, Home, Clock, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface PropertySubmissionConfirmationProps {
  onClose: () => void
}

const PropertySubmissionConfirmation: React.FC<PropertySubmissionConfirmationProps> = ({ onClose }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Submission Confirmation</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <motion.div className="text-center" variants={itemVariants} initial="hidden" animate="visible">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h3 className="mt-4 text-xl font-semibold text-gray-900">
          Property Submitted Successfully
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your submission. Our team will carefully review the property details, and upon approval, the listing will be published on our platform.
        </p>
      </motion.div>
      <motion.div className="space-y-4" variants={itemVariants} initial="hidden" animate="visible">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-700 flex items-center">
            <Clock className="mr-2" size={20} /> Next Steps
          </h4>
          <ul className="mt-2 text-sm text-blue-600 list-disc list-inside">
            <li>Our team will review your property within 24-48 hours</li>
            <li>You&apos;ll receive an email notification once approved</li>
            <li>Your listing will go live on our platform</li>
          </ul>
        </div>
      </motion.div>
      <motion.div className="space-y-4" variants={itemVariants} initial="hidden" animate="visible">
        <Button asChild className="w-full group" onClick={onClose}>
          <Link href="/">
            Return to Home
            <Home className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full group" onClick={onClose}>
          <Link href="/sell-property">
            List Another Property
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}

export default PropertySubmissionConfirmation

