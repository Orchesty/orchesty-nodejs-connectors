import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_VERSION } from '../ABaseShopify';
import { IOutput as IInput } from '../Batch/ShopifyGetOrderList';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-get-variant-detail';

const DETAIL_ORDER_ENDPOINT = `admin/api/${API_VERSION}/variants/{id}.json`;

export default class ShopifyGetVariantDetail extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const app = this.getApplication<ShopifyApplication>();
        const { id } = dto.getJsonData();
        const { variant } = await this.doRequest(app, id, dto);

        return this.setDtoData(dto, variant);
    }

    protected setDtoData(dto: ProcessDto, variant: IVariantJson): ProcessDto {
        return dto.setNewJsonData({ ...variant });
    }

    private async doRequest(app: ShopifyApplication, id: number, dto: ProcessDto): Promise<IResponseJson> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            DETAIL_ORDER_ENDPOINT.replace('{id}', id.toString()),
        );
        const res = await this.getSender().send<IResponseJson>(requestDto, [200, 404]);

        return res.getJsonBody();
    }

}

export interface IVariantJson {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    product_id: number;
    title: string;
    price: string;
    sku: string;
    position: number;
    inventory_policy: string;
    fulfillment_service: string;
    inventory_management: string;
    created_at: string;
    updated_at: string;
    taxable: boolean;
    barcode: string;
    grams: number;
    image_id: number;
    weight: number;
    weight_unit: string;
    inventory_item_id: number;
    inventory_quantity: number;
    old_inventory_quantity: number;
    tax_code: string;
    requires_shipping: boolean;
    admin_graphql_api_id: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}

interface IResponseJson {
    variant: IVariantJson;
}
