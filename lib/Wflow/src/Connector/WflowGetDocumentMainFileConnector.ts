import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { NAME as WFLOW_APP_NAME, ORGANIZATION, ORGANIZATION_FORM } from '../WflowApplication';

export const NAME = `${WFLOW_APP_NAME}-get-document-main-file-connector`;

export default class WflowGetDocumentMainFileConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { documentId } = dto.getJsonData();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const organization = applicationInstall.getSettings()[ORGANIZATION_FORM]?.[ORGANIZATION];

        const requestDto = (await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            `/${organization}/documents/${documentId}/files/main/download`,
        )).addHeaders({ [CommonHeaders.ACCEPT]: 'application/octet-stream' });

        const responseDto = await this.getSender().send(requestDto, [200]);

        return dto.setData(responseDto.getBody());
    }

}

export interface IInput {
    documentId: string;
}
