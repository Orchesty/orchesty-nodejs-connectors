import { AAwsObjectConnector } from '@orchesty/connector-amazon-apps-common';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { BUCKET } from '../S3Application';

export default abstract class AS3ObjectConnector extends AAwsObjectConnector {

    public getName(): string {
        return `s3-${this.getCustomId()}`;
    }

    public getBucket(applicationInstall: ApplicationInstall): string {
        return applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][BUCKET];
    }

}
