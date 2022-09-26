import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'digitoo-add-registers';

export default class DigitooAddRegisters extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.PUT,
            'api/registers',
            body,
        );
        await this.getSender().send(req, [200]);

        dto.setNewJsonData({});
        return dto;
    }

}

export interface IInput {
    registers: {
        type: string;
        options: {
            label: string;
            value: string;
        }[];
    }[];
}
