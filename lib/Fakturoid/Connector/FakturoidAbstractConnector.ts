import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ACCOUNT, BASE_ACCOUNTS, BASE_URL } from '../FakturoidApplication';

export default abstract class AFakturoidConnector extends AConnector {
  protected _name = '';

  protected _endpoint = '';

  protected _method: HttpMethods = HttpMethods.GET;

  public getName(): string {
    return this._name;
  }

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    let body;
    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
    const app = await this._application;
    if (!app.isAuthorized(applicationInstall)) {
      dto.setStopProcess(ResultCode.STOP_AND_FAILED, `AppInstall [${applicationInstall.getName()}] is not authorized!`);
      return dto;
    }

    const url = `${BASE_URL}/${BASE_ACCOUNTS}/${applicationInstall
      .getSettings()[AUTHORIZATION_FORM][ACCOUNT]}/${this._endpoint}`;
    const arrayBodyMethods: string[] = [HttpMethods.POST, HttpMethods.PUT, HttpMethods.PATCH];
    if (arrayBodyMethods.includes(this._method)) {
      body = dto.data;
    }

    const requestDto = await app.getRequestDto(dto, applicationInstall, this._method, url, body);
    const response = await this._sender.send(requestDto);
    this.evaluateStatusCode(response, dto);
    dto.data = response.body;

    return dto;
  }
}
