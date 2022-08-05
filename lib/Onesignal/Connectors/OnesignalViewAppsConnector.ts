import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'onesignal-view-apps-connector';

export default class OnesignalViewAppsConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      'apps',
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    id: string,
    name: string,
    players: number,
    messageable_players: number,
    updated_at: string,
    created_at: string,
    gcm_key: string,
    chrome_key: string,
    chrome_web_origin: string,
    chrome_web_gcm_sender_id: string,
    chrome_web_default_notification_icon: string,
    chrome_web_sub_domain: string,
    apns_env: string,
    apns_certificates: string,
    safari_apns_certificate: string,
    safari_site_origin: string,
    safari_push_id: string,
    safari_icon_16_16: string,
    safari_icon_32_32: string,
    safari_icon_64_64: string,
    safari_icon_128_128: string,
    safari_icon_256_256: string,
    site_name: string,
    basic_auth_key: string
}

/* eslint-enable @typescript-eslint/naming-convention */
