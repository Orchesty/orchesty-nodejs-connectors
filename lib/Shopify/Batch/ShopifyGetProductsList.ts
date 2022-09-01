import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ShopifyApplication from '../ShopifyApplication';

export const NAME = 'shopify-get-products-list';

const LIMIT = 100;
const LIST_PRODUCTS_ENDPOINT = `admin/api/2022-07/products.json?limit=${LIMIT}`;

const LAST_RUN_KEY = 'lastRunListProductsChanges';

export default class ShopifyGetProductsList extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInputJson>): Promise<BatchProcessDto> {
        const { from } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const creationTimeFrom = from || appInstall.getNonEncryptedSettings()[LAST_RUN_KEY];

        let url = dto.getBatchCursor(LIST_PRODUCTS_ENDPOINT);

        if (creationTimeFrom) {
            const separatorChar = url.includes('?') ? '&' : '?';
            url = `${url}${separatorChar}created_at_min=${creationTimeFrom}`;
        }

        const app = this.getApplication<ShopifyApplication>();
        const requestDto = app.getRequestDto(dto, appInstall, HttpMethods.GET, url);

        const res = await this.getSender().send<IResponseJson>(requestDto);
        const nextPageLink = app.getNextPageFromHeaders(res.getHeaders());

        if (nextPageLink) {
            dto.setBatchCursor(nextPageLink);
        } else {
            await this.writeLastTimeRun(appInstall);
        }

        const { products } = res.getJsonBody();

        dto.setItemList(products);

        return dto;
    }

    private async writeLastTimeRun(appInstall: ApplicationInstall): Promise<void> {
        appInstall.addNonEncryptedSettings({ [LAST_RUN_KEY]: new Date() });
        await (await this.getDbClient().getApplicationRepository()).update(appInstall);
    }

}

interface IInputJson {
    from: string;
}

interface IResponseJson {
    products: {
        id: string;
    }[];
}
