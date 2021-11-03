import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { DeleteObjectCommand, DeleteObjectCommandInput } from '@aws-sdk/client-s3';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';
import AS3ObjectConnector from './AS3ObjectConnector';
import S3Application, { BUCKET } from '../S3Application';
import { KEY } from '../../AAwsApplication';
import { NAME } from '../../AAwsObjectConnector';

export default class S3DeleteObjectConnector extends AS3ObjectConnector {
  protected _getCustomId = (): string => 'delete-object';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const content = dto.jsonData as any;
    this._checkParameters([NAME], content);

    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
    const application = this._application as S3Application;
    const client = application.getS3Client(applicationInstall);

    const input: DeleteObjectCommandInput = {
      [BUCKET]: this.getBucket(applicationInstall),
      [KEY]: content[NAME],
    };
    const command: DeleteObjectCommand = new DeleteObjectCommand(input);
    try {
      await client.send(command);
    } catch (e) {
      throw new OnRepeatException(60, 10, e);
    }
    dto.jsonData = { [NAME]: content[NAME] };

    return dto;
  }
}
