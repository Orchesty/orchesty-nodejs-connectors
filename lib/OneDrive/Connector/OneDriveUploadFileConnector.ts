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
    cTag: string,
    createdBy: {
        application: {
            displayName: string,
            id: string
        },
        user: {
            displayName: string,
            id: string
        }
    },
    createdDateTime: string,
    eTag: string,
    file: {
        hashes: {
            quickXorHash: string,
            sha1Hash: string,
            sha256Hash: string
        },
        mimeType: string
    },
    fileSystemInfo: {
        createdDateTime: string,
        lastModifiedDateTime: string
    },
    id: string,
    lastModifiedBy: {
        application: {
            displayName: string,
            id: string
        },
        user: {
            displayName: string,
            id: string
        }
    },
    lastModifiedDateTime: string,
    name: string,
    parentReference: {
        driveId: string,
        driveType: string,
        id: string,
        name: string,
        path: string
    },
    reactions: {
        commentCount: number
    },
    size: number,
    webUrl: string
}
