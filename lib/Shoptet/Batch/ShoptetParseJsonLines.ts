import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import Zlib from 'zlib';
import { IOutput } from '../Connector/ShoptetJobFinishedWebhook';

export const NAME = 'shoptet-parse-json-lines';

export default class ShoptetParseJsonLines extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IOutput>): Promise<BatchProcessDto> {
        const { resultUrl, status, jobId } = dto.getJsonData();

        if (status !== 'completed') {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, `Job [jobId=${jobId}] from shoptet is not completed.`);
            return dto;
        }

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = (await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            resultUrl,
        )).addHeaders({ [CommonHeaders.ACCEPT_ENCODING]: 'gzip,deflate' });

        const response = await this.getSender().send(requestDto, [200]);
        const data = Zlib.gunzipSync(response.getBody()).toString().split('\n');

        do {
            const slicedData = data.splice(0, 100);

            const batchItem: unknown[] = [];
            slicedData.forEach((jsonLine) => {
                if (jsonLine) {
                    batchItem.push(JSON.parse(jsonLine));
                }
            });

            if (batchItem.length > 0) {
                this.addItem(dto, batchItem, dto.getUser());
            }
        } while (data.length > 0);

        return dto;
    }

    protected addItem(dto: BatchProcessDto, batchItem: unknown[], user: string | undefined): void {
        dto.addItem(batchItem, user);
    }

}
