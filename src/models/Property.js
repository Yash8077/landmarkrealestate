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
  listingType: String,
  description: String,
  features: [String],
  rating: Number,
  reviews: Number,
  // New fields
  userRole: {
    type: String,
    enum: ['owner', 'broker'],
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Property || mongoose.model('Property', propertySchema);

