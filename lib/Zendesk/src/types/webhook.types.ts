/* eslint-disable */
export interface ZendeskWebhook {
    authentication: {
        add_position: string;
        data: Record<string, string>,
        type: string;
    },
    created_at: string;
    created_by: string;
    custom_headers: Record<string, string>,
    endpoint: string;
    http_method: string;
    id: string;
    name: string;
    request_format: string;
    status: string;
    subscriptions: string[];
    updated_at: string;
    updated_by: string;
}
