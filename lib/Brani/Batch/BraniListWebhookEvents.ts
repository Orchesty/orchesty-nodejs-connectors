import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { StatusCodes } from 'http-status-codes';

export const NAME = 'brani-list-webhook-events';

const ITEM_PER_PAGE = 1000;

export default class BraniListWebhookEvents extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { webhookId, onlyFailed } = dto.getJsonData();

        const page = dto.getBatchCursor('1');

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto, null),
            HttpMethods.GET,
            `webhook/events/${webhookId}?only_failed=${onlyFailed}&items_per_page=${ITEM_PER_PAGE}&page_number=${page}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200, 406]);
        if (resp.getResponseCode() === StatusCodes.NOT_ACCEPTABLE) {
            return dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, 'Page does not exists.');
        }

        const data = resp.getJsonBody();

        dto.setItemList(data.webhook_events);

        if (data.items_on_current_page >= ITEM_PER_PAGE) {
            dto.setBatchCursor(String(Number(page) + 1));
        }

        return dto;
    }

}

export interface IInput {
    webhookId: string|number;
    onlyFailed: boolean;
}

export interface IResponse {
    /* eslint-disable @typescript-eslint/naming-convention */
    webhook_events: IOutput[];
    total_items: number;
    items_per_page: number;
    page: number;
    items_on_current_page: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    webhook_id: number;
    event_creation: string;
    order_code: string;
    event_status_id: number;
    event_package_number: string;
    event_order_history: string;
    date_successful: string;
    date_last_failed: string;
    last_errors: {
        message: string;
        status_code: number;
    },
    fail_counter: number;
    processed: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}
