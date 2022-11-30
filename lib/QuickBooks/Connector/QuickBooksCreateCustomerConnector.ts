import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ICustomer } from './QuickBooksFindCustomerConnector';

export const NAME = 'quick-books-create-customer-connector';

export default class QuickBooksCreateCustomerConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<ICustomer>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            '/customer',
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody().Customer);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    Customer: ICustomer;
}

export interface IInput {
    DisplayName: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
