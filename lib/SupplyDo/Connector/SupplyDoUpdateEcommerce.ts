import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'supply-do-update-ecommerce';

export default class SupplyDoUpdateEcommerce extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IResponse>> {
        const ecommerce = dto.getUser();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PATCH,
            `items/ecommerce/${ecommerce}`,
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    active?: boolean;
    installed?: boolean;
}

export interface IResponse {
    data: {
        company: number;
        id: number;
        name: string;
        url: string;
        active: boolean;
        installed: boolean;
        type: string;
        countries: string;
    };
}
