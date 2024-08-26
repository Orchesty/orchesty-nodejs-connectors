import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AuthenticaOrder } from '../types/order';

export const AUTHENTICA_CREATE_RECEIPT = 'authentica-create-receipt';

export default class AuthenticaCreateReceipt extends AConnector {

    public constructor(
        protected dataKey: string | null = null,
    ) {
        super();
    }

    public getName(): string {
        return AUTHENTICA_CREATE_RECEIPT;
    }

    public async processAction(
        dto: ProcessDto<AuthenticaCreateReceiptInput>,
    ): Promise<ProcessDto<AuthenticaCreateReceiptOutput>> {
        let receipt = dto.getJsonData();
        if (this.dataKey) {
            // eslint-disable-next-line
            receipt = (receipt as any)[this.dataKey];
        }

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'receipt',
            receipt,
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

        return dto as unknown as ProcessDto<AuthenticaCreateReceiptOutput>;
    }

}

export type AuthenticaCreateReceiptInput = Omit<AuthenticaReceipt, 'id' | 'status' | 'trackingNumbers' | 'shipments'>;
export type AuthenticaCreateReceiptOutput = AuthenticaReceipt;
