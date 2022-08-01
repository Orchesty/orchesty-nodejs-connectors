import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'calendly-list-events-batch';

export default class CalendlyListEventsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const token = dto.getBatchCursor('');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `scheduled_events${token}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.collection ?? []);
    if (response.pagination.next_page_token) {
      const nextToken = `?page_token=${response.pagination.next_page_token}`;
      dto.setBatchCursor(nextToken);
    }
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse {
    collection: IOutput[];
    pagination: {
        count: number;
        next_page: string;
        previous_page: string;
        next_page_token: string;
        previous_page_token: string;
    }
}

interface IOutput {
    uri: string;
    name: string;
    status: string;
    start_time: Date;
    end_time: Date;
    event_type: string;
    location: {
        type: string;
        location: string;
    };
    invitees_counter: {
        total: number;
        active: number;
        limit: number;
    };
    created_at: Date;
    updated_at: Date;
    event_memberships: [{
        user: string;
    }];
    event_guests: [{
        email: string;
        created_at: Date;
        updated_at: Date;
    }];
}

/* eslint-enable @typescript-eslint/naming-convention */
