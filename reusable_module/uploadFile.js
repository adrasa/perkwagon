const {bucket,bucketName}=require('./cloudStorage');
const path = require('path');
const uploadFile = async ( fileBuffer, fileName) => {
   
    const remoteFileName = `images/${Date.now()}${path.extname(fileName)}`;
    const file = bucket.file(remoteFileName);
    await file.save(fileBuffer);

    // Generate CDN URL for the uploaded image
    fileUrl = `https://storage.googleapis.com/${bucketName}/${remoteFileName}`;
    return imageUrl;
}
module.exports = uploadFile;