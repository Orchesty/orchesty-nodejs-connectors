import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AuthenticaOrder } from '../types/order';

export const AUTHENTICA_GET_ORDER = 'authentica-get-order';

export default class AuthenticaGetOrder extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return AUTHENTICA_GET_ORDER;
    }

    public async processAction(
        dto: ProcessDto<AuthenticaGetOrderInput>,
    ): Promise<ProcessDto<AuthenticaGetOrderOutput>> {
        const data = dto.getJsonData();
        // eslint-disable-next-line
        let id = data.id;
        if (this.dataKey) {
            // eslint-disable-next-line
            id = (data as any)[this.dataKey].id;
        }

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `order/${id}`,
        );

        const resp = (await this.getSender().send<AuthenticaOrder>(req)).getJsonBody();

        if (this.dataKey) {
            // eslint-disable-next-line
            const data = dto.getJsonData() as any;
            data[this.dataKey] = resp;
            dto.setNewJsonData(data);
        } else {
            dto.setNewJsonData(resp);
        }

        return dto as unknown as ProcessDto<AuthenticaGetOrderOutput>;
    }

}

export interface AuthenticaGetOrderInput {
    id: number;
}

export type AuthenticaGetOrderOutput = AuthenticaOrder;
