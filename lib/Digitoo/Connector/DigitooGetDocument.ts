import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { validate } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import Joi from 'joi';

export const NAME = 'digitoo-get-document';

const inputSchema = Joi.object({
    documentId: Joi.string().required(),
});

export default class DigitooGetDocument extends AConnector {

    public getName(): string {
        return NAME;
    }

    @validate(inputSchema)
    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { documentId } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `api/documents/${documentId}/file`,
        );
        const resp = await this.getSender().send(req, [200]);

        return dto.setNewJsonData({ file: resp.getBody() });
    }

}

export interface IInput {
    documentId: string;
}

export interface IOutput {
    file: string;
}
