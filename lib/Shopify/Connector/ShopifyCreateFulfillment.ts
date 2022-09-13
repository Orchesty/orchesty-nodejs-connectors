import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ShopifyApplication, { API_VERSION } from '../ShopifyApplication';

export const NAME = 'shopify-create-fulfillment';

const CREATE_FULFILLMENT = `admin/api/${API_VERSION}/fulfillments.json`;

export default class ShopifyCreateFulfillment extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const app = this.getApplication<ShopifyApplication>();
        const data = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const decoratedUrl = app.getDecoratedUrl(appInstall);
        const url = `${decoratedUrl}/${CREATE_FULFILLMENT}`;

        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            url,
            JSON.stringify(data),
        );
        await this.getSender().send(requestDto);

        return dto;
    }

}

export interface IInput {
    fulfillment: IFulfillment;
}

export interface IFulfillment {
    order_id: string;
    status: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    tracking_numbers: string[];
}
