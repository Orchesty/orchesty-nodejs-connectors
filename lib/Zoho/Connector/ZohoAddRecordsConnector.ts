import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import {
  ACCOUNT_OWNER_NAME, APP_LINK_NAME, CREATOR_FORM, FORM_LINK_NAME,
} from '../ZohoApplication';

export const NAME = 'zoho-add-records-connector';

export default class ZohoAddRecordsConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const accountOwnerName = appInstall.getSettings()[CREATOR_FORM][ACCOUNT_OWNER_NAME];
    const appLink = appInstall.getSettings()[CREATOR_FORM][APP_LINK_NAME];
    const formLink = appInstall.getSettings()[CREATOR_FORM][FORM_LINK_NAME];
    const url = `/${accountOwnerName}/${appLink}/form/${formLink}`;

    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      url,
      { data: dto.jsonData as IInput },
    );
    const resp = await this._sender.send(req, [200]);

    const records = resp.jsonBody as IOutput;

    if (records.code !== 3000) {
      throw new Error(records.message);
    }

    dto.jsonData = records.data;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
  data: [
    {
      Email: string,
      Phone_Number: string
    }
  ]
  result: {
    fields: string[],
    message: boolean,
    tasks: boolean
  }
}

export interface IOutput {
  code: number,
  data: {
    Email: string,
    Phone_Number: string,
    ID: string,
  },
  message: string,
  tasks: {
    openurl: {
      type: string,
      url: string,
    }
  }
}
/* eslint-enable @typescript-eslint/naming-convention */
