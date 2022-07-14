import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'salesforce-update-record-connector';

export default class SalesForceUpdateRecordConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { recordId, ...body } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, `/Account/${recordId}`, body);
    const resp = await this._sender.send(req, [204]);

    dto.jsonData = resp.jsonBody;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput{
    BillingCity: string
    recordId: string
}
/* eslint-enable @typescript-eslint/naming-convention */
