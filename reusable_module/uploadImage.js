const {bucket,bucketName}=require('./cloudStorage');
const path = require('path');
const uploadImage = async ( imageBuffer, imageName) => {
    const remoteFileName = `images/${Date.now()}${path.extname(imageName)}`;
    const file = bucket.file(remoteFileName);
    await file.save(imageBuffer);

    // Generate CDN URL for the uploaded image
    imageUrl = `https://storage.googleapis.com/${bucketName}/${remoteFileName}`;
    return imageUrl;
}
module.exports = uploadImage;