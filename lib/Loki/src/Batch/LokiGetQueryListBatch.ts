import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import { NAME as APPLICATION_NAME } from '../LokiApplication';

export const NAME = `${APPLICATION_NAME}-get-query-list-batch`;

enum Direction {
    FORWARD = 'forward',
    BACKWARD = 'backward',
}

export default class LokiGetQueryListBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const boundaryTimestamp = dto.getBatchCursor();

        const { query, limit, start, end, since, interval, step, direction } = dto.getJsonData();

        const params = new URLSearchParams({ query });

        if (start || (boundaryTimestamp && direction === Direction.FORWARD)) {
            params.set('start', (direction === Direction.FORWARD ? boundaryTimestamp || String(start) : String(start)));
        }
        if (end || (boundaryTimestamp && direction !== Direction.FORWARD)) {
            params.set('end', (direction === Direction.FORWARD ? String(end) : boundaryTimestamp || String(end)));
        }
        if (limit) params.set('limit', String(limit));
        if (since) params.set('since', since);
        if (interval) params.set('interval', String(interval));
        if (step) params.set('step', String(step));
        if (direction) params.set('direction', direction);

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `/loki/api/v1/query_range?${params}`,
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto);

        const { status, data } = responseDto.getJsonBody();

        if (status !== 'success') {
            dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'Unexpected error occurred during LogQL query execution');
            return dto;
        }

        const items: string[] = [];
        if (data.resultType === 'streams') {
            const result = data.result.flatMap((item) => item.values);
            result.sort((a, b) => (
                direction === Direction.FORWARD
                    ? Number(a[0]) - Number(b[0])
                    : Number(b[0]) - Number(a[0])
            ));
            items.push(...result.map((item) => item[1]));
            if (result.length === (limit ?? 100)) {
                const timestamp = Number(result[result.length - 1][0]);
                dto.setBatchCursor(String(timestamp + (direction === Direction.FORWARD ? 1 : -1)));
            }
        } else {
            const result = data.result.flatMap((item) => item.values);
            result.sort((a, b) => (direction === Direction.FORWARD ? a[0] - b[0] : b[0] - a[0]));
            items.push(...result.map((item) => item[1]));
        }

        return dto.setItemList(items);
    }

}

type Duration = `${number}${'ns' | 'us' | 'µs' | 'ms' | 's' | 'm' | 'h'}`;

export interface IInput {
    /** LogQL query to retrieve data */
    query: string;
    /**
     * Applied only to `streams` (log lines) response type. Reduces amount of log entries to specified number.
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
     * If `end` is not specified or targets to future timestamp, then the `start` is calculated relatively to now.
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
     * is reached. Then repeats the step until `end` of interval.
     */
    interval?: Duration | number;
    /**
     * Determines the sort order of logs.
     *
     * - This defaults to `backward`
     */
    direction?: Direction;
}

export interface IOutput {
    status: string;
    data: ({
        resultType: 'matrix';
        result: {
            metric: Record<string, unknown>;
            values: [number, string][]
        }[];
    } | {
        resultType: 'streams';
        result: {
            stream: Record<string, unknown>;
            values: [string, string][]
        }[];
    }) & { stats: Statistics };
}

interface Statistics {
    summary: {
        bytesProcessedPerSecond: number;
        linesProcessedPerSecond: number;
        totalBytesProcessed: number;
        totalLinesProcessed: number;
        execTime: number;
        queueTime: number;
        subqueries: number;
        totalEntriesReturned: number;
        splits: number;
        shards: number;
        totalPostFilterLines: number;
        totalStructuredMetadataBytesProcessed: number;
    };
    querier: {
        store: Store;
    };
    ingester: {
        totalReached: number;
        totalChunksMatched: number;
        totalBatches: number;
        totalLinesSent: number;
        store: Store;
    }
    cache: {
        chunk: CacheStatistic;
        index: CacheStatistic;
        result: CacheStatistic;
        statsResult: CacheStatistic;
        volumeResult: CacheStatistic;
        seriesResult: CacheStatistic;
        labelResult: CacheStatistic;
        instantMetricResult: CacheStatistic;
    };
    index: {
        totalChunks: number;
        postFilterChunks: number;
        shardsDuration: number;
        usedBloomFilters: boolean;
    };
}

interface Store {
    totalChunksRef: number;
    totalChunksDownloaded: number;
    chunksDownloadTime: number;
    queryReferencedStructuredMetadata: boolean;
    queryUsedV2Engine: boolean;
    chunk: {
        headChunkBytes: number;
        headChunkLines: number;
        decompressedBytes: number;
        decompressedLines: number;
        compressedBytes: number;
        totalDuplicates: number;
        postFilterLines: number;
        headChunkStructuredMetadataBytes: number;
        decompressedStructuredMetadataBytes: number;
    };
    chunkRefsFetchTime: number;
    congestionControlLatency: number;
    pipelineWrapperFilteredLines: number;
    dataobj: {
        prePredicateDecompressedRows: number;
        prePredicateDecompressedBytes: number;
        prePredicateDecompressedStructuredMetadataBytes: number;
        postPredicateRows: number;
        postPredicateDecompressedBytes: number;
        postPredicateStructuredMetadataBytes: number;
        postFilterRows: number;
        pagesScanned: number;
        pagesDownloaded: number;
        pagesDownloadedBytes: number;
        pageBatches: number;
        totalRowsAvailable: number;
        totalPageDownloadTime: number;
    };
}

interface CacheStatistic {
    entriesFound: number;
    entriesRequested: number;
    entriesStored: number;
    bytesReceived: number;
    bytesSent: number;
    requests: number;
    downloadTime: number;
    queryLengthServed: number;
}
