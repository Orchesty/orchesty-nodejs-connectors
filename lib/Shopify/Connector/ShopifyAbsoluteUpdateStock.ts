import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_VERSION } from '../ABaseShopify';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-absolute-update-stock';

const SHOPIFY_UPDATE_STOCK = `admin/api/${API_VERSION}/inventory_levels/set.json`;

export default class ShopifyAbsoluteUpdateStock extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const data = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const app = this.getApplication<ShopifyApplication>();
        const decoratedUrl = app.getDecoratedUrl(appInstall);
        const url = `${decoratedUrl}/${SHOPIFY_UPDATE_STOCK}`;
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            url,
            JSON.stringify(data),
        );

        await this.getSender().send(requestDto);
        return dto;
    }

}

export interface IInput {
    /* eslint-disable @typescript-eslint/naming-convention */
    inventory_item_id: string;
    location_id: string;
    /* eslint-enable @typescript-eslint/naming-convention */
    available: number;
}
