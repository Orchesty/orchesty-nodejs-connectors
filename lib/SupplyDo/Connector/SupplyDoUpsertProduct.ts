import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-upsert-product';

export default class SupplyDoUpsertProduct extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'hanaboso/items/product',
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

interface IResponse {
    data: IInput[];
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    ecommerce: number;
    product: IProduct;
    brand?: {
        name?: string;
        image?: string;
    };
    product_batch?: {
        external_id?: string;
        name?: string;
        expiresAt?: string;
    };
    supplier?: {
        address?: {
            city?: string;
            country?: string;
            name?: string;
            street?: string;
            street_number?: string;
        };
        currency?: string;
        discount?: number;
        email?: string;
        eta_days?: string;
        ico: string;
        main_assortment?: string;
        moq?: string;
        name: string;
        payment_type?: string;
        phone?: string;
        purchase_style?: string;
        tags?: string;
    };
}

export interface IProduct {
    external_id: string;
    ean: string;
    name: string;
    purchase_price: {
        amount: number;
        currency: string;
    };
    alt_ean: string;
    color: string;
    eta_days: number;
    height_cm: number;
    length_cm: number;
    country_of_origin: string;
    sd: boolean;
    selling_price: {
        amount: number;
        currency: string;
    };
    tags: string[];
    weight_grams: number;
    width_cm: number;
}
/* eslint-enable @typescript-eslint/naming-convention */
