import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import WebflowApplication from '../WebflowApplication';

const WEBFLOW_CREATE_PRODUCT_ENDPOINT = '/sites/replace_me/products';

interface IWebflowProduct {
    name: string;
    description: string;
    slug: string;
    price: number;
    draft: boolean;
    archived: boolean;
    currency: string;
    siteId: string;
}

export default class WebflowAddProductConnector extends AConnector {

    public getName(): string {
        return 'webflow-create-product';
    }

    public async processAction(dto: ProcessDto<IWebflowProduct>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['name', 'description', 'slug', 'price', 'draft', 'archived', 'currency', 'siteId'],
        );

        const {
            name,
            description,
            slug,
            price,
            draft,
            archived,
            currency,
            siteId,
        } = dto.getJsonData();

        const application = this.getApplication<WebflowApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const data = {
            product: {
                name,
                fields: {
                    name,
                    slug,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    _draft: draft,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    _archived: archived,
                },
                description,
            },
            sku: {
                fields: {
                    name,
                    slug,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    _draft: draft,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    _archived: archived,
                    price: {
                        value: price,
                        unit: currency,
                    },
                },
            },
        };

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            WEBFLOW_CREATE_PRODUCT_ENDPOINT.replace('replace_me', siteId),
            JSON.stringify(data),
        );

        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());

        return dto;
    }

}
