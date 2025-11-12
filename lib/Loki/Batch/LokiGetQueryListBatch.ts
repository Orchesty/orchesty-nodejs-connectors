import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { NAME as APPLICATION_NAME } from '../LokiApplication';

export const NAME = `${APPLICATION_NAME}-get-query-list-batch`;

export default class LokiGetQueryListBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const boundaryTimestamp = dto.getBatchCursor();

        const { query, limit, start, end, since, interval, step, direction } = dto.getJsonData();

        const params = new URL('');

        params.searchParams.set('query', query);

        if (start || (boundaryTimestamp && direction === 'forward')) {
            params.searchParams.set('start', (direction === 'forward' ? boundaryTimestamp : String(start)));
        }
        if (end || (boundaryTimestamp && direction !== 'backward')) {
            params.searchParams.set('end', (direction === 'forward' ? String(end) : boundaryTimestamp));
        }
        if (limit) params.searchParams.set('limit', String(limit));
        if (since) params.searchParams.set('since', since);
        if (interval) params.searchParams.set('interval', String(interval));
        if (step) params.searchParams.set('step', String(step));
        if (direction) params.searchParams.set('direction', direction);

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `/loki/api/v1/query_range${params.search}`,
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto);

        const { status, data } = responseDto.getJsonBody();

        if (status !== 'success') {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'Unexpected error occured during LogQL query execution');
            return dto;
        }

        if (data.resultType === 'streams' && data.result.values.length === (limit ?? 100)) {
            // The direction determines the order of items in response. If the direction is forward, then first item is the
            // oldest so the timestamp of last item should be used to determine next page. If the direction is backward then
            // the most recent item is first and again the last item's timestamp should be used for next page.
            // The only difference is the adding or substracting 1 to/from selected timestamp, which can be resolved by direction
            dto.setBatchCursor(String(Number(data.result.values[data.result.values.length - 1][0]) + (direction === 'forward' ? 1 : -1)));
        }

        return dto.setItemList(data.result.values.map((item) => item[1]) ?? []);
    }

}

type Duration = `${number}${'ns' | 'us' | 'µs' | 'ms' | 's' | 'm' | 'h'}`

export interface IInput {
    /** LogQL query to retrieve data */
    query: string;
    /**
     * Applied only to `streams` (log lines) response type. Reduces ammount of log entries to specified number.
     *
     * - This defaults to 100
     */
    limit?: number;
    /**
     * The unix epoch timestamp in nanoseconds or unix epoch timestamp in seconds with fractions (for floating point numbers)
     * or string in `RFC3339` format which represents timestamp.
     *
     * - This defaults to 1 hour ago
     */
    start?: number | string;
    /**
     * The unix epoch timestamp in nanoseconds or unix epoch timestamp in seconds with fractions (for floating point numbers)
     * or string in `RFC3339` format which represents timestamp.
     *
     * - This defaults now
     */
    end?: number | string;
    /**
     * A duration used to calculate `start` relative to `end`. If `start` is specified, then this value is ignored.
     * If `end` is not specified or targets to future timestamp, then the `start` is calculated relativlely to now.
     *
     * - This defaults to 1h
     */
    since?: Duration;
    /**
     * Applied only to `matrix` response type. Query resolution step width in `duration` format or float number of seconds.
     * The `duration` refers to Prometheus duration strings of the form `[0-9]+[smhdwy]`.
     *
     * - Defaults to a dynamic value based on start and end
     */
    step?: string | number;
    /**
     * Applied only to `streams` response type. This iterates through logs by specified interval and returns one log entry
     * at time. That means it takes first log entry within `start` then omits other entries until `start` + `interval` boundary
     * is reached. Then reapeats the step until `end` of interval.
     */
    interval?: Duration | number;
    /**
     * Determines the sort order of logs.
     *
     * - This defaults to `backward`
     */
    direction?: 'forward' | 'backward';
}

interface Stats {
    ingester: {
        compressedBytes: number;
        decompressedBytes: number;
        decompressedLines: number;
        headChunkBytes: number;
        headChunkLines: number;
        totalBatches: number;
        totalChunksMatched: number;
        totalDuplicates: number;
        totalLinesSent: number;
        totalReached: number;
    };
    store: {
        compressedBytes: number;
        decompressedBytes: number;
        decompressedLines: number;
        chunksDownloadTime: number;
        totalChunksRef: number;
        totalChunksDownloaded: number;
        totalDuplicates: number;
    };
    summary: {
        bytesProcessedPerSecond: number;
        execTime: number;
        linesProcessedPerSecond: number;
        queueTime: number;
        totalBytesProcessed: number;
        totalLinesProcessed: number;
    };
}

export interface IOutput {
    status: string;
    data: ({
        resultType: 'matrix';
        result: {
            metric: Record<string, unknown>;
            values: [number, string][]
        };
    } | {
        resultType: 'streams';
        result: {
            stream: Record<string, unknown>;
            values: [string, string][]
        };
    }) & { stats: Stats[] };
}
