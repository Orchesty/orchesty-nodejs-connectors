import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'monday-create-item-connector';

export default class MondayCreateItemConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();
        let graphQl = 'mutation { create_item (';
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(body)) {
            graphQl += `${key}"${value}",`;
        }
        graphQl = graphQl.slice(0, -1);
        graphQl += ') {column_values ids creator_id id name parent_item subscribers}}';
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            undefined,
            { query: graphQl },
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);
        const output = resp.getJsonBody();

        if (output.error_code) {
            throw new OnRepeatException(60, 10, output.error_code ?? 'Unknown error.');
        }

        return dto.setNewJsonData(output);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    item_name?: string;
    board_id: number;
    group_id?: string;
    column_values?: string;
    create_labels_if_missing?: boolean;
}

export interface IOutput {
    assets?: {
        column_ids?: string;
        assets_source?: 'all' | 'columns' | 'gallery';
    }[];
    board?: string;
    column_values: {
        ids: string;
    }[];
    created_at?: Date;
    creator?: string;
    creator_id: string;
    group?: string;
    id: string;
    name: string;
    parent_item: {
        assets?: string[];
        board?: string;
        column_values?: string[];
        created_at?: Date;
        creator?: string;
        creator_id: string;
        group?: string;
        id?: string;
        name: string;
        state?: string;
        subscribers: string;
        updated_at: Date;
        updates: string;
    };
    state: 'active' | 'all' | 'archived' | 'deleted';
    subscribers: string[];
    updated_at: Date;
    updates: {
        limit: number;
        page: number;
    };
    email: string;
    error_code?: string;
    status_code?: number;
    error_message?: string;
}
