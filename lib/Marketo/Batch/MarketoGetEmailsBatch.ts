import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'marketo-get-emails-batch';
const MAX_RETURN = 200;

export default class MarketoGetEmailsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const offset = Number(dto.getBatchCursor('0'));
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `/asset/v1/emails.json?offset=${offset}&maxReturn=${MAX_RETURN}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.result ?? []);
        if (response.result.length >= MAX_RETURN) {
            dto.setBatchCursor((offset + MAX_RETURN).toString());
        }

        return dto;
    }

}

export interface IOutput {
    errors: {
        code: string;
        message: string;
    }[];
    requestId: string;
    result: {
        createdAt: string;
        description: string;
        folder: {
            id: number;
            type: string;
        };
        fromEmail: {
            type: string;
            value: string;
        };
        fromName: {
            type: string;
            value: string;
        };
        id: number;
        name: string;
        operational: boolean;
        publishToMSI: boolean;
        replyEmail: {
            type: string;
            value: string;
        };
        status: string;
        subject: {
            type: string;
            value: string;
        };
        template: number;
        textOnly: boolean;
        updatedAt: string;
        url: string;
        version: number;
        webView: boolean;
        workspace: string;
        autoCopyToText: boolean;
        isOpenTrackingDisabled: boolean;
        preHeader: string;
        ccFields: {
            attributeId: string;
            objectName: string;
            displayName: string;
            apiName: string;
        }[];
    }[];
    success: boolean;
    warnings: string[];
}
