interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }
  
  export interface Property {
    _id:string;
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
    listingType: string;
    description: string;
    features: string[];
    rating: number;
    reviews: number;
    userRole: {
      type: String,
      enum: ['owner', 'broker'],
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    };
    email: {
      type: String,
      required: true
    };
    createdAt: {
      type: Date,
      default: Date
    };
    updatedAt: {
      type: Date,
      default: Date
    }
  }

 export interface PropertyState {
    properties: Property[];
    fetched: boolean; // The array of properties
    fetchProperties: () => Promise<Property[]|undefined>; // Function to fetch properties
    setProperties: (data: Property[]|undefined) => void;
    getPropertyById: (id: string) => Property | undefined; // Function to get a property by its ID
  }