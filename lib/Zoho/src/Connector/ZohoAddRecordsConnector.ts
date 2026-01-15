import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ACCOUNT_OWNER_NAME, APP_LINK_NAME, CREATOR_FORM, FORM_LINK_NAME } from '../ZohoApplication';

export const NAME = 'zoho-add-records-connector';

export default class ZohoAddRecordsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const accountOwnerName = appInstall.getSettings()[CREATOR_FORM][ACCOUNT_OWNER_NAME];
        const appLink = appInstall.getSettings()[CREATOR_FORM][APP_LINK_NAME];
        const formLink = appInstall.getSettings()[CREATOR_FORM][FORM_LINK_NAME];
        const url = `/${accountOwnerName}/${appLink}/form/${formLink}`;

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            url,
            { data: dto.getJsonData() },
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        const records = resp.getJsonBody();

        if (records.code !== 3000) {
            throw new Error(records.message);
        }

        return dto.setNewJsonData(records.data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    data: [
        {
            Email: string;
            Phone_Number: string;
        },
    ];
    result: {
        fields: string[];
        message: boolean;
        tasks: boolean;
    };
}

export interface IOutput {
    Email: string;
    Phone_Number: string;
    ID: string;
}

export interface IResponse {
    code: number;
    data: IOutput;
    message: string;
    tasks: {
        openurl: {
            type: string;
            url: string;
        };
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
