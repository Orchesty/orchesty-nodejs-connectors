import AAwsObjectConnector from '../../AAwsObjectConnector';

export default abstract class ARedshiftObjectConnector extends AAwsObjectConnector {

    public getName(): string {
        return `redshift-${this.getCustomId()}`;
    }

}
