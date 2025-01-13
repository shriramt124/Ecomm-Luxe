import multer from 'multer';
import connectDb from '@/lib/dbConnect';
import { deleteImageFromCloudinary, uploadImage } from '@/lib/cloudinary';
import fs from 'fs';
import formidable from 'formidable';
import { createProduct, getProductById, getAllProducts, updateProductById, deleteProductById } from '@/service/productService';
import Product from '@/model/product.model';
// Multer setup to handle file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const config = {
    api: {
        bodyParser: false, // Disabling Next.js default body parser to use Multer
    },
};

// Helper function for Multer middleware
const uploadMiddleware = (req) =>
    new Promise((resolve, reject) => {
        const multerHandler = upload.array('images'); // 'images' is the name of the file field
        multerHandler(req, {}, (err) => {
            if (err) reject(err);
            else resolve(req);
        });
    });

// Main handler function for product operations
export default async function handler(req, res) {
    await connectDb();

    if (req.method === 'POST') {
        console.log(req.files)
        // Use formidable to parse the incoming request for file upload
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error parsing form data' });
            }

            try {
                //console.log(files, "files from formidable")
                let { name, description, price, category, stock } = fields;
                // console.log(name[0], description[0], price[0], category[0], stock[0])
                name = name[0];
                description = description[0];
                price = price[0];
                category = category[0];
                stock = stock[0];
                // Validate required fields
                if (!name || !description || !price || !category || !stock || !files.images) {
                    return res.status(400).json({ message: 'All fields are required', status: false });
                }

                // Handle file uploads
                const fileArray = Array.isArray(files.images) ? files.images : [files.images];
                const uploadPromises = fileArray.map(async (file) => {
                    const fileData = fs.readFileSync(file.filepath);
                    const base64String = Buffer.from(fileData).toString('base64');
                    return uploadImage(base64String);
                });

                const uploadedImages = await Promise.all(uploadPromises);

                // Extract URLs from uploaded images
                const imageUrls = uploadedImages.map((image) => image.secure_url);

                // Create the product in the database
                const product = await createProduct({
                    name,
                    description,
                    price,
                    category,
                    stock,
                    images: imageUrls,
                });

                return res.status(200).json({ message: 'Product created successfully', product });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }
        });

    } else if (req.method === 'GET') {
        await connectDb();
        try {
            const {
                page = 1,
                limit = 6,
                search = '',
                minPrice = 0,
                maxPrice = Number.MAX_SAFE_INTEGER,
                categories = '',
            } = req.query;

            // Convert pagination parameters to numbers
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
            const skip = (pageNumber - 1) * limitNumber;

            // Build the filter query
            const filterQuery = {};

            // Price filtering
            filterQuery.price = {
                $gte: parseFloat(minPrice),
                $lte: parseFloat(maxPrice),
            };

            // Search by name or description
            if (search) {
                filterQuery.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ];
            }

            // Category filtering
            if (categories) {
                const categoryArray = categories.split(',').filter(Boolean);
                if (categoryArray.length > 0) {
                    filterQuery.category = { $in: categoryArray };
                }
            }

            // Execute the query with pagination
            const [products, total] = await Promise.all([
                Product.find(filterQuery)
                    .skip(skip)
                    .limit(limitNumber)
                    .sort({ createdAt: -1 }) // Optional: sort by creation date
                    .lean(),
                Product.countDocuments(filterQuery),
            ]);

            const totalPages = Math.ceil(total / limitNumber);
            const hasNextPage = pageNumber < totalPages;
            const hasPrevPage = pageNumber > 1;

            return res.status(200).json({
                message: 'Products retrieved successfully',
                products,
                pagination: {
                    total,
                    page: pageNumber,
                    limit: limitNumber,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                },
            });
        } catch (error) {
            console.error('Product API Error:', error);
            return res.status(500).json({
                message: 'Error retrieving products',
                error: error.message,
            });
        }
    }



}