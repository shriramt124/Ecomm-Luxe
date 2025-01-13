import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { toast } from 'react-toastify';
import Modal from './Modal';

const ProductModal = ({ isOpen, onClose, onSubmit, initialData = null,fetchProducts }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setProductData(initialData);
    } else {
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: []
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!productData.name.trim()) newErrors.name = 'Name is required';
    if (!productData.description.trim()) newErrors.description = 'Description is required';
    if (!productData.price || isNaN(productData.price)) newErrors.price = 'Valid price is required';
    if (!productData.category.trim()) newErrors.category = 'Category is required';
    if (!productData.stock || isNaN(productData.stock)) newErrors.stock = 'Valid stock quantity is required';
    if (!initialData && productData.images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit(productData);
      await fetchProducts()
      
      toast.success(`Product ${initialData ? 'updated' : 'created'} successfully`);
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({ ...productData, images: files });
    setErrors({ ...errors, images: null });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Product' : 'Add New Product'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) => {
                setProductData({ ...productData, name: e.target.value });
                setErrors({ ...errors, name: null });
              }}
              className={`mt-1 block w-full rounded-md border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={productData.description}
              onChange={(e) => {
                setProductData({ ...productData, description: e.target.value });
                setErrors({ ...errors, description: null });
              }}
              className={`mt-1 block w-full rounded-md border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
              rows="3"
              required
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={productData.price}
              onChange={(e) => {
                setProductData({ ...productData, price: e.target.value });
                setErrors({ ...errors, price: null });
              }}
              className={`mt-1 block w-full rounded-md border ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
              required
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={productData.stock}
              onChange={(e) => {
                setProductData({ ...productData, stock: e.target.value });
                setErrors({ ...errors, stock: null });
              }}
              className={`mt-1 block w-full rounded-md border ${
                errors.stock ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
              required
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={productData.category}
              onChange={(e) => {
                setProductData({ ...productData, category: e.target.value });
                setErrors({ ...errors, category: null });
              }}
              className={`mt-1 block w-full rounded-md border ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
              required
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${
                errors.images ? 'file:bg-red-50 file:text-red-700' : 'file:bg-purple-50 file:text-purple-700'
              } hover:file:bg-purple-100`}
            />
            {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            disabled={isLoading}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {initialData ? 'Updating...' : 'Creating...'}
              </div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {initialData ? 'Update' : 'Save'} Product
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
