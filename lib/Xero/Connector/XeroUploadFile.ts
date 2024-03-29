import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { IResultRanges, StatusRange } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
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

export default class XeroUploadFile<I extends IInput = IInput, O extends IOutput = IOutput> extends AConnector {

    protected codeRange?: IResultRanges | StatusRange = { success: 200 };

    public getName(): string {
        return NAME;
    }

    @validate(inputSchema)
    public async processAction(dto: ProcessDto<I>): Promise<ProcessDto<IErrorResponse | O>> {
        const { file, fileName } = dto.getJsonData();

        const form = new FormData();
        form.append(fileName, Buffer.from(file, 'base64'), fileName);

        const request = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'https://api.xero.com/files.xro/1.0/Files',
            form,
        );

        const headers = request.getHeaders();
        delete headers?.[CommonHeaders.CONTENT_TYPE];
        request.setHeaders(headers);

        const response = await this.getSender().send<IErrorResponse | O>(request, this.codeRange);

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

export interface IErrorResponse {
    /* eslint-disable @typescript-eslint/naming-convention */
    ErrorNumber: number;
    Type: string;
    Message: string;
    Elements: {
        ValidationErrors: { Message: string }[];
    }[];
    /* eslint-enable @typescript-eslint/naming-convention */
}
