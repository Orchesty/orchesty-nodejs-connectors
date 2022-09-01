import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export const NAME = 'authentica-post-orders';

export default class AuthenticaPutOrders extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const orders = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            'orders',
            orders,
        );
        const response = await this.getSender().send<IResponse>(requestDto);
        if (response.getResponseCode() >= 500) {
            throw new OnRepeatException();
        } else if (response.getResponseCode() >= 300) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, response.getBody());
        } else {
            dto.setNewJsonData(orders);
        }

        return dto;
    }

}

export interface IOrder {
    id: string;
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

export type IInput = IOrder[];

export type IOutput = IInput;
