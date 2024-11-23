import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import OneDriveApplication from '../OneDriveApplication';

export const NAME = 'one-drive-upload-file-connector';

export default class OneDriveUploadFileConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { name, content } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = this.getApplication<OneDriveApplication>().getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            `me/drive/root:/${name}:/content`,
            content,
        );
        const resp = await this.getSender().send<IOutput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    content: string;
    name: string;

}

export interface IOutput {
    cTag: string;
    createdBy: {
        application: {
            displayName: string;
            id: string;
        };
        user: {
            displayName: string;
            id: string;
        };
    };
    createdDateTime: string;
    eTag: string;
    file: {
        hashes: {
            quickXorHash: string;
            sha1Hash: string;
            sha256Hash: string;
        };
        mimeType: string;
    };
    fileSystemInfo: {
        createdDateTime: string;
        lastModifiedDateTime: string;
    };
    id: string;
    lastModifiedBy: {
        application: {
            displayName: string;
            id: string;
        };
        user: {
            displayName: string;
            id: string;
        };
    };
    lastModifiedDateTime: string;
    name: string;
    parentReference: {
        driveId: string;
        driveType: string;
        id: string;
        name: string;
        path: string;
    };
    reactions: {
        commentCount: number;
    };
    size: number;
    webUrl: string;
}
