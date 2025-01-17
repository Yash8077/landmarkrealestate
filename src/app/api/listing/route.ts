import { NextResponse } from 'next/server';
import connectDb from '@/lib/mongodb';  // Adjust path if needed
import Property from '@/models/Property';  // Adjust path if needed

export async function GET() {
  try {
    await connectDb();
    // Fetch properties from MongoDB, limiting to the first 4 (adjust as necessary)
    const properties = await Property.find({});

    return NextResponse.json(properties);  // Return the properties as a JSON response
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ message: 'Error fetching properties' }, { status: 500 });
  }
}