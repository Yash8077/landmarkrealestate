'use client'

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { Heart, GridIcon, List, LayoutGrid, Filter, Search, Bed, Bath, Calendar, X } from 'lucide-react'
import * as Slider from '@radix-ui/react-slider'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import properties from "@/data/properties.json"
import { useWishlist } from '@/context/store'
import { Property } from "@/lib/property"
function MapComponent() {
  return (
    <div className="flex-1 p-4">
      <div className="h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        <div className="relative h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27552.834786511452!2d78.01258259071226!3d30.319549607811247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c888af%3A0x4c3562c032518799!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1732223173155!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
        </div>
      </div>
    </div>
  )
}

export default function Properties() {
  const searchParams = useSearchParams()
  const [selectedTab, setSelectedTab] = useState(searchParams?.get('type') || "Buy")
  const [selectedType, setSelectedType] = useState(searchParams?.get('propertyType') || "All")
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams?.get('minPrice') || '10000'),
    parseInt(searchParams?.get('maxPrice') || '15000000')
  ])
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('query') || '')
  const [yearBuilt, setYearBuilt] = useState([1980, 2023])
  const [bedrooms, setBedrooms] = useState([1, 10])
  const [bathrooms, setBathrooms] = useState([1, 10])
  const [viewType, setViewType] = useState("list")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const filterAndSortProperties = useCallback(() => {
    let filtered = properties.properties.filter(property => 
      (selectedTab === 'Buy' ? property.listingType === 'Buy' : property.listingType === 'Rent') &&
      (selectedType === 'All' || property.type === selectedType) &&
      property.price >= priceRange[0] && property.price <= priceRange[1] &&
      property.yearBuilt >= yearBuilt[0] && property.yearBuilt <= yearBuilt[1] &&
      property.beds >= bedrooms[0] && property.beds <= bedrooms[1] &&
      property.baths >= bathrooms[0] && property.baths <= bathrooms[1] &&
      (searchQuery ? 
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.price.toString().includes(searchQuery) ||
        property.beds.toString().includes(searchQuery)
      : true)
    )

    switch (sortBy) {
      case "priceAsc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "priceDesc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => b.yearBuilt - a.yearBuilt)
        break
    }

    setFilteredProperties(filtered)
  }, [selectedTab, selectedType, priceRange, yearBuilt, bedrooms, bathrooms, searchQuery, sortBy])

  useEffect(() => {
    filterAndSortProperties()
  }, [filterAndSortProperties])

  useEffect(() => {
    setSelectedTab(searchParams?.get('type') || "Buy")
    setSelectedType(searchParams?.get('propertyType') || "All")
    setPriceRange([
      parseInt(searchParams?.get('minPrice') || '10000'),
      parseInt(searchParams?.get('maxPrice') || '15000000')
    ])
    setSearchQuery(searchParams?.get('query') || '')
    setBedrooms([parseInt(searchParams?.get('minBedrooms') || '1'), parseInt(searchParams?.get('maxBedrooms') || '10')])
    setBathrooms([parseInt(searchParams?.get('minBathrooms') || '1'), parseInt(searchParams?.get('maxBathrooms') || '10')])
  }, [searchParams])

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)
  }


  const handleYearBuiltChange = (value: number[]) => {
    setYearBuilt(value)
  }

  const handleBedroomsChange = (value: number[]) => {
    setBedrooms(value)
  }

  const handleBathroomsChange = (value: number[]) => {
    setBathrooms(value)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const propertyTypes = [
    { name: "All", icon: GridIcon },
    { name: "House", icon: Bed },
    { name: "Apartments", icon: Bed },
    { name: "Commercial", icon: Bed },
  ]

  const renderSidebarContent = () => (
    <aside className="p-4">
      <div className="flex space-x-1 mb-6">
        {["Buy", "Rent"].map((tab) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? "default" : "outline"}
            onClick={() => setSelectedTab(tab)}
            className="flex-1"
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <Label className="font-medium mb-3 flex items-center">
            <Bed className="mr-2 h-5 w-5" />
            Real estate type
          </Label>
          <RadioGroup value={selectedType} onValueChange={setSelectedType}>
            {propertyTypes.map((type) => (
              <div className="flex items-center space-x-2" key={type.name}>
                <RadioGroupItem value={type.name} id={type.name} />
                <Label htmlFor={type.name} className="flex items-center">
                  <type.icon className="mr-2 h-5 w-5 text-gray-500" />
                  {type.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label className="font-medium mb-3">Price range</Label>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            max={15000000}
            step={100000}
            minStepsBetweenThumbs={1}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" />
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" />
          </Slider.Root>
          <div className="flex justify-between mt-2">
            <span className="text-sm">₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span className="text-sm">₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div>
          <Label className="font-medium mb-3 flex items-center">
            <Bed className="mr-2 h-5 w-5" />
            Number of bedrooms
          </Label>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={bedrooms}
            onValueChange={handleBedroomsChange}
            min={1}
            max={10}
            step={1}
            minStepsBetweenThumbs={1}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" />
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" />
          </Slider.Root>
          <div className="flex justify-between mt-2">
            <span className="text-sm">{bedrooms[0]} bed</span>
            <span className="text-sm">{bedrooms[1]} beds</span>
          </div>
        </div>

        <div>
          <Label className="font-medium mb-3 flex items-center">
            <Bath className="mr-2 h-5 w-5" />
            Number of bathrooms
          </Label>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={bathrooms}
            onValueChange={handleBathroomsChange}
            min={1}
            max={10}
            step={1}
            minStepsBetweenThumbs={1}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" />
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" />
          </Slider.Root>
          <div className="flex justify-between mt-2">
            <span className="text-sm">{bathrooms[0]} bath</span>
            <span className="text-sm">{bathrooms[1]} baths</span>
          </div>
        </div>

        <div>
          <Label className="font-medium mb-3 flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Year built
          </Label>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={yearBuilt}
            onValueChange={handleYearBuiltChange}
            min={1980}
            max={2023}
            step={1}
            minStepsBetweenThumbs={1}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" />
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" />
          </Slider.Root>
          <div className="flex justify-between mt-2">
            <span className="text-sm">{yearBuilt[0]}</span>
            <span className="text-sm">{yearBuilt[1]}</span>
          </div>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="flex relative">
        <div className={`
          hidden md:block fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:sticky md:top-0 md:h-screen scrollbar-hide
        `}>
          {renderSidebarContent()}
        </div>

        <div className="flex-1">
          <MapComponent />
          <div className="p-4">
            <div className="flex flex-col space-y-4 mb-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="relative w-full md:w-auto md:flex-grow md:mr-4">
                <Input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex items-center justify-between w-full md:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                    <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2 ml-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden"
                    onClick={toggleSidebar}
                    aria-label="Toggle filters"
                  >
                    <Filter className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={viewType === 'list' ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewType('list')}
                    aria-label="List view"
                  >
                    <List className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={viewType === 'grid' ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewType('grid')}
                    aria-label="Grid view"
                  >
                    <GridIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={viewType === 'box' ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewType('box')}
                    aria-label="Box view"
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className={`
              ${viewType === 'list' ? 'space-y-4' : ''}
              ${viewType === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : ''}
              ${viewType === 'box' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : ''}
            `}>
              {filteredProperties.map((property) => (
                <Link href={`/properties/${property.id}`} key={property.id} className={`
                  ${viewType === 'list' ? 'flex space-x-4' : ''}
                  ${viewType === 'grid' ? 'group relative' : ''}
                  ${viewType === 'box' ? 'group relative' : ''}
                  cursor-pointer
                `}>
                  <div className={`
                    ${viewType === 'list' ? 'w-48 h-36' : ''}
                    ${viewType === 'grid' ? 'h-48' : ''}
                    ${viewType === 'box' ? 'h-64'    : ''}
                    relative overflow-hidden rounded-lg
                  `}>
                    <Image
                      src={property.images[0]}
                      alt={property.name}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                      fill
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className={`absolute right-2 top-2 rounded-full bg-white/80 hover:bg-white ${
                        isInWishlist(property.id) ? 'text-red-500' : 'text-gray-900'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        if (isInWishlist(property.id)) {
                          removeFromWishlist(property.id)
                        } else {
                          addToWishlist(property.id)
                        }
                      }}
                      aria-label={isInWishlist(property.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className="h-5 w-5" fill={isInWishlist(property.id) ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  <div className={`
                    ${viewType === 'list' ? 'flex-1' : ''}
                    ${viewType === 'grid' ? 'mt-4' : ''}
                    ${viewType === 'box' ? 'absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4' : ''}
                  `}>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">₹{property.price.toLocaleString('en-IN')}</span>
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{property.name}</h3>
                    <p className="text-sm text-gray-600">{property.address.city}, {property.address.state}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {property.beds} beds • {property.baths} baths • {property.area} m² area • Built in {property.yearBuilt}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b mt-16">
              <h2 className="text-2xl font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Close filters">
                <X className="h-6 w-6" />
              </Button>
            </div>
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </div>
  )
}

