import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import WooCommerceApplication, { NAME as BASE_NAME } from '../WooCommerceApplication';

export const NAME = `${BASE_NAME.toLowerCase()}-get-shipping-methods`;

export default class WooCommerceGetShippingMethods extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const app = this.getApplication<WooCommerceApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto, null);

        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            'wp-json/wc/v3/shipping/zones?per_page=10000',
        );

        const res = await this.getSender().send<IShippingZone[]>(requestDto, [200, 404]);
        const shippingMethods: IShippingMethod[] = [];
        const shippingZones = res.getJsonBody();
        const result = shippingZones.map(async (shippingZone) => {
            const innerRequestDto = app.getRequestDto(
                dto,
                appInstall,
                HttpMethods.GET,
                `wp-json/wc/v3/shipping/zones/${shippingZone.id}/methods?per_page=10000`,
            );

            const innerRes = await this.getSender().send<IShippingMethod[]>(innerRequestDto, [200, 404]);
            shippingMethods.push(...innerRes.getJsonBody().map((shippingMethod) => {
                // eslint-disable-next-line no-param-reassign
                shippingMethod.shipping_zone_title = shippingZone.name;

                return shippingMethod;
            }));
        });
        await Promise.all(result);

        dto.setJsonData(shippingMethods);

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IShippingZone {
    id: number;
    name: string;
    order: number;
    _links: {
        self: {
            href: string;
        }[];
        collection: {
            href: string;
        }[];
        describedby: {
            href: string;
        }[];
    };
}

export interface IShippingMethod {
    instance_id: number;
    title: string;
    order: number;
    enabled: boolean;
    method_id: string;
    method_title: string;
    method_description: string;
    shipping_zone_title?: string;
    settings: {
        title: {
            id: string;
            label: string;
            description: string;
            type: string;
            value: string;
            default: string;
            tip: string;
            placeholder: string;
        };
        requires: {
            id: string;
            label: string;
            description: string;
            type: string;
            value: string;
            default: string;
            tip: string;
            placeholder: string;
            options: {
                coupon: string;
                min_amount: string;
                either: string;
                both: string;
            };
        };
        min_amount: {
            id: string;
            label: string;
            description: string;
            type: string;
            value: string;
            default: string;
            tip: string;
            placeholder: string;
        };
    };
    _links: {
        self: {
            href: string;
        }[];
        collection: {
            href: string;
        }[];
        describes: {
            href: string;
        }[];
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
