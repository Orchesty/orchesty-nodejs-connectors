import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { getEntityType } from './RaynetCRMUniversalActivityDetail';
import { IInput } from './RaynetCRMUniversalCreateActivity';

export const NAME = 'raynet-crm-universal-update-activity';

export default class RaynetCRMUniversalUpdateActivity extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const { entityName, ...data } = dto.getJsonData();

        delete data.owner;
        delete data['rowInfo.updatedAt'];
        if (entityName.toLowerCase() === 'task' && data.participants?.length) {
            data.resolver = data.participants[0].id;
        }

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
