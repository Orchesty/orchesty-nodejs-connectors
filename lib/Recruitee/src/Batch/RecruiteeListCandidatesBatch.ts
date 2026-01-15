import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'recruitee-list-candidates-batch';
const limit = 100;

export default class RecruiteeListCandidatesBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto<IInput>): Promise<BatchProcessDto> {
        const page = dto.getBatchCursor('1');
        const { companyId } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `api.recruitee.com/c/${companyId}/search/new/candidates?limit=${limit}&page=${page}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.hits ?? []);
        if (response.total > Number(page) * limit) {
            dto.setBatchCursor((Number(page) + 1).toString());
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    companyId: string;
}

interface IResponse {
    aggregations: null;
    hits: IOutput[];
    total: number;
}

export interface IOutput {
    rating: null;
    sources: [];
    gdpr_uncompleted_removal_request_created_at: null;
    last_activity_at: string;
    deleted_by: null;
    assigned_admins_ids: [];
    source: string;
    gdpr_expires_at: string;
    new: boolean;
    deleted_by_name: null;
    id: number;
    admin_id: number;
    rating_visible: boolean;
    name: string;
    photo_thumb_url: string;
    phones: string[];
    tags: [];
    unread_notifications: boolean;
    created_at: string;
    gdpr_status: string;
    initials: string;
    company_id: number;
    has_avatar: boolean;
    updated_at: string;
    deleted_at: null;
    emails: string[];
    placements: {
        disqualified: boolean;
        disqualified_at: null;
        disqualified_by: null;
        disqualified_by_name: null;
        disqualify_kind: null;
        disqualify_reason: null;
        eeo_data_status: null;
        id: number;
        offer: {
            id: number;
            kind: string;
            slug: string;
            status: string;
            title: string;
        };
        overdue_at: string;
        overdue_diff: number;
        positive_ratings: null;
        rating_visible: boolean;
        stage: {
            id: number;
            name: string;
            time_limit: number;
        };
    }[];
    gdpr_uncompleted_change_request_created_at: null;
    example: boolean;
    gdpr_consent_ever_given: boolean;
    highlight: null;
    soft_deleted_at: null;
    positive_ratings: null;
    deleted: boolean;
}

/* eslint-enable @typescript-eslint/naming-convention */
