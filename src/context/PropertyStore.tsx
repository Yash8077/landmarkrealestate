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
        return data;
        // set({ properties: data, fetched: true }); // Update the state with fetched data and set fetched to true
      } catch (error) {
        console.error(error);
      }
    }  
    else{
      return;
    }
  },
setProperties: (data: Property[]|undefined) => {
    set({properties:data});
  },
  getPropertyById: (id: string) => {
    return get().properties.find((property) => property._id === id);
  },
}));

export default PropertyStore;
