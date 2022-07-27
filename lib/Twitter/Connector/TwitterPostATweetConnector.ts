import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'twitter-post-a-tweet-connector';

export default class TwitterPostATweetConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = '2/tweets';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [200]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    direct_message_deep_link?: string;
    for_super_followers_only?: boolean;
    geo?: {
        place_id: string;
    };
    media?: {
        media_ids: [];
        tagged_user_ids: [];
    }
    poll?: {
        duration_minutes: number;
        options: [];
    }
    quote_tweet_id?: string;
    reply?: {
        in_reply_to_tweet_id: string;
    }
    reply_settings?: string;
    text: string;
}

export interface IOutput {
    id: string;
    text: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
