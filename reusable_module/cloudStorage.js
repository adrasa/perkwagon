const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    keyFilename: '../config/credentials.json',
});

const bucketName = 'perkwagon';
const bucket = storage.bucket(bucketName);

module.exports = {bucketName,bucket};