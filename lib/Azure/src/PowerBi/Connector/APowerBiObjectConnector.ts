import AAzureObjectConnector from '../AAzureObjectConnector';

export default abstract class APowerBiObjectConnector extends AAzureObjectConnector {

    public getName(): string {
        return `azure-${this.getCustomId()}`;
    }

    protected getBaseUrl(organization: string): string {
        return `https://api.powerbi.com/v1.0/${organization}`;
    }

}
