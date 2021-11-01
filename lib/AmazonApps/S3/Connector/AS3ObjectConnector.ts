import AAwsObjectConnector from '../../AAwsObjectConnector';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { BUCKET } from '../S3Application';

export default abstract class AS3ObjectConnector extends AAwsObjectConnector {
  public getId(): string {
    return `s3-${this._getCustomId()}`
  }
  
  public getBucket(applicationInstall: ApplicationInstall): string {
    return applicationInstall.getSettings()[FORM][BUCKET];
  }
}