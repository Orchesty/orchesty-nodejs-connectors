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
    'account': {
        'name': 'Example Account',
        'accountUrl': 'https://www.example.com',
        'owner': 1,
        'fields': [
            {
                'customFieldId': 9,
                'fieldValue': '500-1000'
            },
            {
                'customFieldId': 20,
                'fieldValue': 1234,
                'fieldCurrency': 'GBP'
            }
        ]
    }
}

export interface IOutput {
    'account': {
        'name': 'Example Account',
        'accountUrl': 'https://www.example.com',
        'createdTimestamp': '2019-06-12T16:52:16-05:00',
        'updatedTimestamp': '2019-06-12T16:52:16-05:00',
        'links': [],
        'fields': [
            {
                'customFieldId': 9,
                'fieldValue': '501 - 1000',
                'accountId': '1'
            },
            {
                'customFieldId': 20,
                'fieldValue': 1234,
                'fieldCurrency': 'GBP',
                'accountId': '1'
            }
        ],
        'id': '1'
    }
}
