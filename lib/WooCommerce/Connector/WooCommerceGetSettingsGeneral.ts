import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'woo-commerce-get-settings-general';

export default class WooCommerceGetSettingsGeneral extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput | ISetting>> {
        const { id } = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `wp-json/wc/v3/settings/general/${id ?? ''}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    id?: string;
}

export type IOutput = ISetting[];
export interface ISetting {
    id: string;
    label: string;
    description: string;
    type: string;
    default: string;
    tip: string;
    value: string;
    _links: {
        self: {
            href: string;
        }[];
        collection: {
            href: string;
        }[];
    };
    options?: Record<string, string>;
}
