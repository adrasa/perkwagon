const {bucket, bucketName}=require('./cloudStorage');
const path = require('path');
const removeFile = async (fileURL) => {
    let fileName = fileURL.split('/').pop();
    fileName = `images/${fileName}`;
    const file = bucket.file(fileName);
    await file.delete();
}   
module.exports = removeFile;