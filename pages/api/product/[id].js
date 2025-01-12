 
import { getProductById, updateProductById, deleteProductById } from '@/service/productService';
import formidable from 'formidable';
import { deleteImageFromCloudinary, uploadImage } from '@/lib/cloudinary';
import fs from 'fs'
export const config = {
    api: {
        bodyParser: false, // Disabling default body parser for handling file uploads
    },
};

export default async function handler(req, res) {
    console.log("id function is running")

    const { id } = req.query; // Product ID from the URL
    console.log(id, "id from the query")
    // Handle GET for a specific product
    if (req.method === 'GET') {
        try {
            const product = await getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json({ message: 'Product fetched successfully', product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    // Handle PUT to update a specific product
    else if (req.method === 'PUT') {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error parsing form data' });
            }

            try {
                const product = await getProductById(id);
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                let { name, description, price, category, stock } = fields;
                name = name[0];
                description = description[0];
                price = price[0];
                category = category[0];
                stock = stock[0];

                // Handle file uploads (if any)
                const fileArray = Array.isArray(files.images) ? files.images : [files.images];
                const uploadPromises = files.images.map(async (file) => {
                    const fileData = fs.readFileSync(file.filepath);
                    const base64String = Buffer.from(fileData).toString('base64');
                    return uploadImage(base64String);
                });

                const uploadedImages = await Promise.all(uploadPromises);
                const newImageUrls = uploadedImages.map((image) => image.secure_url);

                // Combine the new images with the existing ones, limiting to 3 images
                const updatedImages = [...newImageUrls, ...product.images].slice(0, 3);

                // Delete any unused images from Cloudinary
                const unusedImages = product.images.filter((image) => !updatedImages.includes(image));
                const deletePromises = unusedImages.map(async (imageUrl) => {
                    return await deleteImageFromCloudinary(imageUrl);
                });
                await Promise.all(deletePromises);

                // Prepare the updated product data
                const updatedData = {
                    name: name || product.name,
                    description: description || product.description,
                    price: price || product.price,
                    category: category || product.category,
                    stock: stock || product.stock,
                    images: updatedImages,
                };

                // Update the product in the database
                const updatedProduct = await updateProductById(id, updatedData);
                return res.status(200).json({ message: 'Product updated successfully', updatedProduct });
            } catch (error) {
                console.error('Error updating product:', error);
                return res.status(500).json({ message: error.message });
            }
        });
    }

    // Handle DELETE for a specific product
    else if (req.method === 'DELETE') {
        try {
            const deletedProduct = await deleteProductById(id);
            return res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    // Return 405 if method is not allowed
    else {
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
