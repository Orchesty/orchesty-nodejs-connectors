import AAwsObjectConnector from '@orchesty/connector-amazon-apps-common/src/AAwsObjectConnector';

export default abstract class ARedshiftObjectConnector extends AAwsObjectConnector {

    public getName(): string {
        return `redshift-${this.getCustomId()}`;
    }

}
