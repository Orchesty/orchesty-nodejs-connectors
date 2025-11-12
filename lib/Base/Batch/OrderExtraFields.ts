import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { ABaseBatch } from './ABaseBatch';

export const NAME = 'order-extra-fields';

export default class OrderExtraFields extends ABaseBatch<unknown> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getOrderExtraFields';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getParameters(dto: BatchProcessDto): Promise<object> {
        return {};
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async processOutputData(dto: BatchProcessDto, body: IOutput): Promise<BatchProcessDto> {
        Object.values(body.extra_fields).forEach((extraField) => {
            dto.addItem(extraField);
        });

        return dto;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected hasNextPage(jsonBody: IOutput): boolean {
        return false;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    extra_fields: {
        extra_field_id: number;
        name: string;
        editor_type: string;
    }[];
}
/* eslint-enable @typescript-eslint/naming-convention */
