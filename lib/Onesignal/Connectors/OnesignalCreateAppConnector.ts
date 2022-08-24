import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'onesignal-create-app-connector';

export default class OnesignalCreateAppConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'apps',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    name: string;
    apns_env: string;
    apns_p12: string;
    apns_p12_password: string;
    gcm_key: string;
    android_gcm_sender_id: string;
    chrome_web_origin: string;
    chrome_web_default_notification_icon: string;
    chrome_web_sub_domain: string;
    chrome_key: string;
    site_name: string;
    safari_site_origin: string;
    safari_apns_p12: string;
    safari_apns_p12_password: string;
    safari_icon_256_256: string;
    additional_data_is_root_payload: boolean;
    organization_id: string;
    countent_type: string;
    authorization: string;
}

export interface IOutput {
    id: string;
    name: string;
    players: number;
    messageable_players: number;
    updated_at: string;
    created_at: string;
    gcm_key: string;
    chrome_web_origin: string;
    chrome_web_default_notification_icon: string;
    chrome_web_sub_domain: string;
    apns_env: string;
    apns_certificates: string;
    safari_apns_certificate: string;
    safari_site_origin: string;
    safari_push_id: string;
    safari_icon_16_16: string;
    safari_icon_32_32: string;
    safari_icon_64_64: string;
    safari_icon_128_128: string;
    safari_icon_256_256: string;
    site_name: string;
    basic_auth_key: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
