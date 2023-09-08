const {bucket, bucketName}=require('./cloudStorage');
const path = require('path');
const removeFile = async (fileURL) => {
    const fileName = fileURL.split('/').pop();
    const file = bucket.file(fileName);
    await file.delete();
}   
module.exports = removeFile;