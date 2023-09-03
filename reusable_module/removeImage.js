const {bucket, bucketName}=require('./cloudStorage');
const path = require('path');
const removeImage = async (imageURL) => {
    const fileName = imageURL.split('/').pop();
    const file = bucket.file(fileName);
    await file.delete();
}   
module.exports = removeImage;