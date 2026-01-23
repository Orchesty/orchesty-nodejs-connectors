import { AAwsObjectConnector } from '@orchesty/connector-amazon-apps-common';

export default abstract class ALambdaObjectConnector extends AAwsObjectConnector {

    public getName(): string {
        return `lambda-${this.getCustomId()}`;
    }

}
