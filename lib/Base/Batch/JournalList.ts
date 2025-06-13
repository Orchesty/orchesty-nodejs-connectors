import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { ABaseBatch } from './ABaseBatch';

export const NAME = 'journal-list';

export default class JournalList extends ABaseBatch<IInput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getJournalList';
    }

    protected getParameters(dto: BatchProcessDto<IInput>, _page: number, _lastRun?: Date): object {
        const { lastLogId, logsTypes, orderId } = dto.getJsonData();

        /* eslint-disable @typescript-eslint/naming-convention */
        return {
            last_log_id: lastLogId,
            logs_types: logsTypes,
            order_id: orderId,
        };
        /* eslint-enable @typescript-eslint/naming-convention */
    }

    protected prepareLastRun(lastRun: string|null|undefined): Date|number|undefined {
        return lastRun ? Number(lastRun) : undefined;
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async processOutputData(dto: BatchProcessDto, body: IOutput): Promise<BatchProcessDto> {
        Object.values(body.logs).forEach((log) => {
            dto.addItem(log);
        });

        return dto;
    }

    protected hasNextPage(_jsonBody: IOutput): boolean {
        return false;
    }

    protected getNewLastRun(_jsonBody: IOutput): string {
        const lastLog = Object.values(_jsonBody.logs).pop();

        return String(lastLog?.log_id ?? 0);
    }

}

export interface IInput {
    lastLogId: number;
    logsTypes: number[];
    orderId?: number;
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface Log {
    log_id: number;
    log_type: number;
    order_id: number;
    object_id: number;
    date: number;
}

export interface IOutput {
    logs: Record<string, Log>
}
/* eslint-enable @typescript-eslint/naming-convention */
