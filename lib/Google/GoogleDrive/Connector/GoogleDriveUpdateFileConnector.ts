import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { validate } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import Joi from 'joi';
import { BASE_URL } from '../GoogleDriveApplication';

export const NAME = 'google-drive-update-file';

const inputSchema = Joi.object({
    fileId: Joi.string().required(),
    parentId: Joi.string(),
});

export default class GoogleDriveUpdateFileConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    @validate(inputSchema)
    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { fileId, parentId, ...data } = dto.getJsonData();

        const requestDto = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PATCH,
            `${BASE_URL}/drive/v3/files/${fileId}${parentId ? `?addParents=${parentId}` : ''}`,
            data,
        );

        return dto.setNewJsonData((await this.getSender().send<IOutput>(requestDto, [200])).getJsonBody());
    }

}

export interface IInput {
    fileId: string;
    parentId?: string;
}

export interface IOutput {
    id: string;
    name: string;
}
