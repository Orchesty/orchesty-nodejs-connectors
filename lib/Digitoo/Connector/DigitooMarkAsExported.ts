import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'digitoo-mark-as-exported';

export default class DigitooMarkAsExported extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { documentId, ...body } = this.getJsonData(dto) as IInput;

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            `api/documents/${documentId}/mark-as-exported`,
            body,
        );
        const res = await this.getSender().send(req, [200]);

        return this.setNewJsonData(dto, res);
    }

    protected getJsonData(dto: ProcessDto): unknown {
        return dto.getJsonData();
    }

    protected setNewJsonData(dto: ProcessDto, resp: ResponseDto): ProcessDto {
        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    documentId: string;
    internal_erp_id: string;
}
