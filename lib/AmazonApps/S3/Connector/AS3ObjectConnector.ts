import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AAwsObjectConnector from '../../AAwsObjectConnector';
import { BUCKET } from '../S3Application';

export default abstract class AS3ObjectConnector extends AAwsObjectConnector {

    public getName(): string {
        return `s3-${this.getCustomId()}`;
    }

    public getBucket(applicationInstall: ApplicationInstall): string {
        return applicationInstall.getSettings()[AUTHORIZATION_FORM][BUCKET];
    }

}
