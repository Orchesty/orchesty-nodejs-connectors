import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import WooCommerceApplication from '../WooCommerceApplication';

export const NAME = 'woocommerce-update-product-quantity';

export default class WooCommerceUpdateProductQuantity extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { productId, update } = dto.getJsonData();

        const requestDto = this.getApplication<WooCommerceApplication>().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            `wp-json/wc/v3/products/${productId}/variations/batch`,
            JSON.stringify(update),
        );

        await this.getSender().send(requestDto, [200]);

        dto.setJsonData({});

        return dto;
    }

}

export interface IInput {
    productId: string;
    update: IWooCommerceStock[];
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IWooCommerceStock {
    id: number;
    stock_quantity: number;
    stock_status: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
