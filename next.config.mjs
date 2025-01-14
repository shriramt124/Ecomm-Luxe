/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'cdn.pixabay.com','picsum.photos'],
  }
  
};

export default nextConfig;
