import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';

export abstract class FlexiBeeSimpleIterator<T> extends ABatchNode {

    protected abstract endpoint: string;

    protected iterateOnly = false;

    protected pageSize = 100;

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const app = this.getApplication<FlexiBeeApplication>();

        const page = Number(dto.getBatchCursor('0'));
        const url = `${this.endpoint}.json?add-row-count=true&start=${page * this.pageSize}&limit=${this.pageSize}`;

        const request = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            app.getUrl(appInstall, url),
        );

        const response = await this.getSender().send<Response>(request);
        const data = response.getJsonBody().winstrom;
        // eslint-disable-next-line
        const items = (data as any)[this.endpoint] as T[];
        await this.processItems(items);

        const rows = Number(data['@rowCount']);
        const pages = Math.ceil(rows / this.pageSize);
        if (pages > (page + 1)) {
            dto.setBatchCursor(String(page + 1), this.iterateOnly);
        } else {
            dto.removeBatchCursor();
        }

        return dto.setItemList(items);
    }

    // eslint-disable-next-line
    protected async processItems(_items: T[]): Promise<void> {
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

interface Response {
    winstrom: {
        '@rowCount': string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
