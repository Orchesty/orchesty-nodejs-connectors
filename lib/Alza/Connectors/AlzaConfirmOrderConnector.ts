import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'alza-confirm-order-connector';

export default class AlzaConfirmOrderConnector extends AConnector {

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
            `order/${orderId}/confirm`,
            body,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    orderId: string;
    timestamp: string;
    customerId: number;
    supplierId: number;
    supplierBranchId: number;
    regNo: string;
    vatNo: string;
    shippingCarrier: {
        shippingCarrierCode: string;
        shippingCarrierDeliveryType: string;
    };
    parcelShop: {
        parcelShopIdentification: string;
        parcelShopBranchCode: string;
    };
    shipmentDeliveryType: string;
    shipmentShippingMode: string;
    demandedExpeditionDate: string;
    shipmentDepartureTime: string;
    cashOnDeliveryValue: number;
    cashOnDeliveryValueCurrency: string;
    paymentVS: string;
    deliveryAddress: {
        companyName: string;
        addressName: string;
        streetWithNumber: string;
        city: string;
        country: string;
        zip: string;
        phone: string;
        email: string;
        note: string;
    };
}

export interface IOutput {
    errorCode: number;
    errorMessage: string;
}
