const multer = require('multer');
const path= require('path');

const upload = multer({ 
    storage: multer.memoryStorage(), // Store in memory to then upload to Google Cloud Storage
    limits: {
        fileSize: 10 * 1024 * 1024, // Max file size (10MB)
    },
 });

module.exports = upload;
