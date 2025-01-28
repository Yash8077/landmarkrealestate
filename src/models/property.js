import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
});

const propertySchema = new mongoose.Schema({
  name: String,
  price: Number,
  beds: Number,
  baths: Number,
  area: Number,
  lotSize: Number,
  yearBuilt: Number,
  type: String,
  images: [String],
  address: addressSchema,
  latitude: Number,
  longitude: Number,
  listingType: String,
  description: String,
  features: [String],
  rating: Number,
  reviews: Number,
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export default Property;
