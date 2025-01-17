import { revalidatePath } from 'next/cache'
import connectDb from '@/lib/mongodb' 
import Property from '@/models/Property'

export async function submitProperty(formData: FormData) {
  try {
    await connectDb()

    const propertyData = {
      name: formData.get('name'),
      price: Number(formData.get('price')),
      beds: Number(formData.get('beds')),
      baths: Number(formData.get('baths')),
      area: Number(formData.get('area')),
      lotSize: Number(formData.get('lotSize')),
      yearBuilt: Number(formData.get('yearBuilt')),
      type: formData.get('type'),
      images: formData.getAll('images'),
      address: {
        street: formData.get('address.street'),
        city: formData.get('address.city'),
        state: formData.get('address.state'),
        country: formData.get('address.country'),
        zipCode: formData.get('address.zipCode'),
      },
      listingType: formData.get('listingType'),
      description: formData.get('description'),
      features: formData.getAll('features'),
      userRole: formData.get('userType'),
      phoneNumber: formData.get('ownerPhone'),
      email: formData.get('ownerEmail'),
      rating: 0,  // Default value, as it's not in the form
      reviews: 0,  // Default value, as it's not in the form
    }

    const newProperty = new Property(propertyData)
    await newProperty.save()

    revalidatePath('/properties')
    return { success: true, message: 'Property submitted successfully' }
  } catch (error) {
    console.error('Error submitting property:', error)
    return { success: false, message: 'Error submitting property' }
  }
}

