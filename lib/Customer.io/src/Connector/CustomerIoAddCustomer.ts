import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'customer-io-add-customer';

export default class CustomerIoAddCustomer extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { identifier, ...body } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            `customers/${identifier}`,
            body,
        );
        await this.getSender().send(req, [200]);

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    identifier: string;
    id: string;
    email: string;
    anonymous_id: string;
    created_at: number;
    _update: boolean;
    Attributes1: string;
    Attributes2: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
