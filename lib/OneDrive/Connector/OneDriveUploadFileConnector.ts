import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'one-drive-upload-file-connector';

export default class OneDriveUploadFileConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { name, content } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.PUT,
      `me/drive/root:/${name}:/content`,
      content,
    );
    const resp = await this._sender.send(req, [201]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IInput {
    content: string
    name: string

}

export interface IOutput {
    id: string,
    name: string,
    size: number,
    file: [];
}
