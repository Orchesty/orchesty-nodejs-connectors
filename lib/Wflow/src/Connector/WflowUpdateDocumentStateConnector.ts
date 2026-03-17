import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import WflowApplication, { NAME as WFLOW_APP_NAME } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-update-document-state-connector`;

export default class WflowUpdateDocumentStateConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { documentId } = dto.getJsonData();
        const app = this.getApplication<WflowApplication>();
        const appInstall = await this.getApplicationInstallFromProcess(dto);

        const request = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            `/${app.getOrganization(appInstall)}/documents/${documentId}/task/Export/processed`,
        );

        await this.getSender().send(request, [200]);
        return dto;
    }

}

export interface IInput {
    documentId: string;
}

export type IOutput = IInput;
