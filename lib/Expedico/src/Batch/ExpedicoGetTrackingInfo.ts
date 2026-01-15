import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'expedico-get-tracking-info';

export default class ExpedicoGetTrackingInfo extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const { parcelIds } = dto.getJsonData();

        const req = await this.getApplication()
            .getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.POST,
                'parcels_tracking',
                {
                    data: {
                        parcel_ids: parcelIds,
                    },
                },
            );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const respData = resp.getJsonBody();

        dto.setItemList(Object.values(respData.data));

        return dto;
    }

}

interface IResponse {
    data: Record<string, IParcelTracking>;
}

export interface IParcelTracking {
    parcelStatusId: number;
    trackingHistory: {
        attributes: {
            dateTime: string;
            parcelId: number;
            parcelStatusId: number;
            statusDescription?: unknown;
            trackingCode: string;
        };
        relationships: {
            packet: {
                links: {
                    related: string;
                };
            };
        };
        type: string;
    }[];
}

export interface IInput {
    parcelIds: number[];
}
