import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import WflowApplication, { NAME as WFLOW_APP_NAME } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-get-document-main-file-connector`;

export default class WflowGetDocumentMainFileConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { documentId } = dto.getJsonData();
        const application = this.getApplication<WflowApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const requestDto = application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            `/${application.getOrganization(applicationInstall)}/documents/${documentId}/files/main/download`,
        ).addHeaders({ [CommonHeaders.ACCEPT]: 'application/octet-stream' });

        const responseDto = await this.getSender().send(requestDto, [200]);

        return dto.setNewJsonData({ file: responseDto.getBuffer().toString('base64') });
    }

}

export interface IInput {
    documentId: string;
}

export interface IOutput {
    file: string;
}
