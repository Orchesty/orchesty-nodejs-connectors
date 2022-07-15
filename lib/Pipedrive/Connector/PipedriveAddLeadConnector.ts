import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { STORE_HASH } from '../../Bigcommerce/BigcommerceApplication';
import { IInput, IOutput } from '../../Bigcommerce/Connector/BigcommerceCreateOrderConnector';

export const NAME = 'pipedrive-add-lead-connector';

export default class PipedriveAddLeadConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = '/leads';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);

    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}
