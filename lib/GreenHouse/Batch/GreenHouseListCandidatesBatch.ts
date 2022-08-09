import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'green-house-list-candidates-batch';

export default class GreenHouseListCandidatesBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `candidates?per_page=500&page=${page}`,
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
export interface IOutput
{
  id: number,
  first_name: string,
  last_name: string,
  company: string,
  title: string,
  created_at: string,
  updated_at: string,
  last_activity: string,
  is_private: boolean,
  photo_url: null,
  attachments:
    {
      filename: string,
      url: string,
      type: string
    }[],
  application_ids: number[],
  phone_numbers: {
    value: string,
    type: string
  }[],
  addresses:
    {
      value: string,
      type: string
    }[],
  email_addresses:
    {
      value: string,
      type: string
    }[],
  website_addresses:
    {
      value: string,
      type: string
    }[],
  social_media_addresses: [],
  recruiter: {
    id: number,
    first_name: string,
    last_name: string,
    name: string,
    employee_id: null
  },
  coordinator: null,
  can_email: boolean,
  tags: string[],
  applications:
    {
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
        employee_id: null
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
      current_stage: null,
      answers: [],
      prospective_office: null,
      prospective_department: null,
      prospect_detail: {
        prospect_pool: {
          id: number,
          name: string
        },
        prospect_stage: {
          id: number,
          name: string
        },
        prospect_owner: {
          id: number,
          name: string
        }
      },
      attachments:
        {
          filename: string,
          url: string,
          type: string
        }[]
    }[],
  educations:
    {
      id: number,
      school_name: string,
      degree: string,
      discipline: string,
      start_date: string,
      end_date: string
    }[],
  employments:
    {
      id: number,
      company_name: string,
      title: string,
      start_date: string,
      end_date: string
    }[],
  linked_user_ids: number[],
  custom_fields: {
    desired_salary: string,
    work_remotely: boolean,
    graduation_year: string
  },
  keyed_custom_fields: {
    desired_salary: {
      name: string,
      type: string,
      value: string
    },
    work_remotely: {
      name: string,
      type: string,
      value: boolean
    },
    graduation_year_1: {
      name: string,
      type: string,
      value: string
    }
  }
}
/* eslint-enable @typescript-eslint/naming-convention */
