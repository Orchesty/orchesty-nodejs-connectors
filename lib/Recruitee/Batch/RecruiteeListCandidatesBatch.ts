import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'recruitee-list-candidates-batch';

export default class RecruiteeListCandidatesBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');

    const { companyId } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `api.recruitee.com/c/${companyId}/search/new/candidates?limit=100&page=${page}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.hits ?? []);
    if (response.total <= 0) {
      dto.setBatchCursor((Number(page) + 1).toString());
    }
    return dto;
  }
}
/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput{
  companyId: string
}

interface IResponse{
  aggregations: null,
  hits: IOutput[],
  total: number
}

export interface IOutput{
  rating: null,
  sources: [],
  gdpr_uncompleted_removal_request_created_at: null,
  last_activity_at: string,
  deleted_by: null,
  assigned_admins_ids: [],
  source: string,
  gdpr_expires_at: string,
  new: boolean,
  deleted_by_name: null,
  id: number,
  admin_id: number,
  rating_visible: boolean,
  name: string,
  photo_thumb_url: string,
  phones: string[],
  tags: [],
  unread_notifications: boolean,
  created_at: string,
  gdpr_status: string,
  initials: string,
  company_id: number,
  has_avatar: boolean,
  updated_at: string,
  deleted_at: null,
  emails: string[],
  placements:
    {
      disqualified: boolean,
      disqualified_at: null,
      disqualified_by: null,
      disqualified_by_name: null,
      disqualify_kind: null,
      disqualify_reason: null,
      eeo_data_status: null,
      id: number,
      offer: {
        id: number,
        kind: string,
        slug: string,
        status: string,
        title: string
      },
      overdue_at: string,
      overdue_diff: number,
      positive_ratings: null,
      rating_visible: boolean,
      stage: {
        id: number,
        name: string,
        time_limit: number
      }
    }[],
  gdpr_uncompleted_change_request_created_at: null,
  example: boolean,
  gdpr_consent_ever_given: boolean,
  highlight: null,
  soft_deleted_at: null,
  positive_ratings: null,
  deleted: boolean
}
/* eslint-enable @typescript-eslint/naming-convention */
