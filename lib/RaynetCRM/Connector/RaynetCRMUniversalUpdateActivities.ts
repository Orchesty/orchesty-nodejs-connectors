import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { getEntityType } from './RaynetCRMUniversalActivityDetail';
import { IInput } from './RaynetCRMUniversalCreateActivities';

export const NAME = 'raynet-crm-universal-update-activities';

export default class RaynetCRMUniversalUpdateActivities extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const { entityName, ...data } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            `${getEntityType(entityName)}/${data.id}`,
            data,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IResponse {
    success: boolean;
}
