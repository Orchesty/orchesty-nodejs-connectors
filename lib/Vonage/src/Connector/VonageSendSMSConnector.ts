import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_KEY, API_SECRET } from '../VonageApplication';

export const NAME = 'vonage-send-sms-connector';

export default class VonageSendSMSConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutputItem[]>> {
        const { from, to, text } = dto.getJsonData();
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const apiKey = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][API_KEY];
        const apiSecret = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][API_SECRET];
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            `sms/json?api_key=${apiKey}&api_secret=${apiSecret}&from=${from}&to=${to}&type=text&text=${text}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const data = resp.getJsonBody();

        return dto.setNewJsonData(data.messages);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    'message-count': string;
    messages: IOutputItem[];
}

export interface IOutputItem {
    to: string;
    'message-id': string;
    status: string;
    'remaining-balance': string;
    'message-price': string;
    network: string;
    'client-ref': string;
    'account-ref': string;
}

export interface IInput {
    from: string;
    to: string;
    text: string;

}

/* eslint-enable @typescript-eslint/naming-convention */
