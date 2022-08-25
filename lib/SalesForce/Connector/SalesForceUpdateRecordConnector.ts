import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'salesforce-update-record-connector';

export default class SalesForceUpdateRecordConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { recordId, ...body } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.PATCH, `/Account/${recordId}`, body);
        await this.getSender().send(req, [204]);

        dto.setJsonData({});

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    BillingCity: string;
    recordId: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
