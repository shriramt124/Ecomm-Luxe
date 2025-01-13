import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ 
      user: {
        _id: decoded.userId,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role
      }
    });
  } catch (error) {
    return res.status(200).json({ user: null });
  }
}
