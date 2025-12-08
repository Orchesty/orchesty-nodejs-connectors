import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'pipedrive-delete-lead-connector';

export default class PipedriveDeleteLeadConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(
        dto: ProcessDto<IInput>,
    ): Promise<ProcessDto<{ id: string }>> {
        const { id } = dto.getJsonData();

        return dto.setNewJsonData(
            (
                await this.getSender().send<IResponse>(
                    await this.getApplication().getRequestDto(
                        dto,
                        await this.getApplicationInstallFromProcess(dto),
                        HttpMethods.DELETE,
                        `/leads/${id}`,
                    ),
                    [200],
                )
            ).getJsonBody().data,
        );
    }

}

export interface IInput {
    id: string;
}

interface IResponse {
    success: boolean;
    data: {
        id: string;
    };
}
