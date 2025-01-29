// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useWishlist } from '@/context/store'
// import { Heart, MapPin, Bed, Bath, Ruler } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import properties from '@/data/properties.json'
// import { Property } from "@/lib/property"
// export default function WishlistPage() {
//   const { wishlist, removeFromWishlist } = useWishlist()
//   const [wishlistedProperties, setWishlistedProperties] = useState<Property[]>([])
//   useEffect(() => {
//     const filteredProperties = properties.properties.filter(property => 
//       wishlist && (wishlist.includes(property.id) || wishlist.includes(property.id.toString()))
//     )
//     setWishlistedProperties(filteredProperties)
//   }, [wishlist])

//   const handleRemoveFromWishlist = (propertyId: string | number) => {
//     removeFromWishlist(propertyId)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Your Wishlist</h1>
//         {wishlistedProperties.length === 0 ? (
//           <div className="text-center">
//             <p className="text-xl text-gray-600 mb-4">Your wishlist is empty.</p>
//             <Link href="/properties">
//               <Button>Browse Properties</Button>
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {wishlistedProperties.map((property) => (
//               <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader className="p-0">
//                   <div className="relative h-64">
//                     <Image
//                       src={property.images[0]}
//                       alt={property.name}
//                       layout="fill"
//                       objectFit="cover"
//                       className="transition-transform duration-300 hover:scale-110"
//                     />
//                     <Button
//                       variant="secondary"
//                       size="icon"
//                       className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
//                       onClick={() => handleRemoveFromWishlist(property.id)}
//                     >
//                       <Heart className="h-5 w-5" fill="currentColor" />
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <CardTitle className="text-xl font-semibold mb-2">{property.name}</CardTitle>
//                   <p className="text-gray-600 flex items-center mb-2">
//                     <MapPin className="h-4 w-4 mr-1" />
//                     {property.address.city}, {property.address.state}
//                   </p>
//                   <p className="text-2xl font-bold text-indigo-600 mb-4">
//                     ₹{property.price.toLocaleString('en-IN')}
//                   </p>
//                   <div className="flex justify-between text-sm text-gray-500">
//                     <span className="flex items-center">
//                       <Bed className="h-4 w-4 mr-1" />
//                       {property.beds} beds
//                     </span>
//                     <span className="flex items-center">
//                       <Bath className="h-4 w-4 mr-1" />
//                       {property.baths} baths
//                     </span>
//                     <span className="flex items-center">
//                       <Ruler className="h-4 w-4 mr-1" />
//                       {property.area} m²
//                     </span>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="bg-gray-50 p-4">
//                   <Link href={`/properties/${property.id}`} className="w-full">
//                     <Button className="w-full">View Details</Button>
//                   </Link>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
import React from 'react'

export default function WishlistPage() {
  return (
    <div>WishlistPage</div>
  )
}
