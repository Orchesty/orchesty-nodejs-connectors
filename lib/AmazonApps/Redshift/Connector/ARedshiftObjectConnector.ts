import AAwsObjectConnector from '../../AAwsObjectConnector';

export default abstract class ARedshiftObjectConnector extends AAwsObjectConnector {
  getName = (): string => `redshift-${this._getCustomId()}`;
}