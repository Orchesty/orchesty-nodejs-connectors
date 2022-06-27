import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import FormData from 'form-data';
import { BASE_URL } from '../GoogleDriveApplication';

export default class GoogleDriveUploadFileConnector extends AConnector {
  protected _fileName = 'my.txt';

  protected _folder = 'id';

  public getName = (): string => 'google-drive-upload-file';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);

    const form = new FormData();
    form.append('metadata', JSON.stringify({
      name: this._fileName,
      parents: [this._folder],
    }));
    form.append('file', dto.data, this._fileName);

    const request = await this._application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      `${BASE_URL}/upload/drive/v3/files?uploadType=multipart`,
      form,
    );
    request.body = form;

    const response = await this._sender.send(request, [200, 201]);

    dto.data = response.body;

    return dto;
  }
}
