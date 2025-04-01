import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { StatusCodes } from 'http-status-codes';
import { checkErrorInResponse, ICO, jsonToXml, ResponseState, xmlToJson } from '../PohodaApplication';

export const LAST_RUN = 'lastRun';

export default abstract class APohodaListBatch<IInput, IOutput, Filter extends string> extends ABatchNode {

    protected abstract getKey(): string;

    protected abstract getSchema(): string;

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto<IOutput>> {
        const applicationInstall = await this.getApplicationInstallFromProcess(
            dto,
            await this.useInForm(dto) ? null : true,
        );
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            'xml',
            jsonToXml(await this.createData(dto, applicationInstall)),
        );

        const responseDto = await this.getSender().send(requestDto, [StatusCodes.OK]);
        const response = xmlToJson<IResponse<IOutput>>(responseDto.getBuffer());
        let items = this.getItems(response);

        items ??= [];

        if (!Array.isArray(items)) {
            items = [items];
        }

        dto.setItemList(items);

        if (items.length === await this.getLimit(dto)) {
            const item = items.pop() as Record<string, { id: string; }> | undefined;

            if (item) {
                dto.setBatchCursor(String(Number(item[`${this.getKey()}Header`].id) + 1));
            }
        } else {
            await this.setLastRun(dto);
        }

        return dto as unknown as Promise<BatchProcessDto<IOutput>>;
    }

    protected async createData(dto: BatchProcessDto<IInput>, applicationInstall: ApplicationInstall): Promise<object> {
        const itemKey = this.getKey();
        const listKey = `${itemKey.charAt(0).toUpperCase()}${itemKey.slice(1)}`;

        return {
            /* eslint-disable @typescript-eslint/naming-convention */
            'data:dataPack': {
                '@_xmlns:data': 'http://www.stormware.cz/schema/version_2/data.xsd',
                '@_xmlns:filter': 'http://www.stormware.cz/schema/version_2/filter.xsd',
                '@_xmlns:filterType': 'http://www.stormware.cz/schema/version_2/type.xsd',
                '@_xmlns:itemData': this.getSchema(),
                '@_id': 'Orchesty',
                '@_ico': applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][ICO],
                '@_application': 'Orchesty',
                '@_note': `${listKey}List`,
                '@_version': '2.0',
                ...await this.getCustomDataPackAttributes(dto),
                'data:dataPackItem': {
                    '@_id': 'Orchesty',
                    '@_version': '2.0',
                    ...await this.getCustomDataPackItemAttributes(dto),
                    [`itemData:list${listKey}Request`]: {
                        '@_version': '2.0',
                        [`@_${itemKey}Version`]: '2.0',
                        ...await this.getCustomListRequestAttributes(dto),
                        'itemData:limit': {
                            'filter:count': await this.getLimit(dto),
                            'filter:idFrom': await this.getOffset(dto),
                        },
                        [`itemData:request${listKey}`]: {
                            ...await this.getCustomRequestAttributes(dto),
                            ...this.processFilters(await this.getFilters(dto)),
                        },
                    },
                },
            },
            /* eslint-enable @typescript-eslint/naming-convention */
        };
    }

    protected getItems(response: IResponse<IOutput>): IOutput[] {
        const itemKey = this.getKey();
        const listKey = `list${itemKey.charAt(0).toUpperCase()}${itemKey.slice(1)}`;

        const { responsePack } = response;
        checkErrorInResponse(responsePack);

        const { responsePackItem } = responsePack;
        checkErrorInResponse(responsePackItem);

        const itemsList = responsePackItem[listKey];
        checkErrorInResponse(itemsList.importDetails?.detail);

        return itemsList[itemKey];
    }

    protected async getFilters(dto: BatchProcessDto<IInput>): Promise<IFilter<Filter>> {
        if (await this.useLastRun(dto)) {
            const lastRun = await this.getLastRun(dto);

            if (lastRun) {
                return {
                    // @ts-expect-error Intentionally
                    lastChanges: lastRun,
                };
            }
        }

        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getLimit(dto: BatchProcessDto<IInput>): Promise<number> {
        return 1_000;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async getOffset(dto: BatchProcessDto<IInput>): Promise<string> {
        return dto.getBatchCursor('0');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomDataPackAttributes(dto: BatchProcessDto<IInput>): Promise<object> {
        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomDataPackItemAttributes(dto: BatchProcessDto<IInput>): Promise<object> {
        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomListRequestAttributes(dto: BatchProcessDto<IInput>): Promise<object> {
        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomRequestAttributes(dto: BatchProcessDto<IInput>): Promise<object> {
        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getLastRunKey(dto: BatchProcessDto<IInput>): Promise<string> {
        return this.getKey();
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
    protected async useInForm(dto: BatchProcessDto<IInput>): Promise<boolean> {
        return false;
    }

    private processFilters(filters: IFilter<Filter>): object {
        if (!Object.keys(filters).length) {
            return {};
        }

        const rawFilter = 'filter:filter';
        const rawFilters: Record<string, Record<string, unknown>> = {
            [rawFilter]: {},
        };

        Object
            .entries(filters)
            .map(([key, value]) => {
                rawFilters[rawFilter][`filter:${key}`] = value;

                return undefined;
            });

        return rawFilters;
    }

}

export type IFilter<Filter extends string> = Partial<Record<Filter, string | { 'filterType:id': string }>>;

interface IResponse<IOutput> {
    responsePack: {
        responsePackItem: Record<string, Record<string, IOutput[]> & IResponsePackItemError>;
        state: ResponseState;
        note: string;
    };
}

interface IResponsePackItemError {
    importDetails: {
        detail: {
            state: ResponseState;
            note: string;
        };
    };
}
