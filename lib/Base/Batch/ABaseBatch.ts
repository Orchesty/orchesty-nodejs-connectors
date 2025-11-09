import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import FormData from 'form-data';
import { SUCCESS } from '../Connector/ABaseConnector';

export abstract class ABaseBatch<T> extends ABatchNode {

    protected abstract getMethod(): string;

    protected abstract processOutputData(dto: BatchProcessDto, body: object): Promise<BatchProcessDto>;

    protected abstract hasNextPage(jsonBody: object): boolean;

    public async processAction(dto: BatchProcessDto<T>): Promise<BatchProcessDto> {
        let page = Number(dto.getBatchCursor('1'));

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const lastRun = appInstall.getNonEncryptedSettings()[this.getLastRunKey()] as string | undefined;

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            undefined,
            this.prepareBody(this.getMethod(), await this.getParameters(dto, page, this.prepareLastRun(lastRun))),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const { status, ...jsonBody } = resp.getJsonBody();
        if (status !== SUCCESS) {
            throw new Error(`Request failed. Reason: ${resp.getBody()}`);
        }

        await this.processOutputData(dto, jsonBody);

        const hasNextPage = this.hasNextPage(jsonBody);
        if (hasNextPage) {
            page++;
            dto.setBatchCursor(String(page));
        } else {
            dto.removeBatchCursor();

            appInstall.addNonEncryptedSettings({ [this.getLastRunKey()]: this.getNewLastRun(jsonBody, lastRun) });
            const repo = this.getDbClient().getApplicationRepository();
            await repo.update(appInstall);
        }

        return dto;
    }

    protected getLastRunKey(): string {
        return this.getMethod();
    }

    protected prepareLastRun(lastRun: string|null|undefined): Date|number|undefined {
        return lastRun ? new Date(lastRun) : undefined;
    }

    protected getNewLastRun(_jsonBody: object, _lastRun?: string): string {
        return new Date().toISOString();
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async getParameters(_dto: BatchProcessDto<T>, _page: number, _lastRun?: Date|number): Promise<object> {
        return [];
    }

    protected prepareBody(method: string, parameters: object): FormData {
        const body = new FormData();
        body.append('method', method);
        body.append('parameters', JSON.stringify(parameters));

        return body;
    }

}

export interface IResponse {
    status: string;
}
