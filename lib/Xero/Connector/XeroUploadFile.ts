import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { validate } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import FormData from 'form-data';
import Joi from 'joi';

export const NAME = 'xero-upload-file';

const inputSchema = Joi.object({
    file: Joi.string().required(),
    fileName: Joi.string().required(),
});

export default class XeroUploadFile extends AConnector {

    public getName(): string {
        return NAME;
    }

    @validate(inputSchema)
    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { file, fileName } = dto.getJsonData();

        const form = new FormData();
        form.append(fileName, file, fileName);

        const request = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'https://api.xero.com/files.xro/1.0/Files',
            form,
        );

        const headers = request.getHeaders() as Record<string, string>;
        delete headers?.[CommonHeaders.CONTENT_TYPE];
        request.setHeaders(headers);

        const response = await this.getSender().send<IResponse>(request, [200]);

        return dto.setNewJsonData(response.getJsonBody());
    }

}

export type IOutput = IResponse;

export interface IInput {
    file: string;
    fileName: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    Name: string;
    MimeType: string;
    Size: number;
    CreatedDateUtc: string;
    UpdatedDateUtc: string;
    User: {
        Name: string;
        FirstName: string;
        LastName: string;
        FullName: string;
        Id: string;
    };
    FolderId: string;
    Id: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
