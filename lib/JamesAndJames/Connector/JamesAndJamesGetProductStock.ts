import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'james-and-james-get-product-stock';

export default class JamesAndJamesGetProductStock extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IResponse>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'product/stock',
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    warehouses: {
        warehouse_id: number;
        products: {
            product_id: number;
            batches: {
                batch_id: number;
                pickable_stock: number;
                stored_stock: number;
                incoming_stock: number;
                moving_stock: number;
            }[];
        }[];
    }[];
}
/* eslint-enable @typescript-eslint/naming-convention */
