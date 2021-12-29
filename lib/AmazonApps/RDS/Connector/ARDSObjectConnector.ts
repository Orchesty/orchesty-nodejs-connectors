import AAwsObjectConnector from '../../AAwsObjectConnector';

export default abstract class ARDSObjectConnector extends AAwsObjectConnector {
  getName = (): string => `rds-${this._getCustomId()}`;
}
