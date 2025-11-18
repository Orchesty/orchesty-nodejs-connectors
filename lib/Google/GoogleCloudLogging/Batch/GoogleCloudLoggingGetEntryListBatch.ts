import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { NAME as APPLICATION_NAME } from '../GoogleCloudLoggingApplication';

export const NAME = `${APPLICATION_NAME}-get-entry-list-batch`;

export default class GoogleCloudLoggingGetEntryListBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const cursor = dto.getBatchCursor();

        const pageToken = !cursor ? undefined : cursor;

        const body = { ...dto.getJsonData(), pageToken };

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            '/v2/entries:list',
            body,
        );

        const responseDto = await this.getSender().send<IOutput>(requestDto, [200]);
        const response = responseDto.getJsonBody();

        const items = response?.entries ?? [];

        dto.setItemList(items);

        const { nextPageToken } = response;

        if (items.length && nextPageToken) {
            dto.setBatchCursor(nextPageToken);
        }

        return dto;
    }

}

export interface IInput {
    resourceNames: string[];
    /** @deprecated */projectIds?: string[];
    filter?: string,
    orderBy?: string,
    pageSize?: number,
    pageToken?: string
}

export interface IOutput {
    entries: LogEntry[];
    nextPageToken: string;
}

interface LogEntry {
    logName: string;
    resource: {
        type: string;
        labels: Record<string, string>;
    };
    receiveTimestamp: string;
    /** @deprecated */metadata: {
        systemLabels: object;
        userLabels: Record<string, string>;
    };
    errorGroups: {
        id: string;
    }[];
    apphub: AppHub;
    apphubDestination: AppHub;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    protoPayload: { '@type': string } & Record<string, string>;
    textPayload: string;
    jsonPayload: object;
    timestamp?: string,
    severity?: 'DEFAULT'
    | 'DEBUG'
    | 'INFO'
    | 'NOTICE'
    | 'WARNING'
    | 'ERROR'
    | 'CRITICAL'
    | 'ALERT'
    | 'EMERGENCY';
    insertId?: string;
    httpRequest?: {
        requestMethod: string;
        requestUrl: string;
        requestSize: string;
        status: number;
        responseSize: string;
        userAgent: string;
        remoteIp: string;
        serverIp: string;
        referer: string;
        latency: string;
        cacheLookup: boolean;
        cacheHit: boolean;
        cacheValidatedWithOriginServer: boolean;
        cacheFillBytes: string;
        protocol: string;
    };
    labels?: Record<string, string>;
    operation?: {
        id?: string;
        producer?: string;
        first?: boolean;
        last?: boolean;
    };
    trace?: string;
    spanId?: string;
    traceSampled?: boolean;
    sourceLocation?: {
        file?: string;
        line?: string;
        function?: string;
    };
    split?: {
        uid: string;
        index: number;
        totalSplits: number;
    };
}

interface AppHub {
    application: {
        id: string;
        container: string;
        location: string;
    };
    service: AppHubService;
    workload: AppHubService;
}

interface AppHubService {
    id: string;
    environmentType: string;
    criticalityType: string;
}
