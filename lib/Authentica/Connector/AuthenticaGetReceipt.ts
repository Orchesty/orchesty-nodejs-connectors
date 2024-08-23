import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AuthenticaOrder } from '../types/order';

export const AUTHENTICA_GET_RECEIPT = 'authentica-get-receipt';

export default class AuthenticaGetReceipt extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return AUTHENTICA_GET_RECEIPT;
    }

    public async processAction(
        dto: ProcessDto<AuthenticaGetReceiptInput>,
    ): Promise<ProcessDto<AuthenticaGetReceiptOutput>> {
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
            `receipt/${id}`,
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

        return dto as unknown as ProcessDto<AuthenticaGetReceiptOutput>;
    }

}

export interface AuthenticaGetReceiptInput {
    id: number;
}

export type AuthenticaGetReceiptOutput = AuthenticaReceipt;
