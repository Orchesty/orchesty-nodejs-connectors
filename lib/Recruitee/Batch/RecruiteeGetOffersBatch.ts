import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { YOUR_COMPANY } from '../RecruiteeApplication';

export const NAME = 'recruitee-get-offers-batch';

export default class RecruiteeGetOffersBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const yourCompany = appInstall.getSettings()[AUTHORIZATION_FORM][YOUR_COMPANY];
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `${yourCompany}.recruitee.com/api/offers/`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.offers ?? []);
        dto.removeBatchCursor();

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse {
    offers: IOutput[];
}

export interface IOutput {
    id: number;
    slug: string;
    position: number;
    status: string;
    options_phone: string;
    options_photo: string;
    options_cover_letter: string;
    options_cv: string;
    remote: boolean;
    country_code: string;
    state_code: string;
    postal_code: string;
    min_hours: number;
    max_hours: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    city: string;
    country: string;
    careers_url: string;
    careers_apply_url: string;
    company_name: string;
    department: string;
    created_at: string;
    updated_at: string;
    published_at: string;
    close_at: string;
    employment_type_code: string;
    category_code: string;
    experience_code: string;
    education_code: string;
    tags: string[];
    translations: {
        en: {
            title: string;
            description: string;
            requirements: string;
        };
    };
    open_questions:
    {
        id: number;
        kind: string;
        required: boolean;
        position: number;
        body: string;
        translations: {
            en: {
                body: string;
            };
        };
        open_question_options: [];
        options: {
            length: number;
        };
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
