import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export const NAME = 'authentica-get-stock';

export default class AuthenticaGetStock extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const page = dto.getBatchCursor('1');
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `stock?page=${page}&limit=50`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        if (resp.getResponseCode() === 204) {
            dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, 'Empty body!');
            return dto;
        }

        const response = resp.getJsonBody();

        this.setItemsListToDto(dto, response.data ?? []);
        if (response?.meta?.totalPages === undefined || response.meta.totalPages === null) {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'Response not equal meta.totalPages');
            return dto;
        }

        if (Number(page) < response.meta.totalPages) {
            dto.setBatchCursor((Number(page) + 1).toString());
        }

        return dto;
    }

    protected setItemsListToDto(dto: BatchProcessDto, responseBody: IOutput[]): void {
        dto.setItemList(responseBody);
    }

}

interface IResponse {
    data: IOutput[];
    links: {
        first: string;
        last: string;
        prev?: string | null;
        next?: string | null;

    };
    meta: {
        totalPages: number;
    };
}

export interface IOutput {
    sku: string;
    productId: string;
    timestamp: string;
    inStock?: string;
    inStockDelta?: string;
}
