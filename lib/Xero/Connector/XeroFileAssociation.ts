import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import {
    IResultRanges,
    StatusRange,
} from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'xero-file-association';

export default class XeroFileAssociation<I extends IInput = IInput, O extends IOutput = IOutput> extends AConnector {

    protected codeRange?: IResultRanges | StatusRange = { success: 200 };

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<I>): Promise<ProcessDto<IErrorResponse | O>> {
        const { FileId, ObjectGroup, ObjectId } = dto.getJsonData();
        const req = await this.getApplication()
            .getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.POST,
                `https://api.xero.com/files.xro/1.0/Files/${FileId}/Associations`,
                {
                    /* eslint-disable @typescript-eslint/naming-convention */
                    ObjectId,
                    ObjectGroup,
                    /* eslint-enable @typescript-eslint/naming-convention */
                },
            );
        const response = await this.getSender().send<IErrorResponse | O>(req, this.codeRange);

        return dto.setNewJsonData(response.getJsonBody());
    }

}

export interface IInput {
    /* eslint-disable @typescript-eslint/naming-convention */
    FileId: string;
    ObjectId: string;
    ObjectGroup: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface IResponse extends IInput {

    ObjectType: string;

}

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

export type IOutput = IResponse;
