const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid');
// const path = require('path');

const {S3_BUCKET_REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, S3_BUCKET_NAME} = require('../сonfigs/config');

const s3Bucket = new S3({
  region: S3_BUCKET_REGION,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY
});

const uploadPublicFile = (file = {}, itemType='', itemId='') => {
  const fileName = generateFileName(file.name,itemType,itemId);
    
  return s3Bucket
    .upload({
      ContentType: file.mimetype,
      ACL: 'public-read',
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: file.data,
    })
    .promise();
};

function generateFileName(fileName = '', itemType, itemId) {
  const extension = fileName.split('.').pop(); // image.jpg => jpg
  // const s = path.extname(fileName); // image.jpg => .jpg

    return `${itemType}/${itemId}/${uuid.v1()}.${extension}`;

};

module.exports = {
  uploadPublicFile,
};
