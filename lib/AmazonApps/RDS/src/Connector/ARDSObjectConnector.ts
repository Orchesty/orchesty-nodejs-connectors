import AAwsObjectConnector from '@orchesty/connector-amazon-apps-common/src/AAwsObjectConnector';

export default abstract class ARDSObjectConnector extends AAwsObjectConnector {

    public getName(): string {
        return `rds-${this.getCustomId()}`;
    }

}
