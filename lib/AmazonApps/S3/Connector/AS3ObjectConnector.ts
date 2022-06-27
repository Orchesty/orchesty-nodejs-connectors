import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import AAwsObjectConnector from '../../AAwsObjectConnector';
import { BUCKET } from '../S3Application';

export default abstract class AS3ObjectConnector extends AAwsObjectConnector {
  public getName(): string {
    return `s3-${this._getCustomId()}`;
  }

  public getBucket = (applicationInstall: ApplicationInstall): string => applicationInstall
    .getSettings()[AUTHORIZATION_FORM][BUCKET];
}
