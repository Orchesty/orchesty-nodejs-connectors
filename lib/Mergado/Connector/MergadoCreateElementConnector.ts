import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'mergado-create-element-connector';

export default class MergadoCreateElementConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id, ...body } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `projects/${id}/elements`;
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
        const resp = await this.getSender().send<IOutput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    id: string;
    name: string;
    hidden: boolean;
}

export interface IOutput {
    id: string;
    project_id: string;
    name: string;
    type: string;
    hidden: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
