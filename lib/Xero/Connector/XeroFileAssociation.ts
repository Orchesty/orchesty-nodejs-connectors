import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'xero-file-association';

export default class XeroFileAssociation extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { FileId, ObjectGroup, ObjectId } = dto.getJsonData();
        const req = await this.getApplication()
            .getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.POST,
                `Files/${FileId}/Associations`,
                {
                    /* eslint-disable @typescript-eslint/naming-convention */
                    ObjectId,
                    ObjectGroup,
                    /* eslint-enable @typescript-eslint/naming-convention */
                },
            );
        await this.getSender().send(req, [200]);

        return dto.setNewJsonData({});
    }

}

export interface IInput {
    /* eslint-disable @typescript-eslint/naming-convention */
    FileId: string;
    ObjectId: string;
    ObjectGroup: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}
