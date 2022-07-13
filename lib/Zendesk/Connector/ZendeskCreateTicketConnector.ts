import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'zendesk-create-ticket-connector';

export default class ZendeskCreateTicketConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.POST, '/tickets.json', body);
    const resp = await this._sender.send(req, [201]);

    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
  ticket: {
    comment: {
      body: string
    },
    priority: string,
    subject: string
  }
}

export interface IOutput {
  ticket: {
    assignee_id: number,
    collaborator_ids: number[],
    created_at: string,
    custom_fields: [
      {
        id: number,
        value: string
      },

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
  /* eslint-enable @typescript-eslint/naming-convention */
}
