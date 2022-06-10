import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { BASE_URL } from '../IDokladApplication';

export default class IDokladCreateNewContactConnector extends AConnector {
  public getName = (): string => 'i-doklad-create-new-contact';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(dto.jsonData as Record<string, unknown>, ['CompanyName', 'CountryId', 'Name']);

    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);

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
