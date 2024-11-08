'use client'
import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Rachel Hadid",
    image: "/placeholder.svg?height=80&width=80",
    quote: "Choosing this real estate service was the best decision I ever made. Their team demonstrated exceptional professionalism and expertise. I highly recommend their services to anyone!",
    rating: 5
  },
  {
    name: "Louis Padrige",
    image: "/placeholder.svg?height=80&width=80",
    quote: "Their expert negotiation skills helped me sell my property at a great price in no time. I would definitely work with them again.",
    rating: 5
  },
  {
    name: "Anastasia Baldwin",
    image: "/placeholder.svg?height=80&width=80",
    quote: "They patiently answered all our questions, provided valuable insights, and helped us secure our dream home within our budget.",
    rating: 5
  },
  {
    name: "Harry Jenda",
    image: "/placeholder.svg?height=80&width=80",
    quote: "They presented us with a stunning selection of homes that perfectly matched our preferences. The team's attention to detail and in-depth knowledge of the local market truly impressed us!",
    rating: 5
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length)
    }, 5000) // Change testimonials every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gray-50 overflow-hidden px-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2">Don&rsquo;t Trust Us, Trust Their Voice</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover heartfelt accounts of joy and fulfillment as our valued clients embark on 
          the quest for their dream homes and prime investments
        </p>
        <div className="relative">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full md:w-1/2 flex-shrink-0 px-4">
                <div className="bg-white p-6 rounded-lg shadow-md relative h-full">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                  <div className="absolute bottom-4 right-4 text-gray-300 text-6xl font-serif"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {[0, 2].map((index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}