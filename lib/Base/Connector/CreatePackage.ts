import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseConnector from './ABaseConnector';

export const NAME = 'create-package';

export default class CreatePackage extends ABaseConnector<IInput, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'createPackage';
    }

    protected getParameters(dto: ProcessDto<IInput>): object {
        const { orderId, courierCode, accountId, fields, packages } = dto.getJsonData();

        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            order_id: orderId,
            courier_code: courierCode,
            account_id: accountId,
            fields,
            packages: packages.map((item) => ({
                length: item.length,
                height: item.height,
                width: item.width,
                weight: item.weight,
                size_custom: item.sizeCustom,
            })),
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

}

export interface IInput {
    orderId: number;
    courierCode: string;
    accountId: number;
    fields: {
        id: string;
        value: string;
    }[],
    packages:
    {
        length:number;
        height:number;
        width:number;
        weight:number;
        sizeCustom:number;
    }[]
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    package_id: number;
    package_number: string;
    courier_inner_number: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
