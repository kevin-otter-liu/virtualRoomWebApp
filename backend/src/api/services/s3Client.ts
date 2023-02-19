import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3ClientConfig,
  DeleteObjectCommand,
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

  public async storeFileInBucket(
    image_id: string,
    image_buffer: Buffer,
    ContentType: string,
    folder?: string
  ): Promise<void> {
    console.log(`${folder}/${image_id}`);
    const params = {
      Bucket: this.bucketName,
      Key: folder ? `${folder}/${image_id}` : image_id,
      Body: image_buffer,
      ContentType: ContentType,
    };
    // get function to upload to s3
    const command = new PutObjectCommand(params);
    await this.s3.send(command);
  }

  public async generateFileUrlFromBucket(
    image_id: string,
    expiry_time: number = 3600,
    folder?: string
  ): Promise<string> {
    const getObjectParams = {
      Bucket: this.bucketName,
      Key: folder ? `${folder}/${image_id}` : image_id,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(this.s3, command, {
      expiresIn: expiry_time,
    });
    return url;
  }

  public async deleteFileFromBucket(image_id: string) {
    let deleteObjectParams = {
      Bucket: this.bucketName,
      Key: image_id,
    };
    try {
      const data = await this.s3.send(
        new DeleteObjectCommand(deleteObjectParams)
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

const s3 = new S3(accessKeyId, secretAccessKey, region, bucketName);
console.log(`S3 client instance instantiated`);

export default s3;
