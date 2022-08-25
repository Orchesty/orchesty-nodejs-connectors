import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'twitter-post-a-tweet-connector';

export default class TwitterPostATweetConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = '2/tweets';
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
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
    };
    poll?: {
        duration_minutes: number;
        options: [];
    };
    quote_tweet_id?: string;
    reply?: {
        in_reply_to_tweet_id: string;
    };
    reply_settings?: string;
    text: string;
}

export interface IOutput {
    id: string;
    text: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
