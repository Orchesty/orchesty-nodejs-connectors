import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FormData from 'form-data';
import { BASE_URL } from '../GoogleDriveApplication';

export default class GoogleDriveUploadFileConnector extends AConnector {

    protected fileName = 'my.txt';

    protected folder = 'id';

    public getName(): string {
        return 'google-drive-upload-file';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const form = new FormData();
        form.append('metadata', JSON.stringify({
            name: this.fileName,
            parents: [this.folder],
        }));
        form.append('file', dto.getData(), this.fileName);

        const request = await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            `${BASE_URL}/upload/drive/v3/files?uploadType=multipart`,
            form,
        );
        request.setBody(form);

        const response = await this.getSender().send(request, [200, 201]);

        dto.setData(response.getBody());

        return dto;
    }

}
