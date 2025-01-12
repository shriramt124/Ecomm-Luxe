import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET // Your Cloudinary API secret
});

export const uploadImage = async (base64String) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            `data:image/jpeg;base64,${base64String}`, // Prefix with `data:image/...`
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
    });
};
const getPublicIdFromUrl = (imageUrl) => {
    const parts = imageUrl.split('/');
    const filename = parts.pop(); // Get the last part (e.g., "filename.png")
    const publicId = filename.split('.')[0]; // Remove the file extension
    return parts.join('/') + '/' + publicId; // Rebuild path without extension
};

export const deleteImageFromCloudinary = async (imageUrl) => {
    try {
        // Extract the public ID from the URL
        const publicId = imageUrl.split('/').slice(7).join('/').split('.')[0]; // Get the public ID without extension
        console.log(`Public ID for deletion: ${publicId}`);

        // Use Cloudinary's API to delete the image
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result === 'ok') {
            console.log('Image deleted successfully');
        } else {
            console.error('Failed to delete image:', result);
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
    }
};



