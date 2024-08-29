import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'brani-list-webhooks';

export default class BraniListWebhooks extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto, null),
            HttpMethods.GET,
            'webhook',
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setItemList(resp.getJsonBody().webhook_urls);
    }

}

export interface IResponse {
    /* eslint-disable @typescript-eslint/naming-convention */
    webhook_urls: IOutput[];
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    event_type: 'balic_packed' | 'package_number' | 'order_history' | 'status_change';
    webhook_url: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}
