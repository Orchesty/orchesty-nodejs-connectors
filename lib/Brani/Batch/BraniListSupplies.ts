import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'brani-list-supplies';

export class BraniListSupplies extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { locationName, productCode } = dto.getJsonData();

        let query = '';
        if (locationName) {
            query = `?location_name=${locationName}`;
        }

        if (productCode) {
            query = `${query}${query === '' ? '' : '&'}product_code=${productCode}`;
        }

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `stock/supplies${query}`,
        );
        const resp = await this.getSender().send<IOutput[]>(req, [200]);

        return dto.setItemList(resp.getJsonBody());
    }

}

export interface IInput {
    locationName?: string;
    productCode?: string;
}

export interface IOutput {
    /* eslint-disable @typescript-eslint/naming-convention */
    code: string;
    location_name: string;
    amount: number;
    /* eslint-enable @typescript-eslint/naming-convention */
}
