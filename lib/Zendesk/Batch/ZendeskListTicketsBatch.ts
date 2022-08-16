import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'zendesk-list-tickets-batch';

export default class ZendeskListTicketsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const offset = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/tickets.json?per_page=100&page=${offset}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.tickets ?? []);
    if (response.next_page != null) {
      dto.setBatchCursor((Number(offset) + 1).toString());
    }

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
  tickets: IOutput[],
  next_page: string,
  links: {
    next: string,
    prev: string
  }
}

export interface IOutput {
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
  /* eslint-enable @typescript-eslint/naming-convention */
}
