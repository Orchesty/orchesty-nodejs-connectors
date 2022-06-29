import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import FlexiBeeApplication from '../FexiBeeApplication';

export default class FlexiBeeCreateNewContactConnector extends AConnector {
  public getName = (): string => 'flexibee-create-new-contact';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const acceptedParams = ['name', 'use-demo', 'country', 'org-type', 'ic', 'vatid'];

    const countryArrayWithTypes: Record<string, string[]> = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CZ: [
        'PODNIKATELE+PU',
        'PODNIKATELE+DE',
        'NEZISKOVE',
        'ROZPOCTOVE',
      ],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      SK: [
        'PODNIKATELIA+PU',
      ],
    };

    let url = '';
    let name;
    let country: undefined | string;
    let orgType;
    const dtoDataArray = dto.jsonData as Record<string, string>;
    const { length } = Object.keys(dtoDataArray);

    Object.entries(dtoDataArray)
      .forEach(([key, value], index) => {
        if (acceptedParams.includes(key) && value) {
          switch (key) {
            case 'name':
              name = value;
              break;
            case 'country':
              if (countryArrayWithTypes[value]) {
                country = value;
              }
              break;
            case 'org-type':
              orgType = value;
              break;
            default:
              break;
          }

          if (index + 1 !== length) {
            url = `${url}${key}=${value}&`;
          } else {
            url = `${url}${key}=${value}`;
          }
        }
      });

    if (!name) {
      dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, 'Název organizace musí být vyplněný');
      return dto;
    }

    if (country) {
      if (orgType) {
        if (!countryArrayWithTypes[country].includes(orgType)) {
          dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, 'Zvolený typ organizace není platný.');
          return dto;
        }
      }
    } else if (orgType) {
      dto.setStopProcess(ResultCode.DO_NOT_CONTINUE, 'Zvolený typ organizace není platný.');
      return dto;
    }

    const applicationInstall = await this._getApplicationInstallFromProcess(dto);
    const application = this._application as FlexiBeeApplication;

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.PUT,
      application.getUrl(applicationInstall, `admin/zalozeni-firmy?${url}`),
    );
    const response = await this._sender.send(request);
    this.evaluateStatusCode(response, dto);
    dto.data = response.body;
    return dto;
  }
}
