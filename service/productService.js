import Product from '@/model/product.model';
// import { cloudinaryUpload } from '@/lib/cloudinary'; // For image handling if needed
import connectDb from '@/lib/dbConnect';
 
/**
 * Create a new product
 * @param {Object} productData - Product details (name, description, price, etc.)
 * @returns {Object} - The created product
 */
export const createProduct = async (productData) => {
    try {
        await connectDb();

        // Debugging
       // console.log("Product Data Received:", productData);

        const product = new Product(productData);

        await product.save();

       // console.log("Product Saved:", product);

        return product;
    } catch (error) {
        console.error("Error creating product:", error);
        throw new Error('Error creating product: ' + error.message);
    }
};


/**
 * Get all products
 * @param {Object} filters - Optional filters for querying products (e.g., category, price range)
 * @returns {Array} - List of products
 */
export const getAllProducts = async ({ skip = 0, limit = 20, ...filters } = {}) => {
    console.log('database is called')
    try {
        await connectDb();

        // Fetch the products with pagination and filters
        const products = await Product.find(filters)
            .skip(skip)         // Skip the products based on pagination
            .limit(limit);      // Limit the number of products per page

        return products;
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
};

/**
 * Get a product by ID
 * @param {String} id - Product ID
 * @returns {Object} - The found product
 */
export const getProductById = async (id) => {
    
   
    try {
        await connectDb();
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error fetching product: ' + error.message);
    }
};

/**
 * Update a product by ID
 * @param {String} id - Product ID
 * @param {Object} updateData - Data to update the product with
 * @returns {Object} - The updated product
 */
export const updateProductById = async (id, updateData) => {
    try {
        const product = await Product.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
        });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

/**
 * Delete a product by ID
 * @param {String} id - Product ID
 * @returns {Object} - The deleted product
 */
export const deleteProductById = async (id) => {
    try {
        await connectDb()
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Upload a product image to Cloudinary
 * @param {Buffer} image - Image file buffer
 * @returns {String} - The URL of the uploaded image
 */
 