const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.memoryStorage(), // Store in memory to then upload to Google Cloud Storage
});

module.exports = upload;
