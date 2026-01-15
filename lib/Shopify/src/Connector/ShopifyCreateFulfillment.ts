import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseShopify, { API_VERSION } from '../ABaseShopify';
import { IOutput as IBaseOutput } from '../Batch/ShopifyGetFulfillmentOrders';

export const NAME = 'shopify-create-fulfillment';

const CREATE_FULFILLMENT = `admin/api/${API_VERSION}/fulfillments.json`;

export default class ShopifyCreateFulfillment extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const app = this.getApplication<ABaseShopify>();
        const data = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            CREATE_FULFILLMENT,
            JSON.stringify(data),
        );
        const res = await this.getSender().send<IResponse>(requestDto, [200, 201, 204, 422, 404]);

        return this.setDtoData(dto, res.getJsonBody()) as ProcessDto<IOutput>;
    }

    protected setDtoData(dto: ProcessDto<IInput>, response: IResponse): ProcessDto {
        return dto.setNewJsonData(response.fulfillment);
    }

}

export interface IInput {
    fulfillment: IFulfillment;
}

export type IOutput = IBaseOutput;

export interface IResponse {
    fulfillment: IOutput;
}

export interface IFulfillment {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    line_items_by_fulfillment_order: {
        fulfillment_order_id: number;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        fulfillment_order_line_items?: {
            id: number;
            quantity: number;
        }[];
    }[];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    tracking_info?: {
        number: string;
        url?: string;
    };
}
