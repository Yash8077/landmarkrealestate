// src/components/FeaturedPropertiesCarousel.tsx
import * as React from "react"
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Property } from "@/lib/property"  
const fetchFeaturedProperties = async (): Promise<Property[]> => {
  const response = await fetch('/api/featured');
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

export default function FeaturedPropertiesCarousel() {
  const [featuredProperties, setFeaturedProperties] = React.useState<Property[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Fetch the properties when the component mounts
  React.useEffect(() => {
    fetchFeaturedProperties()
      .then(data => {
        setFeaturedProperties(data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  // Function to handle errors and provide fallback content
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.svg?height=300&width=400'
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Featured Properties</h2>
        {/* 
          Carousel size adjustment
          To modify the carousel size, adjust the max-width and height values below.
          Current settings: max-width-2xl (42rem) for width, h-[28rem] for height
        */}
        <Carousel
          className="w-full max-w-2xl mx-auto h-[28rem]"
          plugins={[Autoplay({ delay: 3000 })]}
        >
          <CarouselContent>
            {featuredProperties.map((property) => (
              <CarouselItem key={property._id} className="h-full">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">{property.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="relative w-full h-48 mb-4">
                      <Image 
                        src={property.images[0]} 
                        alt={property.name} 
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md" 
                        onError={handleImageError}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{property.type}</p>
                    <p className="mt-1 text-lg font-bold">₹{property.price.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-500">{property.beds} beds • {property.baths} baths • {property.area} sqft</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/properties/${property._id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          {!isMobile && (
            <><CarouselPrevious /><CarouselNext /></>
          )}
        </Carousel>
      </section>
    </div>
  )
}
