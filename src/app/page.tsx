'use client'

import Image from 'next/image'
import { Search, MapPin, DollarSign, CreditCard, Shield, Bed } from 'lucide-react'
import Testimonials from '../components/testimonials'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import FeaturedPropertiesCarousel from '@/components/featuredCarousel'

export default function Page() {
  return (
    <div className="min-h-screen bg-white mx-auto">
      <main>
        <Hero />
        <FeaturedPropertiesCarousel />
        <WhyChooseUs />
        <Testimonials />
      </main>
    </div>
  )
}

function Hero() {
  return (
    <div className="relative h-[calc(100vh-4rem)] min-h-[400px]">
      <Image
        src="/assets/heroSection.jpg"
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Find Your Dream Property in Dehradun
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-3xl">
          Discover the perfect home in the heart of Uttarakhand, where
          nature meets modern living
        </p>

        <SearchForm />

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
            Residential
          </span>
          <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
            Commercial
          </span>
          <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
            Hill View
          </span>
          <span className="bg-white text-black px-3 py-1 rounded-full text-sm">
            Luxury
          </span>
        </div>
      </div>
    </div>
  )
}

function SearchForm() {
  const router = useRouter()
  const [searchType, setSearchType] = useState('Buy')
  const [propertyType, setPropertyType] = useState('All')
  const [location, setLocation] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const searchParams = new URLSearchParams({
      type: searchType,
      propertyType,
      query: location,
      minPrice,
      maxPrice,
      bedrooms
    })
    let newUrl = [
      searchType ? `type=${searchType}` : '',
      propertyType ? `propertyType=${propertyType}` : '',
      location ? `query=${location}` : '',
      minPrice ? `minPrice=${minPrice}` : '',
      maxPrice ? `maxPrice=${maxPrice}` : '',
      bedrooms ? `bedrooms=${bedrooms}` : ''
    ].filter(Boolean).join('&');
    
    router.push(`/properties?${newUrl}`)
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-4xl px-10">
      <div className="flex flex-wrap gap-2 mb-4">
        {['Buy', 'Rent'].map((type) => (
          <button
            key={type}
            className={`flex-1 py-2 px-4 rounded transition-colors ${
              searchType === type
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setSearchType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
        >
          <option>Select Property Type</option>
          <option>Apartments</option>
          <option>House</option>
          <option>Commercial</option>
        </select>
        <div className="relative">
          <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Dehradun, Uttarakhand"
            className="w-full p-2 pl-8 border rounded focus:ring-2 focus:ring-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="relative">
          <Bed className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            placeholder="Number of Bedrooms"
            className="w-full p-2 pl-8 border rounded focus:ring-2 focus:ring-black"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            min="1"
          />
        </div>
        <input
          type="number"
          placeholder="Min Price"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <Search className="mr-2" />
          Search Properties
        </button>
      </form>
    </div>
  )
}

function WhyChooseUs() {
  return (
    <section className="py-16 bg-white px-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-16">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 transform lg:translate-x-2 lg:translate-y-4 sm:translate-x-6 sm:translate-y-6 rounded-lg"></div>
              <Image
                src="/assets/landing1.jpg"
                alt="Modern white house"
                width={600}
                height={400}
                className="relative z-10 rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 lg:pl-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-blue-500">
              Why do you choose us?
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              We offer a seamless and immersive experience for finding your
              dream property in the heart of Dehradun, surrounded by the
              beauty of the Himalayas.
            </p>
            <div className="space-y-6">
              <FeatureItem
                icon={<DollarSign className="w-6 h-6 text-blue-500" />}
                title="Affordable prices"
                description="The houses we provide have a fairly affordable price and guaranteed quality"
              />
              <FeatureItem
                icon={<CreditCard className="w-6 h-6 text-blue-500" />}
                title="Easy payment"
                description="The payment we apply is also easy, we provide various kinds of online wallets"
              />
              <FeatureItem
                icon={<Shield className="w-6 h-6 text-blue-500" />}
                title="Property insurance"
                description="We provide insurance for every property to ensure your peace of mind"
              />
            </div>
            <button className="mt-8 bg-black text-white px-6 py-3 rounded-md text-lg hover:bg-gray-800 transition-colors">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-navy-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}