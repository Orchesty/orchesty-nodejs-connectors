import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AUTH_ID } from '../PlivoApplication';

export const NAME = 'plivo-send-sms-conector';

export default class PlivoSendSMSConector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const id = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][AUTH_ID];
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            `Account/${id}/Message/`,
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [202]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    src: string;
    dst: string;
    text: string;
    url: string;
}

export interface IOutput {
    message: string;
    'message_uuid': string[];
    'api_id': string;
}

/* eslint-enable @typescript-eslint/naming-convention */
