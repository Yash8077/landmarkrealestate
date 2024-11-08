'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, Home, Briefcase, BarChart2, Users, MapPin, DollarSign } from 'lucide-react'

export default function AboutUs() {
  const values = [
    { 
      icon: <Building2 className="w-8 h-8 mb-4 text-blue-600" />,
      title: "Integrity", 
      description: "We uphold the highest ethical standards in all our dealings." 
    },
    { 
      icon: <Home className="w-8 h-8 mb-4 text-blue-600" />,
      title: "Excellence", 
      description: "We strive for excellence in every aspect of our service." 
    },
    { 
      icon: <Briefcase className="w-8 h-8 mb-4 text-blue-600" />,
      title: "Client-Centric", 
      description: "Our clients' needs are at the heart of everything we do." 
    },
    { 
      icon: <BarChart2 className="w-8 h-8 mb-4 text-blue-600" />,
      title: "Innovation", 
      description: "We embrace innovative solutions in the real estate market." 
    },
  ]

  const stats = [
    { icon: <Users className="w-12 h-12 text-blue-200" />, value: "5000+", label: "Happy Clients" },
    { icon: <Home className="w-12 h-12 text-blue-200" />, value: "10000+", label: "Properties Sold" },
    { icon: <MapPin className="w-12 h-12 text-blue-200" />, value: "50+", label: "Cities Covered" },
    { icon: <DollarSign className="w-12 h-12 text-blue-200" />, value: "$1B+", label: "Property Value Sold" },
  ]

  const expertise = [
    {
      title: "Residential Properties",
      description: "From cozy apartments to luxurious villas, we offer a wide range of residential options to suit every lifestyle and budget. Our expert agents will guide you through the entire process, ensuring you find the perfect home that meets all your needs and desires.",
      icon: <Home className="w-12 h-12 text-blue-600 mb-4" />
    },
    {
      title: "Commercial Real Estate",
      description: "We assist businesses in finding the perfect spaces for offices, retail, and more. Our team has extensive knowledge of the local commercial real estate market and can help you make informed decisions that align with your business goals and financial objectives.",
      icon: <Building2 className="w-12 h-12 text-blue-600 mb-4" />
    },
    {
      title: "Property Management",
      description: "Our comprehensive property management services ensure your investments are well-maintained and profitable. From tenant screening and rent collection to maintenance and financial reporting, we handle all aspects of property management, allowing you to enjoy passive income without the stress of day-to-day operations.",
      icon: <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
    }
  ]

  return (
    <div className=" bg-gray-100">
    <div className="min-h-screen mt-10 mx-10 bg-gray-100">
      <main className="container mx-auto px-4 py-16">
        <section className="mb-24">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-blue-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Our Real Estate Agency
          </motion.h1>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Luxury Home"
                width={400}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </motion.div>
            <motion.div 
              className="md:w-2/3 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-lg md:text-xl leading-relaxed">
                Welcome to our premier real estate agency! With over two decades of experience in the property market,
                we've established ourselves as a trusted name in helping clients find their dream homes and make smart
                investments.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Our team of expert agents combines in-depth local knowledge with cutting-edge market analysis to provide
                unparalleled service. Whether you're buying, selling, or investing, we're here to guide you through every
                step of your real estate journey.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mb-24">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 rounded-lg">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Impact
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-lg rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-2xl mb-4 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
    </div>
  )
}