import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'digitoo-mark-as-export-errored';

export default class DigitooMarkAsExportErrored extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { documentId, ...body } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            `api/documents/${documentId}/mark-as-export-errored`,
            body,
        );
        await this.getSender().send(req, [200]);

        dto.setNewJsonData({});
        return dto;
    }

}

export interface IInput {
    documentId: string;
    message: string;
}
