import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_VERSION } from '../ABaseShopify';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-get-inventory-location';

export default class ShopifyGetInventoryLocation extends AConnector {

    public constructor() {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<ILocation[]>> {
        const app = this.getApplication<ShopifyApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto, null);

        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `${app.getDecoratedUrl(appInstall)}/admin/api/${API_VERSION}/locations.json`,
        );

        const responseDto = await this.getSender().send<IResponse>(requestDto);

        return dto.setNewJsonData(responseDto.getJsonBody().locations);
    }

}

export interface IResponse {
    locations: ILocation[];
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface ILocation {
    active: boolean;
    admin_graphql_api_id: string;
    localized_country_name: string;
    phone: string;
    country_name: string;
    id: number;
    country_code: string;
    name: string;
    created_at: string;
    country: string;
    zip: string;
    city: string;
    legacy: boolean;
    updated_at: string;
    address1: string;
    address2: string;
    province?: unknown;
    province_code?: unknown;
    localized_province_name?: unknown;
}

/* eslint-enable @typescript-eslint/naming-convention */
