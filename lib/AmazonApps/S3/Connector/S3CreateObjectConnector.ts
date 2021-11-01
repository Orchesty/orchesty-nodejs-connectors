import AS3ObjectConnector from './AS3ObjectConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import S3Application, { BUCKET } from '../S3Application';
import crypto from 'crypto';
import fs, { unlinkSync } from 'fs';
import { GetObjectCommand, GetObjectCommandInput } from '@aws-sdk/client-s3';
import { KEY } from '../../AAwsApplication';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';

export default class S3CreateObjectConnector extends AS3ObjectConnector {
  protected _getCustomId(): string {
    return 'create-object';
  }
  
  getName(): string {
    return '';
  }
  
  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dto = _dto;
    const content = dto.jsonData as any;
    this._checkParameters([this._NAME], content);
    
    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
    const application = this._application as S3Application;
    const client = application.getS3Client(applicationInstall);
    const path = `/tmp/${crypto.randomBytes(10)}`;
    fs.writeFileSync(path, '');
    const input: GetObjectCommandInput = {
      [BUCKET]: this.getBucket(applicationInstall),
      [KEY]: content[this._NAME],
      [this._SOURCE]: path
    }
    const command = new GetObjectCommand(input);
    
    try {
      await client.send(command)
    } catch (e) {
      throw new OnRepeatException(60, 10, e);
    } finally {
      unlinkSync(path);
    }
    
    return dto
  }
  
}