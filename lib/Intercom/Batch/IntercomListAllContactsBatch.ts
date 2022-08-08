import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'intercom-list-all-contacts-batch';

export default class IntercomListAllContactsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const token = dto.getBatchCursor('');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `contacts${token}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (response.pages.next) {
      const startingAfter = `?starting_after=${response.pages.next.starting_after}`;
      dto.setBatchCursor(startingAfter);
    }
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse {
    type: string;
    data: IOutput[];
    total_count: number;
    pages: {
        type: string;
        next: {
            page: number;
            starting_after: string;
        };
        page: number;
        per_page: number;
        total_pages: number;
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
    };
    notes: {
        type: string;
        data: {
            type: string;
            id: string;
            url: string;
        }[];
        url: string;
    };
    companies: {
        type: string;
        data: {
            type: string;
            id: string;
            url: string;
        }[];
        url: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
