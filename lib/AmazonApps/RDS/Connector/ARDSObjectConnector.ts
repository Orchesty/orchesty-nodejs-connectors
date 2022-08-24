import AAwsObjectConnector from '../../AAwsObjectConnector';

export default abstract class ARDSObjectConnector extends AAwsObjectConnector {

    public getName(): string {
        return `rds-${this.getCustomId()}`;
    }

}
