import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AuthenticaOrder } from '../types/order';

export const AUTHENTICA_CREATE_ORDER = 'authentica-create-order';

export default class AuthenticaCreateOrder extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return AUTHENTICA_CREATE_ORDER;
    }

    public async processAction(
        dto: ProcessDto<AuthenticaCreateOrderInput>,
    ): Promise<ProcessDto<AuthenticaCreateOrderOutput>> {
        let order = dto.getJsonData();
        if (this.dataKey) {
            // eslint-disable-next-line
            order = (order as any)[this.dataKey];
        }

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'order',
            order,
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

        return dto as unknown as ProcessDto<AuthenticaCreateOrderOutput>;
    }

}

export type AuthenticaCreateOrderInput = Omit<AuthenticaOrder, 'id' | 'status' | 'trackingNumbers' | 'trackingUrls'>;
export type AuthenticaCreateOrderOutput = AuthenticaOrder;
