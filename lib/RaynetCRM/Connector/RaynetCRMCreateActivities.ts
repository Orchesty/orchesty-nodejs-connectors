import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { getEntityType, IActivityData } from './RaynetCRMUniversalActivityDetail';

export const NAME = 'raynet-crm-create-activities';

export default class RaynetCRMCreateActivities extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const { entityName, ...data } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            getEntityType(entityName),
            data,
        );
        const resp = await this.getSender().send<IResponse>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput extends IActivityData {
    entityName: string;
}

export interface IResponse {
    success: boolean;
    data: {
        id: number;
    };
}
