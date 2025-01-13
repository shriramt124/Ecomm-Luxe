import connectDb from '../../../lib/dbConnect';
import User from '../../../model/user.model';

export default async function handler(req, res) {
  await connectDb();

  if (req.method === 'GET') {
    try {
      const users = await User.find({}, { password: 0 });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch users' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { userId } = req.body;
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete user' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
