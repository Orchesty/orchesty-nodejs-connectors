import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-get-product-batch-warehouses';

export default class SupplyDoGetProductBatchWarehouse extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        let url = 'items/product_batch_warehouse';
        const params = this.uriParams(dto);
        if (params) {
            url = `${url}?${params}`;
        }

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            url,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return this.processResponseData(dto, resp.getJsonBody());
    }

    protected uriParams(_dto: ProcessDto): string | null {
        // example: 'filter[ecommerce][_eq]=_dto.getUser()'
        return null;
    }

    protected processResponseData(_dto: ProcessDto, response: IResponse): ProcessDto<IOutput> {
        return _dto.setNewJsonData(response.data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface ProductBatchWarehouse {
    product_batch: number;
    quantity: number;
    warehouse: number;
    updated_at: string;
    ecommerce: number;
    stocked_at: string;
    id?: number;
}

export interface IResponse {
    data: ProductBatchWarehouse[];
}

export type IOutput = ProductBatchWarehouse[];
/* eslint-enable @typescript-eslint/naming-convention */
