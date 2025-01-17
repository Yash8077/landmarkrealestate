import connectDb from '@/lib/mongodb';
import Property from '@/models/Property';

export default async function handler(req, res) {
  await connectDb();

  if (req.method === 'GET') {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching properties' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
