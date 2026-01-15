import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

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
            'applinth/orders',
            orders,
        );

        await this.getSender().send<IResponse>(requestDto, { success: 200, stopAndFail: '300-499' });

        dto.setNewJsonData(orders);

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
    } | null;
    paymentMethod: {
        codAmount: number;
        codCurrency: string;
    } | null;
    price: {
        totalPrice: number;
        currency: string;
    };
    items: {
        sku: string;
        quantity: number;
        unitPrice: number | null;
    }[];
    variableSymbol: string | null;
    application: string;
    orderTags: string[];
    packagingType?: string;
    printDeliveryNote?: boolean;
    packagingInstructions?: {
        message: string;
        packagingInstructionType: string;
    }[];
}

interface IResponse {
    data: IOrder[];
}

export type IInput = IOrder[];

export type IOutput = IInput;
