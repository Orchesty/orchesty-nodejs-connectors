import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'twitter-delete-tweet-connector';

export default class TwitterDeleteTweetConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { id } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = `2/tweets/${id}`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}
export interface IInput {
    id: string;
 }
export interface IOutput{
    deleted: boolean;
 }
