import AS3ObjectConnector from './AS3ObjectConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import S3Application, { BUCKET } from '../S3Application';
import { DeleteObjectCommand, DeleteObjectCommandInput } from '@aws-sdk/client-s3';
import { KEY } from '../../AAwsApplication';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';

export default class S3DeleteObjectConnector extends AS3ObjectConnector {
  protected _getCustomId(): string {
    return 'delete-object';
  }
  
  public getName(): string { // TODO
    return '';
  }
  
  public async processAction(dto: ProcessDto): Promise<ProcessDto> {
    const content = dto.jsonData as any;
    this._checkParameters([this._NAME], content);
    
    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
    const application = this._application as S3Application;
    const client = application.getS3Client(applicationInstall);
    
    const input: DeleteObjectCommandInput = {
      [BUCKET]: this.getBucket(applicationInstall),
      [KEY]: content[this._NAME],
    }
    const command: DeleteObjectCommand = new DeleteObjectCommand(input);
    try {
      await client.send(command);
    } catch (e) {
      throw new OnRepeatException(60, 10, e);
    }
    dto.jsonData = { [this._NAME]: content[this._NAME] };
    
    return dto;
    
  }
  
}