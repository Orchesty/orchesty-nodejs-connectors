import AAwsObjectConnector from '../../AAwsObjectConnector';

export default abstract class ALambdaObjectConnector extends AAwsObjectConnector {
  public getName = (): string => `lambda-${this._getCustomId()}`;
}
