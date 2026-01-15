import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { StatusCodes } from 'http-status-codes';
import { ESHOP_ID } from '../MailstepApplication';

export const LAST_RUN = 'lastRun';

export default abstract class AMailstepListBatch<
    IInput,
    IOutput,
    Select extends string,
    Filter extends string,
    Sorter extends string,
> extends ABatchNode {

    protected abstract getUrl(): string;

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto<IOutput>> {
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            this.getUrl(),
            {
                select: await this.getSelects(dto),
                criteria: await this.getFilters(dto),
                sort: await this.getRawSorters(dto),
                limit: await this.getLimit(dto),
                offset: await this.getOffset(dto),
                nested: await this.getNested(dto),
            },
        );

        const responseDto = await this.getSender().send<IResponse<IOutput>>(requestDto, [StatusCodes.OK]);
        const response = responseDto.getJsonBody();

        if (await this.useAsBatch(dto)) {
            if (response.results.length) {
                dto.addItem(response.results);
            }
        } else {
            dto.setItemList(response.results);
        }

        if (response.paging.returned === await this.getLimit(dto)) {
            dto.setBatchCursor((Number(dto.getBatchCursor('1')) + 1).toString());
        } else {
            await this.setLastRun(dto);
        }

        return dto as unknown as Promise<BatchProcessDto<IOutput>>;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getSelects(dto: BatchProcessDto<IInput>): Promise<Select[]> {
        return [];
    }

    protected async getFilters(dto: BatchProcessDto<IInput>): Promise<IFilter<Filter>> {
        if (await this.useLastRun(dto)) {
            const lastRun = await this.getLastRun(dto);

            if (lastRun) {
                return {
                    // @ts-expect-error Intentionally
                    changedAt: {
                        gte: lastRun,
                    },
                };
            }
        }

        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getSorters(dto: BatchProcessDto<IInput>): Promise<ISorter<Sorter>> {
        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getLimit(dto: BatchProcessDto<IInput>): Promise<number> {
        return 1_000;
    }

    protected async getOffset(dto: BatchProcessDto<IInput>): Promise<number> {
        return (Number(dto.getBatchCursor('1')) - 1) * await this.getLimit(dto);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getNested(dto: BatchProcessDto<IInput>): Promise<boolean> {
        return false;
    }

    protected async getEshopId(dto: BatchProcessDto<IInput>): Promise<string> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        return applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][ESHOP_ID];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getLastRunKey(dto: BatchProcessDto<IInput>): Promise<string> {
        return this.getUrl();
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

        return applicationInstall.getNonEncryptedSettings()[LAST_RUN]?.[await this.getLastRunKey(dto)];
    }

    protected async setLastRun(dto: BatchProcessDto<IInput>): Promise<void> {
        if (!await this.useLastRun(dto)) {
            return;
        }

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        applicationInstall.addNonEncryptedSettings({
            [LAST_RUN]: {
                [await this.getLastRunKey(dto)]: new Date().toISOString(),
            },
        });

        await this.getDbClient().getApplicationRepository().update(applicationInstall);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async useAsBatch(dto: BatchProcessDto<IInput>): Promise<boolean> {
        return false;
    }

    private async getRawSorters(dto: BatchProcessDto<IInput>): Promise<IRawSorter[]> {
        return Object.entries(await this.getSorters(dto)).map(([field, order]) => ({
            field,
            order: order as unknown as IDirection, // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion
        }));
    }

}

export type IFilter<Filter extends string> = Partial<Record<Filter, ICondition>>;

export type ISorter<Sorter extends string> = Partial<Record<Sorter, IDirection>>;

interface ICondition {
    eq?: string | number;
    neq?: string | number;
    in?: string[] | number[];
    nin?: string[] | number[];
    like?: string | number;
    notLike?: string | number;
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number;
    null?: boolean;
}

interface IResponse<IOutput> {
    results: IOutput[];
    paging: {
        returned: number;
        from: number;
        to: number;
        total: number;
    };
}

interface IRawSorter {
    field: string;
    order: IDirection;
}

type IDirection = 'ASC' | 'DESC';
