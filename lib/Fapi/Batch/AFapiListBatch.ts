import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { DateTime } from 'luxon';

const LAST_RUN = 'lastRun';

export default abstract class AFapiListBatch<IInput, IOutput> extends ABatchNode {

    protected abstract getUrl(): string;

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto<IOutput>> {
        let url = `${this.getUrl()}?limit=${await this.getLimit(dto)}&offset=${await this.getOffset(dto)}`;

        if (await this.useLastRun(dto)) {
            const lastRun = await this.getLastRun(dto);

            if (lastRun) {
                url = `${url}&last_modified_after=${lastRun}`;
            }
        }

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            url,
        );

        const responseDto = await this.getSender().send<IResponse<IOutput>>(requestDto, [200]);
        const response = responseDto.getJsonBody();
        const items = response[this.getUrl().replace('-', '_')];
        dto.setItemList(items);

        if (items.length === await this.getLimit(dto)) {
            dto.setBatchCursor((Number(dto.getBatchCursor('1')) + 1).toString());
        } else {
            await this.setLastRun(dto);
        }

        return dto as unknown as Promise<BatchProcessDto<IOutput>>;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getLimit(dto: BatchProcessDto<IInput>): Promise<number> {
        return 1_000;
    }

    protected async getOffset(dto: BatchProcessDto<IInput>): Promise<number> {
        return (Number(dto.getBatchCursor('1')) - 1) * await this.getLimit(dto);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async useLastRun(dto: BatchProcessDto<IInput>): Promise<boolean> {
        return false;
    }

    protected async getLastRun(dto: BatchProcessDto<IInput>): Promise<string | undefined> {
        if (!await this.useLastRun(dto)) {
            return undefined;
        }

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const lastRun = applicationInstall.getNonEncryptedSettings()[LAST_RUN]?.[this.getUrl()];

        if (!lastRun) {
            return undefined;
        }

        return DateTime.fromISO(lastRun).toFormat('yyyy-MM-dd HH:mm:ss');
    }

    protected async setLastRun(dto: BatchProcessDto<IInput>): Promise<void> {
        if (!await this.useLastRun(dto)) {
            return;
        }

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        applicationInstall.addNonEncryptedSettings({
            [LAST_RUN]: {
                [this.getUrl()]: new Date().toISOString(),
            },
        });

        await this.getDbClient().getApplicationRepository().update(applicationInstall);
    }

}

type IResponse<IOutput> = Record<string, IOutput[]>;
