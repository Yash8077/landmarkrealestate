import PropertyForm  from '@/pages/SellProperty'
import { Building2, Users, BadgeCheck, Trophy } from 'lucide-react'

const stats = [
  {
    icon: Building2,
    value: '50K+',
    label: 'Properties Listed'
  },
  {
    icon: Users,
    value: '100K+',
    label: 'Active Users'
  },
  {
    icon: BadgeCheck,
    value: '99%',
    label: 'Verified Listings'
  },
  {
    icon: Trophy,
    value: '#1',
    label: 'Property Platform'
  }
]

export default function PostPropertyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto px-12 py-12">
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            List Your Property With Confidence
          </h1>
          <p className="text-gray-600 text-lg">
            Join thousands of property owners who trust us with their listings
          </p>
        </div>

        <div className="grid lg:grid-cols-[400px,1fr] gap-12 items-start">
          <div className="space-y-8">


            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
              <h2 className="text-2xl font-semibold text-gray-900">Why List With Us?</h2>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-blue-50/50">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-900">Verified Listings</h3>
                    <p className="text-sm text-blue-700">All properties are verified by our team</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-900">Wide Reach</h3>
                    <p className="text-sm text-blue-700">Connect with millions of potential buyers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-900">20+ Years of Experience</h3>
                    <p className="text-sm text-blue-700">A name you can trust.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <PropertyForm />
          </div>
        </div>
      </div>
    </div>
  )
}

