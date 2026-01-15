import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AuthenticaOrder } from '../types/order';

export const AUTHENTICA_UPDATE_RECEIPT = 'authentica-update-receipt';

export default class AuthenticaUpdateReceipt extends AConnector {

    public getName(): string {
        return AUTHENTICA_UPDATE_RECEIPT;
    }

    public async processAction(
        dto: ProcessDto<AuthenticaUpdateReceiptInput>,
    ): Promise<ProcessDto<AuthenticaUpdateReceiptOutput>> {
        const receipt = dto.getJsonData();

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.PUT,
            `receipt/${receipt.id}`,
            receipt,
        );

        const resp = (await this.getSender().send<AuthenticaOrder>(req)).getJsonBody();
        dto.setNewJsonData(resp);

        return dto as unknown as ProcessDto<AuthenticaUpdateReceiptOutput>;
    }

}

export type AuthenticaUpdateReceiptInput = Omit<AuthenticaReceipt, 'status' | 'trackingNumbers' | 'shipments'>;
export type AuthenticaUpdateReceiptOutput = AuthenticaReceipt;
