import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import DropboxApplication from '../DropboxApplication';

const DROPBOX_UPLOAD_FILE_ENDPOINT = 'https://content.dropboxapi.com/2/files/upload';
const DROPBOX_API_ARG = 'Dropbox-API-Arg';
const APPLICATION_STREAM = 'application/octet-stream';

interface IDropboxFile {
  data: string,
  destinationPath: string,
}

export default class DropboxUploadFile extends AConnector {
  public getName = (): string => 'dropbox-upload-file';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
      dto.jsonData as Record<string, unknown>,
      ['data', 'destinationPath'],
    );

    const {
      data,
      destinationPath,
    } = dto.jsonData as IDropboxFile;

    const application = this._application as DropboxApplication;
    const applicationInstall = await this._getApplicationInstall(dto.user);

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      DROPBOX_UPLOAD_FILE_ENDPOINT,
      data,
    );

    const destinationInfo = {
      path: destinationPath,
      mode: 'add',
      autorename: true,
      mute: false,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      strict_conflict: false,
    };

    request.headers = {
      ...request.headers,
      [DROPBOX_API_ARG]: JSON.stringify(destinationInfo),
      [CommonHeaders.CONTENT_TYPE]: APPLICATION_STREAM,
    };

    const response = await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  }
}
