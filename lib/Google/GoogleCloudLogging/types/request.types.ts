export interface EntryListBatchRequest {
    resourceNames: string[];
    /** @deprecated */projectIds?: string[];
    filter?: string,
    orderBy?: string,
    pageSize?: number,
    pageToken?: string
}
