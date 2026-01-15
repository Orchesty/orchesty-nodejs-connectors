/* eslint-disable */
export interface ZendeskTrigger {
    actions: { field: string, value: string }[],
    active: boolean,
    category_id: string;
    conditions: Record<string, {
        field: string;
        operator: string;
        value: string;
    }[]>,
    created_at: string;
    description: string;
    id: number;
    position: number;
    raw_title: string;
    title: string;
    updated_at: string;
    url: string;
}
