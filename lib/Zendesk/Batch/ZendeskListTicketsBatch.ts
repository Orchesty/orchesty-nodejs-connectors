import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';

export const NAME = 'zendesk-list-tickets-batch';

export default class ZendeskListTicketsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const offset = dto.getBatchCursor('0');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/tickets.json?page[size]=100&page[after]=${offset}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IOutput;

    dto.setItemList(response.tickets ?? []);
    if (response.meta.after_cursor) {
      dto.setBatchCursor(response.meta.after_cursor);
    }

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IOutput{
    tickets: [
        {
            assignee_id: number,
            collaborator_ids: number[],
            created_at: string,
            custom_fields: [
                {
                    id: number,
                    value: string
                }
            ],
            description: string,
            external_id: string,
            follower_ids: number[],
            group_id: number,
            has_incidents: boolean,
            id: number,
            organization_id: number,
            priority: string,
            problem_id: number,
            raw_subject: string,
            recipient: string,
            requester_id: number,
            satisfaction_rating: {
                comment: string,
                id: number,
                score: string
            },
            sharing_agreement_ids: number[],
            status: string,
            subject: string,
            submitter_id: number,
            tags: string[],
            type: string,
            updated_at: string,
            url: string,
            via: {
                channel: string
            }
        }
    ],
    meta: {
        has_more: boolean,
        after_cursor: string | null
        before_cursor: string | null
    },
    links: {
        next: string,
        prev: string
    }
    /* eslint-enable @typescript-eslint/naming-convention */
}
