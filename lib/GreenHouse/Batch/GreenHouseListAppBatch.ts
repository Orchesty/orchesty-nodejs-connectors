import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'green-house-list-app-batch';

export default class GreenHouseListAppBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `applications?per_page=500&page=${page}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IOutput[];

    dto.setItemList(response ?? []);
    if (response.length >= 500) {
      dto.setBatchCursor((Number(page) + 1).toString());
    }
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput{
  id: number,
  candidate_id: number,
  prospect: boolean,
  applied_at: string,
  rejected_at: null,
  last_activity_at: string,
  location: {
    address: string
  },
  source: {
    id: number,
    public_name: string
  },
  credited_to: {
    id: number,
    first_name: string,
    last_name: string,
    name: string,
    employee_id: string
  },
  rejection_reason: null,
  rejection_details: null,
  jobs:
    {
      id: number,
      name: string
    }[],
  job_post_id: number,
  status: string,
  current_stage: {
    id: number,
    name: string
  },
  answers:
    {
      question: string,
      answer: string
    }[],
  prospective_office: null,
  prospective_department: null,
  prospect_detail: {
    prospect_pool: null,
    prospect_stage: null,
    prospect_owner: null
  },
  custom_fields: {
    application_custom_test: string
  },
  keyed_custom_fields: {
    application_custom_test: {
      name: string,
      type: string,
      value: string
    }
  },
  attachments:
    {
      filename: string,
      url: string,
      type: string
    }[]
}
/* eslint-enable @typescript-eslint/naming-convention */
