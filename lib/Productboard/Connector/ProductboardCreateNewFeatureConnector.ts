import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'productboard-create-new-feature-connector';

export default class ProductboardCreateNewFeatureConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = 'features';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

export interface IInput {
    data: {
        name: string;
        description: string;
        type: string;
        status: {
            id: string;
            name: string;
        };
        parent: {
            feature: {
                id: string;
            };
        };
        archived: boolean;
        timeframe: {
            startDate: string;
            endDate: string;
            granularity: string;
        };
        owner: {
            email: string;
        };
    };
}

export interface IOutput {
    data: {
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
            feature: {
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
        owner: {
            email: string;
        };
    };
}
