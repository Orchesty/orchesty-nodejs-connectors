import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'digitoo-mark-as-exported';

export default class DigitooMarkAsExported extends AConnector {

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
            `api/documents/${documentId}/mark-as-exported`,
            body,
        );
        const res = await this.getSender().send(req, [200]);

        dto.setNewJsonData(res.getJsonBody());
        return dto;
    }

}

export interface IInput {
    documentId: string;
    internal_erp_id: string;
}
