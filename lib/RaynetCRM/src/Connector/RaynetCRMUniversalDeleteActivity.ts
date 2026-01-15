import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { getEntityType } from './RaynetCRMUniversalActivityDetail';
import { IResponse } from './RaynetCRMUniversalUpdateActivity';

export const NAME = 'raynet-crm-universal-delete-activity';

export default class RaynetCRMUniversalDeleteActivity extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const { entityName, id } = dto.getJsonData();
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.DELETE,
            `${getEntityType(entityName)}/${id}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    entityName: string;
    id: number;
}
