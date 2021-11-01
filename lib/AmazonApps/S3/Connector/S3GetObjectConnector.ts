import AS3ObjectConnector from './AS3ObjectConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import S3Application, { BUCKET } from '../S3Application';
import * as crypto from 'crypto';
import { GetObjectCommand, GetObjectCommandInput } from '@aws-sdk/client-s3';
import { KEY } from '../../AAwsApplication';
import * as fs from 'fs';
import OnRepeatException from 'pipes-nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { unlinkSync } from 'fs';

export default class S3GetObjectConnector extends AS3ObjectConnector {
  protected _getCustomId(): string {
    return 'get-object';
  }
  
  public getName(): string { // TODO
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
      [this._TARGET]: path
    }
    const command = new GetObjectCommand(input);
    let fileContent: string
    
    try {
      await client.send(command)
    } catch (e) {
      throw new OnRepeatException(60, 10, e);
    } finally {
      fileContent = fs.readFileSync(path).toString();
      unlinkSync(path);
    }
    
    dto.jsonData = {
      [this._NAME]: content[this._NAME],
      [this._CONTENT]: fileContent,
    }
    
    return dto;
  }
  
}