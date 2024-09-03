import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'brani-upsert-order';

export default class BraniUpsertOrder extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'order/upsert',
            { data: dto.getJsonData() },
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    code: string;
    creationTime: string;
    email: string;
    phone: string;
    price: {
        toPay: string;
        withVat: string;
        currencyCode: string;
    },
    deliveryAddress: {
        city: string;
        countryCode: string;
        fullName:string;
        street:string;
        zip: string;
        additional?: string;
        company?: string;
        district?: string;
        houseNumber?: string;
        regionName?:string;
    },
    items: {
        amount: string;
        amountUnit: string;
        code: string;
        itemType: 'product' | 'second-hand' | 'service' | 'gift';
        name: string;
        productGuid: string;
        weight: string;
        brand?: string;
        itemId?: number;
        itemPriceWithVat?: string;
        remark?: string;
        status?: {
            id: number;
        },
        supplierName?: string;
        surchargeParameters?: {
            parameterName: {
                code: string;
                name: string;
            },
            parameterValue: {
                valueIndex: string;
                description: string;
                price: string;
            }
        }[],
        variantName?: string;
    }[],
    notes: {
        eshopRemark?: string;
        customerRemark?: string;
        trackingNumber?: string;
    },
    billingAddress?: {
        city: string;
        countryCode: string;
        fullName: string;
        street: string;
        zip: string;
        additional?: string;
        company?: string;
        district?: string;
        houseNumber?: string;
        regionName?: string;
    },
    shippingDetails?: {
        branchId?: string;
    }
    cashDeskOrder?: boolean;
    companyId?: string;
    adminUrl?: string;
    paid?: boolean;
    paymentMethodGuid?: string;
    shippingGuid?: string;
    status?: {
        id: number;
    },
    taxId?: string;
    vatId?: string;
}

export interface IOutput {
    detail: string;
}
