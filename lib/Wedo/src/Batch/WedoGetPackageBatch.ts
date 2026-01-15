import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'wedo-get-package-batch';

export default class WedoGetPackageConnector extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            '/package',
        );
        const resp = await this.getSender().send<IOutput[]>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response);

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    order_number: string;
    reference_number: string;
    barcode: string[];
    sorting_code: string;
    product_name: string;
    delivery_price: number;
}

/* eslint-enable @typescript-eslint/naming-convention */
