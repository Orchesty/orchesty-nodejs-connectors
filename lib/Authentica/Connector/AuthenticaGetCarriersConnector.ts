import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const AUTHENTICA_GET_CARRIERS = 'authentica-get-carriers';

export class AuthenticaGetCarriers extends AConnector {

    public getName(): string {
        return AUTHENTICA_GET_CARRIERS;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<AuthenticaGetCarriersOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            'carrier',
        );
        const resp = (await this.getSender().send<Response>(req, [200])).getJsonBody();
        await this.processItems(dto, resp);

        return dto.setNewJsonData(resp);
    }

    protected async processItems(dto: ProcessDto, _items: AuthenticaCarrier[]): Promise<void> {
    }

}

export interface AuthenticaCarrier {
    id: number;
    name: string;
    branchSupported: boolean;
    branchRequired: boolean;
}

type Response = AuthenticaCarrier[];

export type AuthenticaGetCarriersOutput = AuthenticaCarrier[];
