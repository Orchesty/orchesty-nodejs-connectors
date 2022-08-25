import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'tableau-create-connected-app-connector';

export default class TableauCreateConnectedAppConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'sites/site-id/connected-applications',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    name: string;
    enabled: string;
    projectId: string;
    domainSafelist: string;
    unrestrictedEmbedding: string;
}

export interface IOutput {
    name: string;
    enable: boolean;
    clientId: string;
    projectId: string;
    createdAt: string;
    unrestrictedEmbedding: boolean;
}
