import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import UpgatesApplication from '../UpgatesApplication';

const UPDATE_STOCK_ENDPOINT = 'api/v2/products';

export const NAME = 'upgates-update-stock';

export default class UpgatesUpdateStock extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const app = this.getApplication<UpgatesApplication>();
        const {
            data,
        } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            UPDATE_STOCK_ENDPOINT,
            JSON.stringify(data),
        );

        const { products } = (await this.getSender().send<IResponseJson>(requestDto)).getJsonBody();

        return dto.setNewJsonData(products);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    data: IUpdateStock;
}

interface IUpdateStock {
    products?: {
        code: string;
        stock: number;
    }[];
    variants?: {
        code: string;
        stock: number;
    }[];
}

interface IResponseJson {
    products: {
        code: string;
        updated_yn: boolean;
    }[];
}
