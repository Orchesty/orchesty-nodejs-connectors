import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { NAME as WFLOW_APP_NAME, ORGANIZATION, ORGANIZATION_FORM } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-update-document-state-connector`;

export default class WflowUpdateDocumentStateConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const app = this.getApplication();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { documentId } = dto.getJsonData();

        const organization: string | undefined
            = appInstall.getSettings()[ORGANIZATION_FORM]?.[ORGANIZATION];

        const request = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            `/${organization}/documents/${documentId}/task/Export/processed`,
        );

        await this.getSender().send(request, [200]);
        return dto;
    }

}

export interface IInput {
    documentId: string;
}
