const { Storage } = require('@google-cloud/storage');
const path = require('path');
const storage = new Storage({
    projectId: 'perkwagon',
    keyFilename: '/etc/secrets/credentials.json',
    //keyFilename: path.join(__dirname,'../config/credentials.json'),
});

const bucketName = 'perkwagon';
const bucket = storage.bucket(bucketName);
module.exports = { bucket, bucketName };