import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'authentica-put-products';

export default class AuthenticaPutProducts extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutputItem[]>> {
        const { products } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            'products',
            products,
        );

        const response = (await this.getSender().send<IResponse>(requestDto, [200])).getJsonBody();

        return dto.setNewJsonData(response.data);
    }

}

export interface IProduct {
    sku: string;
    name: string;
    englishName: string;
    ean: string;
    width: number;
    widthUnit: string;
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
}

interface IResponse {
    data: IProduct[];
}

export interface IInput {
    products: IProduct[];
}

export type IOutputItem = IProduct;
