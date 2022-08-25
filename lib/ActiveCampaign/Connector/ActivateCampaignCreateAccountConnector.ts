import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'activate-campaign-create-account-connector';

export default class ActivateCampaignCreateAccountConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'accounts',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    account: {
        name: string;
        accountUrl?: string;
        owner?: number;
        fields?: {
            customFieldId: number;
            fieldValue: number;
            fieldCurrency?: string;
        }[];
    };
}

export interface IOutput {
    account: {
        id: string;
        name: string;
        accountUrl: string;
        createdTimestamp: string;
        updatedTimestamp: string;
        links: [];
        fields: {
            customFieldId: number;
            fieldValue: number;
            fieldCurrency: string;
            accountId: string;
        }[];
    };
}
