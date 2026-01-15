import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import DropboxApplication from '../DropboxApplication';

const DROPBOX_UPLOAD_FILE_ENDPOINT = 'https://content.dropboxapi.com/2/files/upload';
const DROPBOX_API_ARG = 'Dropbox-API-Arg';
const APPLICATION_STREAM = 'application/octet-stream';

interface IDropboxFile {
    data: string;
    destinationPath: string;
}

export default class DropboxUploadFile extends AConnector {

    public getName(): string {
        return 'dropbox-upload-file';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData() as Record<string, unknown>,
            ['data', 'destinationPath'],
        );

        const {
            data,
            destinationPath,
        } = dto.getJsonData() as IDropboxFile;

        const application = this.getApplication<DropboxApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

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

        request.setHeaders({
            ...request.getHeaders(),
            [DROPBOX_API_ARG]: JSON.stringify(destinationInfo),
            [CommonHeaders.CONTENT_TYPE]: APPLICATION_STREAM,
        });

        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());

        return dto;
    }

}
