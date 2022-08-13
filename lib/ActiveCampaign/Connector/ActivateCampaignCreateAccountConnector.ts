import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'activate-campaign-create-account-connector';

export default class ActivateCampaignCreateAccountConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      'accounts',
      dto.jsonData as IInput,
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IInput {
    account: {
        name: string,
        accountUrl?: string,
        owner?: number,
        fields?: {
            customFieldId: number,
            fieldValue: number,
            fieldCurrency?: string
        }[]
    }
}

export interface IOutput {
    account: {
        id: string,
        name: string,
        accountUrl: string,
        createdTimestamp: string,
        updatedTimestamp: string,
        links: [],
        fields: {
            customFieldId: number,
            fieldValue: number,
            fieldCurrency: string,
            accountId: string
        }[],
    }
}
