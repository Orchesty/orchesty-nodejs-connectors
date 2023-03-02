import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { validate } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import Joi from 'joi';
import { BASE_URL } from '../GoogleDriveApplication';

export const NAME = 'google-drive-create-directory';

const inputSchema = Joi.object({
    name: Joi.string().required(),
    parentId: Joi.string(),
});

export default class GoogleDriveCreateDirectoryConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    @validate(inputSchema)
    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { name, parentId } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            `${BASE_URL}/drive/v3/files`,
            {
                name,
                parents: parentId ? [parentId] : [],
                mimeType: 'application/vnd.google-apps.folder',
            },
        );

        return dto.setNewJsonData((await this.getSender().send<IOutput>(requestDto, [200])).getJsonBody());
    }

}

export interface IInput {
    name: string;
    parentId?: string;
}

export interface IOutput {
    id: string;
    name: string;
}
