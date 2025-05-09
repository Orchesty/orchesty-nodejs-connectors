import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';

export abstract class FlexiBeeSimpleIterator<T> extends ABatchNode {

    protected abstract endpoint: string;

    protected iterateOnly = false;

    protected pageSize = 100;

    protected relations: string[] = [];

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const app = this.getApplication<FlexiBeeApplication>();

        // eslint-disable-next-line
        const { lastUpdate } = dto.getJsonData() as any;
        let url = this.endpoint;
        if (lastUpdate) {
            url = `${url}/${encodeURI(`(lastUpdate > ${lastUpdate})`)}`;
        }

        const page = Number(dto.getBatchCursor('0'));
        url = `${url}.json?detail=full&add-row-count=true&start=${page * this.pageSize}&limit=${this.pageSize}`;
        if (this.relations.length) {
            url = `${url}&relations=${this.relations.join(',')}`;
        }

        const request = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            app.getUrl(appInstall, url),
        );

        const response = await this.getSender().send<Response>(request);
        const data = response.getJsonBody().winstrom;
        // eslint-disable-next-line
        const items = ((data as any)[this.endpoint] || []) as T[];
        await this.processItems(dto, items);

        const rows = Number(data['@rowCount']);
        const pages = Math.ceil(rows / this.pageSize);
        if (pages > (page + 1)) {
            dto.setBatchCursor(String(page + 1), this.iterateOnly);
        } else {
            dto.removeBatchCursor();
        }

        return dto.setItemList(items, this.iterateOnly);
    }

    protected async processItems(_dto: BatchProcessDto, _items: T[]): Promise<void> {
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

interface Response {
    winstrom: {
        '@rowCount': string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
