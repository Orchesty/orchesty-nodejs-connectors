import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'onesignal-view-apps-batch';

export default class OnesignalViewAppsBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            'apps',
        );
        const resp = await this.getSender().send<IOutput[]>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response ?? []);
        dto.removeBatchCursor();

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    id: string;
    name: string;
    players: number;
    messageable_players: number;
    updated_at: string;
    created_at: string;
    gcm_key: string;
    chrome_key: string;
    chrome_web_origin: string;
    chrome_web_gcm_sender_id: string;
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
