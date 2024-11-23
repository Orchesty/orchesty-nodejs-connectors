import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'marketo-get-files-connector';
const LIMIT = 200;

export default class MarketoGetFilesBatch extends ABatchNode {

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
            `/asset/v1/files.json?offset=${offset}&maxReturn=${LIMIT}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.result ?? []);
        if (response.result.length >= LIMIT) {
            dto.setBatchCursor((offset + LIMIT).toString());
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
            name: string;
            type: string;
        };
        id: number;
        mimeType: string;
        name: string;
        size: number;
        updatedAt: string;
        url: string;
    }[];
    success: true;
    warnings: {
        createdAt: string;
        description: string;
        folder: {
            id: number;
            name: string;
            type: string;
        };
        id: number;
        mimeType: string;
        name: string;
        size: number;
        updatedAt: string;
        url: string;
    }[];
}
