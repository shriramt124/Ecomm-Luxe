import multer from 'multer';

// Configure Multer for multiple file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage }).array('images', 10); // Accept up to 10 files

export default upload;
