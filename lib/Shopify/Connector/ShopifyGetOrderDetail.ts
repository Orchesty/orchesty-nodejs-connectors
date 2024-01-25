import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_VERSION } from '../ABaseShopify';
import { IOutput as IInput } from '../Batch/ShopifyGetOrderList';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-get-order-detail';

const DETAIL_ORDER_ENDPOINT = `admin/api/${API_VERSION}/orders/{id}`;

export default class ShopifyGetOrderDetail extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const app = this.getApplication<ShopifyApplication>();
        const { id } = dto.getJsonData();

        const order: IResponseJson = await this.doRequest(app, id, dto);

        return dto.setNewJsonData({
            ...order,
        });
    }

    private async doRequest(
        app: ShopifyApplication,
        id: number,
        dto: ProcessDto,
    ): Promise<IResponseJson> {
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

interface IOrderJson {
    order: {
        id: string;
        /* eslint-disable @typescript-eslint/naming-convention */
        created_at: string;
        shipping_address: {
            first_name: string;
            address1: string;
            phone: string;
            city: string;
            zip: string;
            province: string;
            country: string;
            last_name: string;
            address2: string;
            company: string | null;
            latitude: number;
            longitude: number;
            name: string;
            country_code: string;
            province_code: string;
        };
        billing_address: {
            first_name: string;
            address1: string;
            phone: string;
            city: string;
            zip: string;
            province: string;
            country: string;
            last_name: string;
            address2: string;
            company: string | null;
            latitude: number;
            longitude: number;
            name: string;
            country_code: string;
            province_code: string;
        };
        customer: {
            name: string;
            city: string;
            country_code: string;
            province_code: string;
            zip: string;
            phone: string;
            company: string | null;
            address1: string;
            address2: string;
            default_address: {
                first_name: string;
                address1: string;
                phone: string;
                city: string;
                zip: string;
                province: string;
                country: string;
                last_name: string;
                address2: string;
                company: string | null;
                latitude: number;
                longitude: number;
                name: string;
                country_code: string;
                province_code: string;
            };
        };
        total_price: string;
        total_shipping_price_set: {
            shop_money: {
                amount: string;
                currency_code: string;
            };
        };
        order_number: number;
        note_attributes: [
            {
                name: string;
                value: string;
            },
        ];
        line_items: [
            {
                sku: string;
                quantity: number;
                price: number;
                variant_id: number;
            },
        ];
        cancelled_at: string;
        currency: string;
        shipping_lines: [
            {
                title: string;
            },
        ];
        payment_gateway_names: string[];
        financial_status: string;
        contact_email: string;
        email: string;
        refunds: [
            {
                refund_line_items: [
                    {
                        quantity: number;
                        line_item: {
                            variant_id: number;
                        };
                    },
                ];
            },
        ];
        source_name: string;
        /* eslint-enable @typescript-eslint/naming-convention */
    };
}

type IResponseJson = IOrderJson;
