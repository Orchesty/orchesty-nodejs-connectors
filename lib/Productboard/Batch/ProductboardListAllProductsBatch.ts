import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { BASE_URL } from '../ProductboardApplication';

export const NAME = 'productboard-list-all-products-batch';
export default class ProductboardListAllProductsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = dto.getBatchCursor('products?pageLimit=100&pageOffset=0');
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.data ?? []);
        if (response.links.next) {
            dto.setBatchCursor(response.links.next.replace(`${BASE_URL}/`, ''));
        }

        return dto;
    }

}

interface IResponse {
    data: IOutput[];
    links: {
        next: string;
    };
}

export interface IOutput {
    data: {
        id: string;
        name: string;
        description: string;
        owner: {
            email: string;
        };
        links: {
            self: string;
            html: string;
        };
    }[];
    links: {
        next: string;
    };
}
