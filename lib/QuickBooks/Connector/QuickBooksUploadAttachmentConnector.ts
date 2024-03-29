import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import {
    IResultRanges,
    StatusRange,
} from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FormData from 'form-data';

export const NAME = 'quick-books-upload-attachment-connector';

export default class QuickBooksUploadAttachmentConnector<I extends IInput = IInput,
    O extends IOutput = IOutput> extends AConnector {

    protected codeRange?: IResultRanges | StatusRange = { success: 200 };

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<I>): Promise<ProcessDto<O>> {
        const { FileName, file, ...data } = dto.getJsonData();
        const metadata = {
            /* eslint-disable @typescript-eslint/naming-convention */
            AttachableRef: data.AttachableRef,
            FileName,
            ContentType: data.ContentType,
            /* eslint-enable @typescript-eslint/naming-convention */
        };

        const form = new FormData();

        form.append('file_metadata_01', JSON.stringify(metadata), { contentType: 'application/json' });
        form.append('file_content_01', Buffer.from(file, 'base64'), FileName);

        const request = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            '/upload',
            form,
        );

        const headers = request.getHeaders();
        delete headers?.[CommonHeaders.CONTENT_TYPE];
        request.setHeaders(headers);

        const response = await this.getSender().send<O>(request, this.codeRange);

        return dto.setNewJsonData(response.getJsonBody());
    }

}

export type IOutput = IResponse;

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    AttachableRef: {
        EntityRef: {
            type: string;
            value: string;
        };
    }[];
    FileName: string;
    file: string;
    ContentType?: string;
}

export interface IResponse {
    AttachableResponse: {
        Attachable: {
            SyncToken: string;
            domain: string;
            FileAccessUri: string;
            ThumbnailFileAccessUri: string;
            AttachableRef: {
                IncludeOnSend: boolean;
                EntityRef: {
                    type: string;
                    value: string;
                };
            }[];
            TempDownloadUri: string;
            MetaData: {
                CreateTime: string;
                LastUpdatedTime: string;
            };
            sparse: boolean;
            ContentType: string;
            FileName: string;
            Id: string;
            Size: number;
        };
    }[];
    time?: string;

}

/* eslint-enable @typescript-eslint/naming-convention */
