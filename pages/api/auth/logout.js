export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Clear the token cookie
    res.setHeader(
      'Set-Cookie',
      `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
    );
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
