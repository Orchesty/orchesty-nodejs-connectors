import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AuthenticaOrder } from '../types/order';

export const AUTHENTICA_UPDATE_ORDER = 'authentica-update-order';

export default class AuthenticaUpdateOrder extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return AUTHENTICA_UPDATE_ORDER;
    }

    public async processAction(
        dto: ProcessDto<AuthenticaUpdateOrderInput>,
    ): Promise<ProcessDto<AuthenticaUpdateOrderOutput>> {
        // eslint-disable-next-line
        let order: any = dto.getJsonData();
        if (this.dataKey) {
            // eslint-disable-next-line
            order = (order as any)[this.dataKey];
        }

        const url = `order/${order.id}`;
        delete order.id;

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            url,
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

        return dto as unknown as ProcessDto<AuthenticaUpdateOrderOutput>;
    }

}

export type AuthenticaUpdateOrderInput = Omit<AuthenticaOrder, 'status' | 'trackingNumbers' | 'trackingUrls'>;
export type AuthenticaUpdateOrderOutput = AuthenticaOrder;
