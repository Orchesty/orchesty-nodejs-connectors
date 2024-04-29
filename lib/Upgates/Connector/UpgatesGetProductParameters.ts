import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'upgates-get-product-parameters';
const GET_PARAMETERS_ENDPOINT = 'api/v2/products/parameters/';

export default class UpgatesGetProductParameters extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { code, productId } = dto.getJsonData();

        if (!code && !productId) {
            throw new Error('At least one parameter must be inserted.');
        }

        let url = GET_PARAMETERS_ENDPOINT;
        if (code) {
            url = `${url}?code=${code}`;
        }

        if (productId) {
            const joinChar = url.includes('?') ? '&' : '?';
            url = `${url}${joinChar}product_id=${productId}`;
        }

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto, null),
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    code?: string;
    productId?: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    current_page: number;
    current_page_items: number;
    number_of_pages: number;
    number_of_items: number;
    products: IProduct[];
}

export interface IProduct {
    code: string,
    parameters: {
        name: Record<string, string>,
        values: Record<string, string>[]
    }[],
    variants: [
        {
            code: string,
            parameters: [
                {
                    name: Record<string, string>,
                    values: Record<string, string>[]
                },
            ]
        },
    ],
    admin_url: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
