import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'productboard-create-new-feature-connector';

export default class ProductboardCreateNewFeatureConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'features';
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    data: {
        owner?: {
            email: string;
        };
        name: string;
        description: string;
        type: 'feature' | 'subfeature';
        status: {
            id: string;
            name: string;
        };
        parent: {
            feature?: {
                id: string;
            };
            product?: {
                id: string;
            };
            component?: {
                id: string;
            };
        };
        archived: boolean;
        timeframe: {
            startDate: string;
            endDate: string;
            granularity: string;
        };

    };
}

export interface IOutput {
    data: {
        owner?: {
            email: string;
        };
        id: string;
        name: string;
        description: string;
        type: string;
        archived: boolean;
        status: {
            id: string;
            name: string;
        };
        parent: {
            feature?: {
                id: string;
                links: {
                    self: string;
                };
            };
            product?: {
                id: string;
                links: {
                    self: string;
                };
            };
            component?: {
                id: string;
                links: {
                    self: string;
                };
            };
        };
        links: {
            self: string;
            html: string;
        };
        timeframe: {
            startDate: string;
            endDate: string;
            granularity: string;
        };
    };
}
