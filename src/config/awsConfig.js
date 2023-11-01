import AWS from 'aws-sdk';

const {
  REACT_APP_BUCKET_NAME,
  REACT_APP_AWS_ACCESS_KEY_ID,
  REACT_APP_AWS_SECRET_ACCESS_KEY,
  REACT_APP_AWS_REGION
} = process.env;

AWS.config.update({
  accessKeyId: REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: REACT_APP_AWS_REGION,
});

export const S3_BUCKET = REACT_APP_BUCKET_NAME;

export const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REACT_APP_AWS_REGION,
  multipartUploadThreshold: 50 * 1024 * 1024, // 50MB
  httpOptions: {
    timeout: 600000, // 10 minutes
  },
});

