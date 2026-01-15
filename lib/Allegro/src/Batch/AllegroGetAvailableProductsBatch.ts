import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'allegro-get-available-products-batch';
const LIMIT = 99;

export default class AllegroGetAvailableProductsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const offset = Number(dto.getBatchCursor('0'));
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `fulfillment/available-products?offset=${offset}&limit=${LIMIT}`;
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.products ?? []);
        if (response.count === LIMIT + 1) {
            dto.setBatchCursor((offset + LIMIT).toString());
        }

        return dto;
    }

}

interface IResponse {
    products: IOutput[];
    count: number;
    totalCount: number;
}

export interface IOutput {
    id: string;
    name: string;
    gtins: string[];
    image: string;
}
