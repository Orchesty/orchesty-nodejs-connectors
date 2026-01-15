import { IProduct } from '@orchesty/connector-authentica/src/Connector/AuthenticaPutProducts';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import { NAME as BASE_NAME } from '../WooCommerceApplication';

export const NAME = `${BASE_NAME.toLowerCase()}-get-products-variant`;

export default class WooCommerceGetProductVariant extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput[]>): Promise<ProcessDto<IOutput>> {
        try {
            const appInstall = await this.getApplicationInstallFromProcess(dto);
            return dto.setNewJsonData<IOutput>(await Promise.all(dto.getJsonData().map(async (product) => {
                checkParams(product, ['productId', 'id'], true);
                const { productId, id } = product;
                const req = await this.getApplication()
                    .getRequestDto(
                        dto,
                        appInstall,
                        HttpMethods.GET,
                        `/wp-json/wc/v3/products/${productId}/variations/${id}`,
                    );
                const resp = await this.getSender()
                    .send<IResponse>(req, [200]);
                const newProduct = product;
                newProduct.sku = resp.getJsonBody().sku;
                delete newProduct.id;
                if (!newProduct.sku) {
                    throw Error(`SKU in woocommerce is missing [ProductId=${productId}, Id=${id}]`);
                }

                return newProduct as IProduct;
            })));
        } catch (e) {
            if (e instanceof Error) {
                dto.setStopProcess(ResultCode.STOP_AND_FAILED, e.message);
                return dto;
            }
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, `Unknown error in ${NAME}`);
            return dto;
        }
    }

}

export interface IInput extends IProduct {
    id?: number;
}

export type IOutput = IProduct[];

interface IResponse {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    description: string;
    permalink: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from: string | null;
    date_on_sale_from_gmt: string | null;
    date_on_sale_to: string | null;
    date_on_sale_to_gmt: string | null;
    on_sale: boolean;
    status: string;
    purchasable: boolean;
    virtual: boolean;
    downloadable: boolean;
    downloads: unknown[];
    download_limit: number;
    download_expiry: number;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean;
    stock_quantity: number | null;
    stock_status: string;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    shipping_class: string;
    shipping_class_id: number;
    image: {
        id: number;
        date_created: string;
        date_created_gmt: string;
        date_modified: string;
        date_modified_gmt: string;
        src: string;
        name: string;
        alt: string;
    };
    attributes: [
        {
            id: number;
            name: string;
            option: string;
        },
    ];
    menu_order: number;
    meta_data: unknown[];
    _links: {
        self: [
            {
                href: string;
            },
        ];
        collection: [
            {
                href: string;
            },
        ];
        up: [
            {
                href: string;
            },
        ];
    };
    /* eslint-enable @typescript-eslint/naming-convention */
}
