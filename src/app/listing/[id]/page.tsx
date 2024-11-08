'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Heart, Share2, Star, Building2, Bath, Car, ArrowLeft, ArrowRight, BedDouble, Ruler, Home, CalendarDays, Trees, Phone, Mail, MessageSquare, User } from 'lucide-react'
import listing from "../../data/properties.json"
import ShareButton from './ShareButton'

export default function PropertyDetails({params}:{params:{id:string}}) {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundProperty = listing.properties.find(p => p.id.toString() === id) ?? null;
    if (foundProperty === null) {
      setProperty(null);
      setError("Property not found");
      setLoading(false);  // Stop loading if property is not found
    } else {
      setProperty(foundProperty);
      setError(null);
      setLoading(false); // Loading finished if property is found
    }
  }, [id, listing.properties]);

  const nextImage = useCallback(() => {
    if (!property || !property.images) return; // Avoid errors if property or images are not available

    setIsAnimating(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Match this with the CSS transition duration
  }, [property]);

  const prevImage = useCallback(() => {
    if (!property || !property.images) return; // Avoid errors if property or images are not available

    setIsAnimating(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500); // Match this with the CSS transition duration
  }, [property]);

  useEffect(() => {
    if (!property || !property.images) return; // Only set interval if property is valid

    const intervalId = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [nextImage, property]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Main Image Section */}
          <div className="relative">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              {property.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`${property.name} - View ${index + 1}`}
                  className={`object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  fill
                  priority={index === 0}
                />
              ))}
              <button 
                onClick={prevImage} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors z-10"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors z-10"
                aria-label="Next image"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
              <div className="absolute top-4 left-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors cursor-pointer z-10">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <ShareButton url={window.location.href} title={`Check out ${property.name}`} />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-full py-1 px-3 flex items-center space-x-2 z-10">
                <span className="text-sm">{property.address.street}, {property.address.city}</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-4">
              {property.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`relative h-20 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ${
                    idx === currentImageIndex ? 'ring-2 ring-blue-500 scale-105' : ''
                  }`}
                  onClick={() => {
                    setIsAnimating(true)
                    setCurrentImageIndex(idx)
                    setTimeout(() => setIsAnimating(false), 500)
                  }}
                >
                  <Image
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="object-cover"
                    fill
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{property.name}</h1>
                  <div className="flex items-center space-x-1 bg-yellow-400 text-white px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                </div>
                <span className="text-lg text-gray-600">{property.type}</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center space-x-3">
                    <BedDouble className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-medium">{property.beds}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Bath className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-medium">{property.baths}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Ruler className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-medium">{property.area} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Garage</p>
                      <p className="font-medium">{property.garage} Car</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Features</h2>
                <ul className="grid grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Location</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Street</p>
                      <p className="font-medium">{property.address.street}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-medium">{property.address.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">State</p>
                      <p className="font-medium">{property.address.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Zip Code</p>
                      <p className="font-medium">{property.address.zipCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium">{property.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center space-x-3">
                    <Home className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Property ID</p>
                      <p className="font-medium">{property.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium text-2xl text-blue-600">${property.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Ruler className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Property Size</p>
                      <p className="font-medium">{property.area} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CalendarDays className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Year Built</p>
                      <p className="font-medium">{property.yearBuilt}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trees className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Land Area</p>
                      <p className="font-medium">{property.lotSize} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Property Type</p>
                      <p className="font-medium">{property.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-32 shadow-md">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-center">Interested in this property?</h2>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <User className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="flex">
                        <select className="px-3 py-2 border rounded-l-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>+1</option>
                          <option>+44</option>
                          <option>+91</option>
                        </select>
                        <div className="relative flex-grow">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </span>
                          <input
                            
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full pl-10 pr-4 py-2 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <div className="relative">
                        <span className="absolute top-3 left-3">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </span>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder={`I'm interested in ${property.name}`}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}