import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseShopify, { API_VERSION } from '../ABaseShopify';
import { IOutput as IBaseOutput } from '../Batch/ShopifyGetFulfillmentOrders';

export const NAME = 'shopify-update-tracking-info';

const UPDATE_TRACKING_INFO = `admin/api/${API_VERSION}/fulfillments/{id}/update_tracking.json`;

export default class ShopifyUpdateTrackingInfo extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const app = this.getApplication<ABaseShopify>();
        const { id, ...data } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            UPDATE_TRACKING_INFO.replace('{id}', id.toString()),
            JSON.stringify(data),
        );
        const res = await this.getSender().send<IResponse>(requestDto);

        return this.setDtoData(dto, res.getJsonBody());
    }

    protected setDtoData(dto: ProcessDto<IInput>, response: IResponse): ProcessDto<IOutput> {
        return dto.setNewJsonData(response.fulfillment);
    }

}

export interface IInput {
    id: number;
    fulfillment: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        notify_customer?: boolean;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        tracking_info: {
            company?: string;
            number: string;
            url?: string;
        };
    }
}

export interface IResponse {
    fulfillment: IOutput
}

export type IOutput = IBaseOutput
