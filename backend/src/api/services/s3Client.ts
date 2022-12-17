import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const accessKeyId = process.env.S3_ACCESS_KEY!;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY!;
const region = process.env.BUCKET_REGION!;
const bucketName = process.env.BUCKET_NAME!;

class S3 {
  private s3: S3Client;
  private bucketName: string;

  constructor(
    accessKeyId: string,
    secretAccessKey: string,
    region: string,
    bucketName: string
  ) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
    this.bucketName = bucketName;
  }

  public async storeImageInBucket(
    image_id: string,
    image_buffer: Buffer,
    ContentType: string
  ): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: image_id,
      Body: image_buffer,
      ContentType: ContentType,
    };
    // get function to upload to s3
    const command = new PutObjectCommand(params);
    await this.s3.send(command);
  }

  public async generateImageUrlFromBucket(
    image_id: string,
    expiry_time: number = 3600
  ): Promise<string> {
    const getObjectParams = {
      Bucket: this.bucketName,
      Key: image_id,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(this.s3, command, {
      expiresIn: expiry_time,
    });
    return url;
  }
}

const s3 = new S3(accessKeyId, secretAccessKey, region, bucketName);
console.log(`S3 client instance instantiated`);

export default s3;
