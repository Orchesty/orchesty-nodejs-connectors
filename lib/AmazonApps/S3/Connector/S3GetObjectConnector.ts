import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { KEY } from '../../AAwsApplication';
import S3Application, { BUCKET } from '../S3Application';
import AS3ObjectConnector from './AS3ObjectConnector';
import { CONTENT, NAME } from '../../AAwsObjectConnector';

export default class S3GetObjectConnector extends AS3ObjectConnector {
  protected _getCustomId = (): string => 'get-object';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const content = dto.jsonData as { name: string };
    this._checkParameters([NAME], content);

    const applicationInstall = await this._getApplicationInstallFromProcess(dto);
    const application = this._application as S3Application;
    const client = application.getS3Client(applicationInstall);
    const input: GetObjectCommandInput = {
      [BUCKET]: this.getBucket(applicationInstall),
      [KEY]: content[NAME],
    };
    const command = new GetObjectCommand(input);

    try {
      const response: GetObjectCommandOutput = await client.send(command);
      dto.jsonData = {
        [NAME]: content[NAME],
        [CONTENT]: response.Body,
      };
    } catch (e) {
      throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
    }

    return dto;
  }
}
