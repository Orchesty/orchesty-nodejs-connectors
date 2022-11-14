import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'xero-get-tracking-categories-batch';

export default class XeroGetTrackingCategoriesBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'TrackingCategories',
        );

        const response = await this.getSender().send<IResponse>(requestDto, [200]);

        this.setItemsListToDto(dto, response.getJsonBody().TrackingCategories);
        return dto;
    }

    protected setItemsListToDto(dto: BatchProcessDto, trackingCategories: TrackingCategory[]): void {
        dto.setItemList(trackingCategories);
    }

}

export type IOutput = TrackingCategory;

export interface IResponse {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TrackingCategories: TrackingCategory[];
}

export interface Option {
    /* eslint-disable @typescript-eslint/naming-convention */
    TrackingOptionID: string;
    Name: string;
    Status: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface TrackingCategory {
    /* eslint-disable @typescript-eslint/naming-convention */
    Name: string;
    Status: string;
    TrackingCategoryID: string;
    Options: Option[];
    /* eslint-enables @typescript-eslint/naming-convention */
}
