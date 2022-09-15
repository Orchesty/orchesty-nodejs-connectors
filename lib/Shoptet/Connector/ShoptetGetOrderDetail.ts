import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IOutputJson as IInput } from '../Batch/ShoptetGetOrdersList';
import AShoptetConnector from './AShoptetConnector';

export const NAME = 'shoptet-get-order-detail';

export const GET_ORDER_DETAIL_ENDPOINT = 'api/orders/{code}?include=shippingDetails';

export default class ShoptetGetOrderDetail extends AShoptetConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { code } = dto.getJsonData();

        const url = GET_ORDER_DETAIL_ENDPOINT.replace('{code}', code);
        const response = await this.doRequest(url, dto) as IResponse;

        return dto.setNewJsonData(response.data.order);
    }

}

interface IResponse {
    data: {
        order: IOutput;
    };
}

export interface IOutput {
    code: string;
    creationTime: Date;
    email: string;
    phone: string;
    clientCode: string;
    companyId: string;
    vatId: string;
    taxId: string;
    paid: boolean;
    billingAddress: {
        company: string;
        fullName: string;
        street: string;
        houseNumber: string;
        city: string;
        additional: string;
        zip: string;
        regionName: string;
        regionShortcut: string;
        countryCode: string;
    };
    billingMethod: {
        name: string;
        id: number;
    };
    deliveryAddress: {
        company: string;
        street: string;
        houseNumber: string;
        city: string;
        fullName: string;
        zip: string;
        additional: string;
        regionShortcut: string;
        countryCode: string;
    };
    price: {
        withVat: string;
        itemType: string;
        currencyCode: string;
    };
    paymentMethod: {
        guid: string;
        name: string;
    };
    shipping: {
        guid: string;
        name: string;
    };
    items: [
        {
            code: string;
            itemType: string;
            amount: string;
            itemPrice: {
                withVat: string;
            };
            status: {
                id: number;
                name: string;
            };
        },
    ];
    shippingDetails: {
        branchId: string;
    };
    status: {
        id: number;
        name: string;
    };
}
