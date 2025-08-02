import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const BUCKET = process.env.S3_BUCKET;

export async function listObjects() {
  const res = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
  return res.Contents.map(obj => obj.Key);
}

export function uploadObject(key, body) {
  return s3.putObject({ Bucket: BUCKET, Key: key, Body: body }).promise();
}

export function deleteObject(key) {
  return s3.deleteObject({ Bucket: BUCKET, Key: key }).promise();
}

export function getObjectStream(key) {
  return s3.getObject({ Bucket: BUCKET, Key: key }).createReadStream();
}
