import { create } from 'zustand';
import { Property, PropertyState } from '@/lib/property';

const PropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  fetched: false,
  fetchProperties: async () => {
    if (!get().fetched){
      try {
        const response = await fetch('/api/listing');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data: Property[] = await response.json(); 
        set({ properties: data, fetched: true }); // Update the state with fetched data and set fetched to true
        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }  
    else{
      return [];
    }
  },
setProperties: (data: Property[]) => {
    set({properties:data});
  },
  getPropertyById: (id: string) => {
    const property = get().properties.find((property) => property._id === id);
    if (!property) {
      throw new Error(`Property with id ${id} not found`);
    }
    return property;
  },
}));

export default PropertyStore;
