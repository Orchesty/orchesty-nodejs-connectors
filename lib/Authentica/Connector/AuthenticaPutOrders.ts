import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'authentica-post-orders';

export default class AuthenticaPutOrders extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutputItem[]>> {
        const { orders } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            'orders',
            orders,
        );

        const response = (await this.getSender().send<IResponse>(requestDto, [200])).getJsonBody();

        return dto.setNewJsonData(response.data);
    }

}

export interface IOrder {
    orderNumber: string;
    destination: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        company: string;
        address1: string;
        address2: string;
        city: string;
        province: string;
        country: string;
        zip: string;
    };
    deliveryMethod: {
        id: number;
        branchId: string;
    };
    paymentMethod: {
        codAmount: number;
        codCurrency: string;
    };
    price: {
        totalPrice: number;
        currency: string;
    };
    items: [
        {
            sku: string;
            quantity: number;
            unitPrice: number;
        },
    ];
    variableSymbol: string;
}

interface IResponse {
    data: IOrder[];
}

export type IOutputItem = IOrder;

export interface IInput {
    orders: IOrder[];
}
