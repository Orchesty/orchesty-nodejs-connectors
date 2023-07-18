import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'woo-commerce-create-product-category';

export default class WooCommerceCreateProductCategory extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'wp-json/wc/v3/products/categories',
            JSON.stringify(dto.getJsonData()),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

type IResponse = IInput;

type IOutput = IInput;

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    id?: number;
    name?: string;
    slug?: string;
    parent?: number;
    description?: string;
    display?: string;
    image?: {
        id?: number;
        date_created?: string;
        date_created_gmt?: string;
        date_modified?: string;
        date_modified_gmt?: string;
        src?: string;
        name?: string;
        alt?: string;
    };
    menu_order?: number;
    count?: number;
    _links?: {
        self?: {
            href?: string;
        }[];
        collection?: {
            href?: string;
        }[];
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
