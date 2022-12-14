import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'shoptet-update-stock-movements';

export default class ShoptetUpdateStockMovements extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { stockId, data } = dto.getJsonData();
        const req = await this.getApplication()
            .getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.PATCH,
                `api/stocks/${stockId}/movements`,
                JSON.stringify({ data }),
            );
        const resp = await this.getSender()
            .send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    stockId: string;
    data: {
        productCode: string;
        quantity: number;
    }[];
}

export interface IOutput {
    data: null;
    errors: {
        errorCode: string;
        message: string;
        instance: string;
    }[];
}
