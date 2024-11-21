'use client'

import { useState, useCallback, memo } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Home, Users, Clock } from 'lucide-react'

// Lazy load the Google Maps iframe
const GoogleMap = dynamic(() => import('../components/GoogleMap'), { ssr: false })

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
    alert('Thank you for your message. We will get back to you soon!')
  }, [formData])

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{backgroundImage: 'url("/assets/contact.jpg?height=1080&width=1920")'}}>
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
                      {[
                        { id: 'name', label: 'Name', type: 'text' },
                        { id: 'email', label: 'Email', type: 'email' },
                      ].map(({ id, label, type }) => (
                        <div key={id}>
                          <label htmlFor={id} className="block text-sm font-medium text-white">{label}</label>
                          <Input
                            type={type}
                            id={id}
                            name={id}
                            value={formData[id as keyof typeof formData]}
                            onChange={handleChange}
                            required
                            className="mt-1 bg-white bg-opacity-20 text-white placeholder-gray-300"
                          />
                        </div>
                      ))}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="mt-1 bg-white bg-opacity-20 text-white placeholder-gray-300"
                        />
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

