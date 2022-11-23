import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { ResultCodeRange } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'digitoo-get-document';

export default class DigitooGetDocument extends AConnector {

    public constructor(private readonly codeRange: ResultCodeRange[] = [200]) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    // TODO zjistit jestli nebude tady vadit ze prijde vic dat
    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { documentId } = this.getJsonData(dto) as IInput;

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `api/documents/${documentId}/file`,
        );
        const resp = await this.getSender().send(req, this.codeRange);

        return this.setNewJsonData(dto, resp) as ProcessDto<IOutput>;
    }

    protected getJsonData(dto: ProcessDto): unknown {
        return dto.getJsonData();
    }

    protected setNewJsonData(dto: ProcessDto, resp: ResponseDto): ProcessDto {
        return dto.setNewJsonData({ file: resp.getBody() });
    }

}

export interface IInput {
    documentId: string;
}

export interface IOutput {
    file: string;
}
