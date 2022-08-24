import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'alza-insetr-order-connector';

export default class AlzaInsetrOrderConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { orderId, ...body } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            `order/${orderId}`,
            body,
        );
        const resp = await this.getSender().send<IOutput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IOutput {
    errorCode: number;
    errorMessage: string;
    supplierOrder: string;
    validUntil: string;
}

export interface IInput {
    orderId: string;
    timestamp: string;
    customerId: number;
    supplierId: number;
    supplierBranchId: number;
    regNo: string;
    vatNo: string;
    itemsPriceCurrency: string;
    itemsPriceCountry: string;
    orderItems: {
        orderItemId: number;
        code: string;
        quantity: number;
        purchasePriceWithoutFees: string;
        fees: {
            copyright: string;
            recycling: string;
        };
        alzaBarCodes: string[];
    }[];
}
