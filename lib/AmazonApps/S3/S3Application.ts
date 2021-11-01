import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { S3Client } from '@aws-sdk/client-s3';
import AAwsApplication, {
  CREDENTIALS,
  ENDPOINT, KEY, REGION, REGIONS, SECRET, VERSION,
} from '../AAwsApplication';

export const BUCKET = 'Bucket';

export default class S3Application extends AAwsApplication {
  public getDescription = (): string => 'Amazon Simple Storage Service (Amazon S3) is an object storage service that'
    + ' offers industry-leading scalability, data availability, security, and performance.';

  public getName = (): string => 's3';

  public getPublicName = (): string => 'Amazon Simple Storage Service';

  public getSettingsForm = (): Form => new Form()
    .addField((new Field(FieldType.TEXT, KEY, 'Key', undefined, true)))
    .addField((new Field(FieldType.TEXT, SECRET, 'Secret', undefined, true)))
    .addField((new Field(FieldType.TEXT, BUCKET, 'Bucket', undefined, true)))
    .addField((new Field(FieldType.SELECT_BOX, REGION, 'Region', undefined, true)).setChoices(REGIONS))
    .addField((new Field(FieldType.TEXT, ENDPOINT, 'Custom Endpoint')));

  public getS3Client = (applicationInstall: ApplicationInstall): S3Client => {
    const settings = applicationInstall.getSettings()[FORM];
    const endpoint = settings[ENDPOINT];

    return new S3Client(
      [
        {
          /* eslint-disable @typescript-eslint/naming-convention */
          [CREDENTIALS]: {
            KEY: settings[KEY],
            SECRET: settings[SECRET],
          },
          [REGION]: settings[REGION],
          [VERSION]: this._LATEST,
          [ENDPOINT]: endpoint ? settings[ENDPOINT] : [],
        },
        /* eslint-enable @typescript-eslint/naming-convention */
      ],
    );
  };
}
