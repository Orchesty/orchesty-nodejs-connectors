import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ResultCode from 'pipes-nodejs-sdk/dist/lib/Utils/ResultCode';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { get, USER } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import AirtableApplication, { BASE_ID, BASE_URL, TABLE_NAME } from '../AirtableApplication';

export default class AirtableNewRecordConnector extends AConnector {
  public getName = (): string => 'airtable-new-record';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const user = get(USER, dto.headers);
    if (!user) {
      throw Error('User not defined');
    }
    const applicationInstall = await this._getApplicationInstall(user[0]);
    const app = this._application as AirtableApplication;
    if (!app.getValue(applicationInstall, BASE_ID)
      || !app.getValue(applicationInstall, TABLE_NAME)) {
      dto.setStopProcess(ResultCode.STOP_AND_FAILED);

      return dto;
    }

    const url = `
      ${BASE_URL}
      ${app.getValue(applicationInstall, BASE_ID)}
      ${app.getValue(applicationInstall, TABLE_NAME)}
    `;
    const requestDto = await app.getRequestDto(dto, applicationInstall, HttpMethods.POST, url);
    dto.jsonData = await this._sender.send(requestDto, [200, 404]);
    return dto;
  }
}
