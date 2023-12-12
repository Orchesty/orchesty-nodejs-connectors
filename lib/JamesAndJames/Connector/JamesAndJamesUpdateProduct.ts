import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'james-and-james-update-product';

export default class JamesAndJamesUpdateProduct extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { productId, ...data } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PATCH,
            `product/${productId}`,
            data,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    productId: string;
    product?: {
        name?: string;
        reference?: string;
        price?: number;
        cost?: number;
        harmonised_code?: string;
        customs_description?: string;
        country_of_origin?: string;
        un_number?: string;
        url?: string;
        requires_bubblewrap?: boolean;
    };
}

export interface IOutput {
    data: {
        id: number;
        name: string;
        reference: string;
        price: number;
        cost: number;
        harmonised_code: string;
        customs_description: string;
        country_of_origin: string;
        un_number: string;
        url: string;
        requires_bubblewrap: boolean;
        barcode: string;
        is_retired: boolean;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
