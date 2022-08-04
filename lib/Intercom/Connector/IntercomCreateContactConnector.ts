import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'intercom-create-contact-connector';

export default class IntercomCreateContactConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const url = 'contacts';
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
    const resp = await this._sender.send(req, [200, 201]);

    dto.jsonData = resp.jsonBody as IOutput;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    role: string;
    external_id: string;
    email: string;
    phone: string;
    name: string;
    avatar: string;
    last_seen_at: number;
    signed_up_at: number;
    owner_id: number;
    unsubscribed_from_emails: boolean;
    custom_attributes: {
        paid_subscriber: boolean;
        monthly_spend: number;
        team_mates: number;
    };
}

export interface IOutput {
    type: string;
    id: string;
    workspace_id: string;
    external_id: string;
    role: string;
    email: string;
    phone: string;
    name: string;
    avatar: string;
    owner_id: number;
    social_profiles: {
        type: string;
        data: {
            type: string;
            name: string;
            url: string;
        }[];
    };
    has_hard_bounced: boolean;
    marked_email_as_spam: boolean;
    unsubscribed_from_emails: boolean;
    created_at: number;
    updated_at: number;
    signed_up_at: number;
    last_seen_at: number;
    last_replied_at: number;
    last_contacted_at: number;
    last_email_opened_at: number;
    last_email_clicked_at: number;
    browser: string;
    browser_version: string;
    browser_language: string;
    os: string;
    location: {
        type: string;
        country: string;
        region: string;
        city: string;
    };
    custom_attributes: {
        paid_subscriber: boolean;
        monthly_spend: number;
        team_mates: number;
    };
    tags: {
        type: string;
        data: {
            type: string;
            id: string;
            url: string;
        }[];
        url: string;
        total_count: number;
        has_more: boolean;
    };
    notes: {
        type: string;
        data: {
            type: string;
            id: string;
            url: string;
        }[];
        url: string;
        total_count: number;
        has_more: boolean;
    };
    opted_out_subscription_types: {
        type: string;
        data: {
            id: string;
            type: string;
            url: string;
        }[];
        url: string;
        total_count: number;
        has_more: boolean;
    };
    companies: {
        type: string;
        data: {
            type: string;
            id: string;
            url: string;
        }[];
        url: string;
        total_count: number;
        has_more: boolean;
    };
    utm_campaign: string;
    utm_medium: string;
}
