import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { BASE_URL } from '../IDokladApplication';

export default class IDokladCreateNewContactConnector extends AConnector {
  public getName = (): string => 'i-doklad-create-new-contact';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(dto.jsonData as Record<string, unknown>, ['CompanyName', 'CountryId', 'Name']);

    const applicationInstall = await this._getApplicationInstallFromProcess(dto);

    const request = await this._application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      `${BASE_URL}/Contacts`,
      dto.data,
    );

    const response = await this._sender.send(request, [200, 201], 10);
    this.evaluateStatusCode(response, dto);
    dto.data = response.body;

    return dto;
  }
}
