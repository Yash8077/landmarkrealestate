'use client'

import { Heart, MapPin, Grid as GridIcon, List, LayoutGrid, Menu, X, Home, Building2, Building, Warehouse, TreePine, Hotel, Store, Filter, Search, Bed, Bath, Ruler, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback,Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import * as Slider from '@radix-ui/react-slider'
import properties from "../data/properties.json"

export default function PropertyListings() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <PropertyListingsContent />
      </Suspense>
  );
}
export function PropertyListingsContent() {
  const searchParams = useSearchParams()
  const [selectedTab, setSelectedTab] = useState(searchParams.get('type') || "Buy")
  const [selectedType, setSelectedType] = useState(searchParams.get('propertyType') || "All")
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice') || '1'),
    parseInt(searchParams.get('maxPrice') || '150000000')
  ])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '')
  const [floorArea, setFloorArea] = useState({ min: 20, max: 710 })
  const [yearBuilt, setYearBuilt] = useState([1980, 2023])
  const [bedrooms, setBedrooms] = useState([1, 10])
  const [bathrooms, setBathrooms] = useState([1, 10])
  const [viewType, setViewType] = useState("list")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredProperties, setFilteredProperties] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filterAndSortProperties = useCallback(() => {
    let filtered = properties.properties.filter(property => 
      (selectedTab === 'Buy' ? property.listingType === 'Buy' : property.listingType === 'Rent') &&
      (selectedType === 'All' || property.type === selectedType) &&
      property.price >= priceRange[0] && property.price <= priceRange[1] &&
      property.area >= floorArea.min && property.area <= floorArea.max &&
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
  }, [selectedTab, selectedType, priceRange, floorArea, yearBuilt, bedrooms, bathrooms, searchQuery, sortBy])

  useEffect(() => {
    filterAndSortProperties()
  }, [filterAndSortProperties])

  useEffect(() => {
    setSelectedTab(searchParams.get('type') || "Buy")
    setSelectedType(searchParams.get('propertyType') || "All")
    setPriceRange([
      parseInt(searchParams.get('minPrice') || '0'),
      parseInt(searchParams.get('maxPrice') || '150000000')
    ])
    setSearchQuery(searchParams.get('query') || '')
    setBedrooms([parseInt(searchParams.get('minBedrooms') || '1'), parseInt(searchParams.get('maxBedrooms') || '10')])
    setBathrooms([parseInt(searchParams.get('minBathrooms') || '1'), parseInt(searchParams.get('maxBathrooms') || '10')])
  }, [searchParams])

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handleFloorAreaChange = (key, value) => {
    setFloorArea(prev => ({ ...prev, [key]: parseInt(value) }))
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
    { name: "All", icon: Building2 },
    { name: "House", icon: Home },
    { name: "Townhomes", icon: Building2 },
    { name: "Apartments", icon: Building },
    { name: "Commercial", icon: Store },
  ]

  return (
    <div className="min-h-screen bg-white mt-20">

      <div className="flex relative">
        <div className={`
          hidden md:block fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}>
          <div className="p-4">
            <div className="flex space-x-1 mb-6">
              {["Buy", "Rent"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded ${
                    selectedTab === tab
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Home className="mr-2 h-5 w-5" />
                  Real estate type
                </h3>
                <div className="space-y-2">
                  
                  {propertyTypes.map((type) => (
                    <label key={type.name} className="flex items-center">
                      <input
                        type="radio"
                        className="rounded border-gray-300"
                        checked={selectedType === type.name}
                        onChange={() => setSelectedType(type.name)}
                      />
                      <type.icon className="ml-2 h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm">{type.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Price range</h3>
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={150000000}
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
                <h3 className="font-medium mb-3 flex items-center">
                  <Ruler className="mr-2 h-5 w-5" />
                  Floor area
                </h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="w-full rounded border-gray-300 text-sm"
                    placeholder="20 m²"
                    value={floorArea.min}
                    onChange={(e) => handleFloorAreaChange('min', e.target.value)}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="text"
                    className="w-full rounded border-gray-300 text-sm"
                    placeholder="710 m²"
                    value={floorArea.max}
                    onChange={(e) => handleFloorAreaChange('max', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Bed className="mr-2 h-5 w-5" />
                  Number of bedrooms
                </h3>
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
                <h3 className="font-medium mb-3 flex items-center">
                  <Bath className="mr-2 h-5 w-5" />
                  Number of bathrooms
                </h3>
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
                <h3 className="font-medium mb-3 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Year built
                </h3>
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
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="h-64 bg-gray-100 rounded-lg mb-4">
            <div className="p-4">
              <div className="inline-flex items-center space-x-2 bg-white rounded-md shadow px-3 py-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{searchQuery || 'Dehradun, Uttarakhand'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-grow mr-4">
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              className="rounded border-gray-300 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Sort by: Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
            <div className="flex items-center space-x-2">
              <button
                className="md:hidden p-2 text-gray-500 hover:text-gray-900"
                onClick={toggleSidebar}
                aria-label="Toggle filters"
              >
                <Filter className="h-5 w-5" />
              </button>
              {/* {isSidebarOpen && (
                <div className="md:hidden px-2 py-1 bg-gray-200 rounded-full text-sm">
                  Filters applied
                </div>
              )} */}
              <button
                className={`p-2 ${viewType === 'list' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setViewType('list')}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
              <button
                className={`p-2 ${viewType === 'grid' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setViewType('grid')}
                aria-label="Grid view"
              >
                <GridIcon className="h-5 w-5" />
              </button>
              <button
                className={`p-2 ${viewType === 'box' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setViewType('box')}
                aria-label="Box view"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className={`
            ${viewType === 'list' ? 'space-y-4' : ''}
            ${viewType === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : ''}
            ${viewType === 'box' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : ''}
          `}>
            {filteredProperties.map((property) => (
              <Link href={`/listing/${property.id}`} key={property.id} className={`
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
                  <button 
                    className="absolute right-2 top-2 rounded-full bg-white p-2 text-gray-900 opacity-80 hover:opacity-100"
                    onClick={(e) => {
                      e.preventDefault()
                      // Add to favorites logic here
                    }}
                    aria-label="Add to favorites"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
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
                    {property.beds} beds • {property.baths} ba • {property.area} m² • Built in {property.yearBuilt}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white overflow-y-auto">
            <div className="flex justify-between mt-16 items-center p-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-900" aria-label="Close filters">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex space-x-1 mb-6">
                {["Buy", "Rent"].map((tab) => (
                  <button
                    key={tab}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded ${
                      selectedTab === tab
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    Real estate type
                  </h3>
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <label key={type.name} className="flex items-center">
                        <input
                          type="radio"
                          checked={selectedType === type.name}
                          onChange={() => setSelectedType(type.name)}
                        />
                        <type.icon className="ml-2 h-5 w-5 text-gray-500" />
                        <span className="ml-2 text-sm">{type.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Price range</h3>
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={150000000}
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
                  <h3 className="font-medium mb-3 flex items-center">
                    <Ruler className="mr-2 h-5 w-5" />
                    Floor area
                  </h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="w-full rounded border-gray-300 text-sm"
                      placeholder="20 m²"
                      value={floorArea.min}
                      onChange={(e) => handleFloorAreaChange('min', e.target.value)}
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="text"
                      className="w-full rounded border-gray-300 text-sm"
                      placeholder="710 m²"
                      value={floorArea.max}
                      onChange={(e) => handleFloorAreaChange('max', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Bed className="mr-2 h-5 w-5" />
                    Number of bedrooms
                  </h3>
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
                  <h3 className="font-medium mb-3 flex items-center">
                    <Bath className="mr-2 h-5 w-5" />
                    Number of bathrooms
                  </h3>
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
                  <h3 className="font-medium mb-3 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Year built
                  </h3>
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}