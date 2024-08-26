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
    billingAddress: {
        additional: string;
        city: string;
        company: string;
        countryCode: string;
        district: string;
        fullName: string;
        houseNumber: string;
        regionName: string;
        street: string;
        zip: string;
    },
    cashDeskOrder: boolean;
    code: string;
    companyId: string;
    creationTime: string;
    price: {
        toPay: string;
        withVat: string;
        currencyCode: string;
    },
    deliveryAddress: {
        additional:string;
        city: string;
        company: string;
        countryCode: string;
        district: string;
        fullName:string;
        houseNumber: string;
        regionName:string;
        street:string;
        zip: string;
    },
    email: string;
    adminUrl: string;
    items:
    {
        amount: string;
        amountUnit: string;
        brand: string;
        code: string;
        itemId: number;
        itemPriceWithVat: string;
        itemType: string;
        name: string;
        productGuid: string;
        remark: string;
        status: {
            id: number;
        },
        supplierName: string;
        surchargeParameters:
        {
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
        variantName: string;
        weight: string;
    }[],
    notes: {
        eshopRemark: string;
        trackingNumber: string;
    },
    paid: boolean;
    paymentMethodGuid: string;
    phone: string;
    shippingGuid: string;
    status: {
        id: number;
    },
    taxId: string;
    vatId: string;
}

export interface IOutput {
    detail: string;
}
