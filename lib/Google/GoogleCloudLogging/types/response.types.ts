export interface EntryListBatchResponse {
    entries: LogEntry[];
    nextPageToken: string;
}

export interface LogEntry {
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

export interface AppHub {
    application: {
        id: string;
        container: string;
        location: string;
    };
    service: AppHubService;
    workload: AppHubService;
}

export interface AppHubService {
    id: string;
    environmentType: string;
    criticalityType: string;
}
