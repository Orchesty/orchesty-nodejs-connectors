import AAzureObjectConnector from '../AAzureObjectConnector';

export default abstract class APowerBiObjectConnector extends AAzureObjectConnector {
  public getName(): string {
    return `azure-${this._getCustomId()}`;
  }
}
