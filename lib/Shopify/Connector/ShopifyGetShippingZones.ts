import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_VERSION } from '../ABaseShopify';

export const NAME = 'shopify-get-shipping-zones';

export default class ShopifyGetShippingZones extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication()
            .getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto, null),
                HttpMethods.GET,
                `admin/api/${API_VERSION}/shipping_zones.json`,
            );
        const resp = await this.getSender()
            .send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody().shipping_zones);
    }

}

export type IOutput = ShippingZone[];

interface IResponse {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    shipping_zones: ShippingZone[];
}

export interface Province {
    id: number;
    country_id: number;
    name: string;
    code: string;
    tax: number;
    /* eslint-disable @typescript-eslint/naming-convention */
    tax_name: string;
    tax_type: string;
    tax_percentage: number;
    /* eslint-enable @typescript-eslint/naming-convention */
    shipping_zone_id: number;
}

export interface Country {
    id: number;
    name: string;
    tax: number;
    code: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    tax_name: string;
    shipping_zone_id: number;
    provinces: Province[];
}

export interface WeightBasedShippingRate {
    id: number;
    name: string;
    price: string;
    shipping_zone_id: number;
    /* eslint-disable @typescript-eslint/naming-convention */
    weight_low: number;
    weight_high: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface PriceBasedShippingRate {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    name: string;
    price: string;
    shipping_zone_id: number;
    max_order_subtotal: string;
    min_order_subtotal?: unknown;
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface CarrierShippingRateProvider {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    carrier_service_id: number;
    flat_modifier: string;
    service_filter: unknown;
    shipping_zone_id: number;
    percent_modifier?: unknown;
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface ShippingZone {
    id: number;
    name: string;
    profile_id: string;
    location_group_id: string;
    admin_graphql_api_id: string;
    countries: Country[];
    /* eslint-disable @typescript-eslint/naming-convention */
    weight_based_shipping_rates: WeightBasedShippingRate[];
    price_based_shipping_rates: PriceBasedShippingRate[];
    carrier_shipping_rate_providers: CarrierShippingRateProvider[];
    /* eslint-enable @typescript-eslint/naming-convention */
}
