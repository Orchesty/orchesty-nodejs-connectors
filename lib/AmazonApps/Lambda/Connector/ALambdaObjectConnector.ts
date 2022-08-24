import AAwsObjectConnector from '../../AAwsObjectConnector';

export default abstract class ALambdaObjectConnector extends AAwsObjectConnector {

    public getName(): string {
        return `lambda-${this.getCustomId()}`;
    }

}
