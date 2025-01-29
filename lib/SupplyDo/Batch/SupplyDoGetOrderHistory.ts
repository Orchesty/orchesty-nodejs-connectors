import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'supply-do-get-order-history';
export const LAST_RUN_KEY = 'lastRunListOrders';
export const LIMIT = 1000;

export default class SupplyDoGetOrderHistory extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const ecommerce = dto.getUser();
        const page = Number(dto.getBatchCursor('0'));

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'items/selling_order_history?fields[]=*&fields[]=*.*&fields[]=selling_order.transport.*'
            + `${this.addStatusFilter(dto)}&filter[selling_order][ecommerce][_eq]=${ecommerce}${this.addLastRunFilter(dto, appInstall)}${this.addOrderNumberFilter(dto)}&sort=-date`
            + `&limit=${LIMIT}&offset=${page * LIMIT}&meta=filter_count`,
        );

        const resp = await this.getSender().send<IResponse>(req, [200]);
        const { meta } = resp.getJsonBody();

        if (meta.filter_count && meta.filter_count > LIMIT * (page + 1)) {
            dto.setBatchCursor(String(page + 1));
        } else {
            appInstall.addNonEncryptedSettings({
                [LAST_RUN_KEY]: new Date().toISOString(),
            });
            await this.getDbClient().getApplicationRepository().update(appInstall);
        }

        return this.setItemList(dto, resp);
    }

    protected setItemList(dto: BatchProcessDto, resp: ResponseDto<IResponse>): BatchProcessDto {
        return dto.setItemList(resp.getJsonBody().data);
    }

    protected addStatusFilter(_dto: BatchProcessDto): string {
        return '&filter[type][_nin]=new,hold,canceled';
    }

    protected addLastRunFilter(_dto: BatchProcessDto<IInput>, appInstall: ApplicationInstall): string {
        const { orderNumber } = _dto.getJsonData();
        const lastRun = appInstall.getNonEncryptedSettings()[LAST_RUN_KEY] ?? new Date(0).toISOString();
        if (orderNumber) {
            return '';
        }

        return `&filter[_or][1][date_created][_gte]=${lastRun}&filter[_or][2][date_updated][_gte]=${lastRun}`;
    }

    protected addOrderNumberFilter(_dto: BatchProcessDto<IInput>): string {
        const { orderNumber } = _dto.getJsonData();
        if (orderNumber) {
            return `&filter[selling_order][order_number][_eq]=${orderNumber}`;
        }

        return '';
    }

}

export interface IInput {
    orderNumber?: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    date: string;
    id: number;
    type: string;
    selling_order: {
        customer: number;
        id: string;
        payment_type: string;
        external_id: string;
        ecommerce: number;
        history: number[];
        products: number[];
        transport: {
            carrier: number;
            id: number;
            tracking_number: string;
            ecommerce: number;
        };
    };
}

export interface IResponse {
    data: IOutput[];
    meta: {
        filter_count?: number;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
