import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import {
  PutObjectCommand, PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { KEY } from '../../AAwsApplication';
import S3Application, { BUCKET } from '../S3Application';
import AS3ObjectConnector from './AS3ObjectConnector';
import { CONTENT, NAME } from '../../AAwsObjectConnector';

export default class S3CreateObjectConnector extends AS3ObjectConnector {
  protected _getCustomId = (): string => 'create-object';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const content = dto.jsonData as { name: string, content: string };
    this._checkParameters([NAME], content);

    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
    const application = this._application as S3Application;
    const client = application.getS3Client(applicationInstall);
    const input: PutObjectCommandInput = {
      [BUCKET]: this.getBucket(applicationInstall),
      [KEY]: content[NAME],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Body: content[CONTENT],
    };
    const command = new PutObjectCommand(input);

    try {
      await client.send(command);
    } catch (e) {
      throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
    }

    return dto;
  }
}
