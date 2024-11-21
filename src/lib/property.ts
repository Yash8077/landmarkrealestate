interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }
  
  export interface Property {
    id: number;
    name: string;
    price: number;
    beds: number;
    baths: number;
    area: number;
    lotSize: number;
    yearBuilt: number;
    type: string;
    images: string[];
    address: Address;
    latitude: number;
    longitude: number;
    listingType: string;
    description: string;
    features: string[];
    rating: number;
    reviews: number;
  }