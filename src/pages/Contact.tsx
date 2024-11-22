'use client'

import { useCallback, memo } from 'react'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Home, Users, Clock } from 'lucide-react'

// Lazy load the Google Maps iframe
const GoogleMap = dynamic(() => import('@/components/GoogleMap'), { ssr: false })

// Memoize the ContactInfo component
const ContactInfo = memo(() => (
  <Card className="h-full bg-white bg-opacity-20">
    <CardHeader>
      <CardTitle className="text-white">Contact Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {[
        { Icon: MapPin, title: 'Address', content: 'GMS Road, Dehradun ' },
        { Icon: Phone, title: 'Phone', content: '+91 9412053365' },
        { Icon: Mail, title: 'Email', content: 'contact@thelandmarkrealestate.com' },
        { Icon: Home, title: 'Real Estate Experts', content: 'Trusted by thousands of clients' },
        { Icon: Users, title: 'Personalized Service', content: 'Tailored to your needs' },
        { Icon: Clock, title: 'Available 24/7', content: 'Always here to assist you' },
      ].map(({ Icon, title, content }) => (
        <div key={title} className="flex items-center space-x-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Icon className="text-white h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-200">{content}</p>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
))

ContactInfo.displayName = 'ContactInfo'

export default function ContactUs() {
  const { register, formState: { errors } } = useForm()


  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url("/assets/contact.jpg?height=1080&width=1920")' }}>
      <div className="min-h-screen bg-black bg-opacity-50">
        <header className="pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-white text-center">Contact Us</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white bg-opacity-10 rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="h-full bg-white bg-opacity-20">
                  <CardHeader>
                    <CardTitle className="text-white">Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form action="https://formsubmit.co/ymishra502@gmail.com" method="POST" className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                        <Input
                          type="text"
                          id="name"
                          {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' } })}
                          className="mt-1 bg-white bg-opacity-20 text-white placeholder-gray-300"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message?.toString()}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <Input
                          type="email"
                          id="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Enter a valid email address' }
                          })}
                          className="mt-1 bg-white bg-opacity-20 text-white placeholder-gray-300"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message?.toString()}</p>}
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
                        <Textarea
                          id="message"
                          rows={4}
                          {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
                          className="mt-1 bg-white bg-opacity-20 text-white placeholder-gray-300"
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message?.toString()}</p>}
                      </div>
                      <Button type="submit" className="w-full bg-white text-black hover:bg-opacity-100">Send Message</Button>
                    </form>
                  </CardContent>
                </Card>
                <ContactInfo />
              </div>
              <Card className="w-full bg-white bg-opacity-20">
                <CardHeader>
                  <CardTitle className="text-white">Our Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-w-16 aspect-h-9 w-full h-[400px]">
                    <GoogleMap />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
