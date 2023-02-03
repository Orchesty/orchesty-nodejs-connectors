import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { USERNAME } from '../GreenHouseApplication';

export const NAME = 'green-house-add-candidate-connector';

export default class GreenHouseAddCandidateConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            'candidates',
            { data: dto.getJsonData() },
        );
        const username = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][USERNAME];
        req.addHeaders({ 'On-Behalf-Of': username }); // eslint-disable-line
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    first_name: string;
    last_name: string;
    company: string;
    title: string;
    is_private: boolean;
    phone_numbers: {
        value: string;
        type: string;
    }[];
    addresses: {
        value: string;
        type: string;
    }[];
    email_addresses: {
        value: string;
        type: string;
    }[];
    website_addresses: {
        value: string;
        type: string;
    }[];
    social_media_addresses: {
        value: string;
    }[];
    educations: {
        school_id: number;
        discipline_id: number;
        degree_id: number;
        start_date: string;
        end_date: string;
    }[];
    employments: {
        company_name: string;
        title: string;
        start_date: string;
        end_date: string;
    }[];
    tags: string[];
    applications: {
        job_id: number;
    }[];
}

export interface IOutput {
    id: number;
    first_name: string;
    last_name: string;
    company: string;
    title: string;
    created_at: string;
    updated_at: string;
    last_activity: string;
    is_private: boolean;
    photo_url: null;
    attachments: [];
    application_ids: number[];
    phone_numbers: {
        value: string;
        type: string;
    }[];
    addresses: {
        value: string;
        type: string;
    }[];
    email_addresses: {
        value: string;
        type: string;
    }[];
    website_addresses: {
        value: string;
        type: string;
    }[];
    social_media_addresses: {
        value: string;
    }[];
    recruiter: null;
    coordinator: null;
    can_email: boolean;
    tags: string[];
    applications: {
        id: number;
        candidate_id: number;
        prospect: boolean;
        applied_at: string;
        rejected_at: null;
        last_activity_at: string;
        location: {
            address: string;
        };
        source: null;
        credited_to: null;
        rejection_reason: null;
        rejection_details: null;
        jobs: {
            id: number;
            name: string;
        }[];
        job_post_id: number;
        status: string;
        current_stage: {
            id: number;
            name: string;
        };
        answers: [];
        prospective_office: null;
        prospective_department: null;
        prospect_detail: {
            prospect_pool: null;
            prospect_stage: null;
            prospect_owner: null;
        };
        attachments: [];
    }[];
    educations: {
        id: number;
        school_name: string;
        discipline: string;
        degree: string;
    }[];
    employments: {
        id: number;
        company_name: string;
        title: string;
        start_date: string;
        end_date: string;
    }[];
    custom_fields: {
        desired_salary: null;
        work_remotely: null;
        graduation_year: null;
    };
    keyed_custom_fields: {
        desired_salary: null;
        work_remotely: null;
        graduation_year_1: null;
    };

}

/* eslint-enable @typescript-eslint/naming-convention */
