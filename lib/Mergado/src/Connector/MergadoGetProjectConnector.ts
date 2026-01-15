import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'mergado-get-project-connector';

export default class MergadoGetProjectConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { id } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = `projects/${id}/`;
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    id: string;
}

export interface IOutput {
    id: string;
    shop_id: string;
    creator_id: string;
    name: string;
    url: string;
    activated: boolean;
    created: Date;
    exported_items: number;
    input_format: string;
    output_format: string;
    pairing_elements: string;
    readonly: boolean;
    is_paused: boolean;
    rules_changed_at: Date;
    slug: string;
    turned_off: boolean;
    update_period: number;
    last_access: Date;
    xml_synced_at: Date;
    xml_updated_at: Date;
    is_dirty: boolean;
    metadata: {
        stats_ga_medium: string;
        stats_ga_source: string;
        generator: string;
    };
    number_of_elements: number;
    all_products_query_id: string;
    sync_schedule: {
        minute: string;
        hour: string;
        day_of_week: string;
        day_of_month: string;
        month_of_year: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
