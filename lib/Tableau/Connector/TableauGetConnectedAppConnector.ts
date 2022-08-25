import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'tableau-get-connected-app-connector';

export default class TableauGetConnectedAppConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { siteId, clientId } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `sites/${siteId}/connected-applications/${clientId}`,
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody().connectedApplication);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    siteId: string;
    clientId: string;
}

interface IResponse {
    secret: {
        id: string;
        createdAt: string;
    };
    connectedApplication: IOutput;
}

export interface IOutput {
    name: string;
    enabled: true;
    clientId: string;
    projectId: string;
    createdAt: string;
    unrestrictedEmbedding: false;
}

/* eslint-enable @typescript-eslint/naming-convention */
