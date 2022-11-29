import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BASE_URL } from '../HubSpotApplication';

export default class HubSpotSendTransactionEmailConnector extends AConnector {

    public getName(): string {
        return 'hub-spot-send-transaction-email';
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            `${BASE_URL}/marketing/v3/transactional/single-email/send`,
            dto.getData(),
        );

        const response = await this.getSender().send(request, [200]);

        dto.setData(response.getBody());

        return dto;
    }

}

export interface IInput {
    cc?: string[];
    bcc?: string[];
    contactProperties?: Record<string, string>;
    emailId: number;
    message: {
        from?: string;
        sendId?: string;
        replyTo?: string[];
        to: string;
    };
}
