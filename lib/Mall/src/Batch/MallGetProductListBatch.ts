import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'mall-get-product-list-batch';

export default class MallGetProductListBatch extends ABatchNode {

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
            `products?page=${page}&page_size=1000&filter=basic`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.data ?? []);
        if (Number(page) !== response.paging.pages) {
            dto.setBatchCursor((Number(page) + 1).toString());
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    result: {
        code: number;
        status: string;
    };
    paging: {
        total: number;
        pages: number;
        size: number;
        page: number;
    };
    data: IOutput[];
}

export interface IOutput {
    id: string;
    product_id: number;
    title: string;
    status: string;
    stage: string;
    in_stock: number;
    category_id: string;
    price: number;
    rrp: number;
    variants_count: number;
    has_variants: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
