import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseConnector from './ABaseConnector';

export const NAME = 'courier-fields';

export default class CourierFields extends ABaseConnector<IInput, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getCourierFields';
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async getParameters(dto: ProcessDto<IInput>): Promise<object> {
        const { courierCode } = dto.getJsonData();

        return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            courier_code: courierCode,
        };
    }

}

export interface IInput {
    courierCode: string
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    multi_packages: false,
    fields: {
        id: string;
        name: string;
        type: string;
        desc?: string;
        value?: string|number;
        options?: Record<number, string>;
        show_field?: unknown;
    }[],
    package_fields:
    {
        id: string;
        name: string;
        type: string;
        options?: Record<number, string>;
        default?: number;
    }[]
}
/* eslint-enable @typescript-eslint/naming-convention */
