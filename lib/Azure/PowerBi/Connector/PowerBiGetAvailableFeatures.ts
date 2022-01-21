import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';
import APowerBiObjectConnector from './APowerBiObjectConnector';
import { CONTENT, NAME } from '../../../AmazonApps/AAwsObjectConnector';
import S3Application, { BUCKET } from '../../../AmazonApps/S3/S3Application';
import { KEY } from '../../../AmazonApps/AAwsApplication';

export default class PowerBiGetAvailableFeatures extends APowerBiObjectConnector {
  protected _getCustomId = (): string => 'get-available-features';

  processAction(dto: ProcessDto): Promise<ProcessDto> | ProcessDto {
    const dto = _dto;

    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
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
