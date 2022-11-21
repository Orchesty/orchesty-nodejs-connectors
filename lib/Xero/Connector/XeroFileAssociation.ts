import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'xero-file-association';

export default class XeroFileAssociation<I extends IInput = IInput, O extends IOutput = IOutput> extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<I>): Promise<ProcessDto<O>> {
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
        const response = await this.getSender().send<O>(req, [200]);

        return dto.setNewJsonData(response.getJsonBody());
    }

}

export interface IInput {
    /* eslint-disable @typescript-eslint/naming-convention */
    FileId: string;
    ObjectId: string;
    ObjectGroup: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}

interface IResponse extends IInput {
    /* eslint-disable @typescript-eslint/naming-convention */
    ObjectType: string;
    /* eslint-enable @typescript-eslint/naming-convention */
}

export type IOutput = IResponse;
