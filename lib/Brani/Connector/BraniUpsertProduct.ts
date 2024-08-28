import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'brani-upsert-product';

export default class BraniUpsertProduct extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'products',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

interface Product {
    name: string;
    guid: string;
    creationTime: string;
    visibility: string;
    variants:
    {
        code: string;
        weight: string;
        name?: string;
        minStockSupply?: string;
        visible?: boolean;
        manufacturerCode?: string;
        pluCode?: string;
        ean?: string;
        isbn?: string;
        serialNo?: string;
        mpn?: string;
        negativeStockAllowed?: string;
        image?: string;
        amountDecimalPlaces?: number;
    }[]
    type?: 'product' | 'bazar' | 'service' | 'gift-certificate' | 'product-set';
    changeTime?: string;
    internalNote?: string;
    images?:
    {
        name: string;
        url: string;
        description?: string;
    }[],
    setItems?:
    {
        guid: string;
        code: string;
        amount: string;
    }[]
}

export type IInput = Product;
export type IOutput = Product;
