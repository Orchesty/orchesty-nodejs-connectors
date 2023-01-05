import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'merk-get-company-connector';

export default class MerkGetCompanyConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const {
            regno, vatno, src_app, country_code,
        } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `company/?regno=${regno}&vatno=${vatno}&src_app=${src_app}&country_code=${country_code}`,
        );

        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    regno: string;
    vatno: string;
    src_app: string;
    country_code: string;

}

export interface IOutput {
    regno: string;
    regno_str: string;
    vatno: string;
    taxno: string;
    databox_ids: [];
    name: string;
    legal_form: {
        id: string;
        text: string;
    };
    estab_date: string;
    closing_date: string;
    status: {
        id: string;
        text: string;
    };
    is_active: boolean;
    address: {
        country_code: string;
        number_descriptive: string;
        municipality_part: string;
        municipality: string;
        number: string;
        street: string;
        postal_code: string;
        number_orientation: string;
        municipality_first: string;
        street_fixed: string;
        region: {
            id: string;
            text: string;
        };
        county: {
            id: string;
            text: string;
        };
        lines: [];
        text: string;
    };
    bank_accounts:
    {
        account_number: string;
        bank_code: string;
    }[];
    phones:
    {
        score: string;
        acc: string;
        number: string;
    }[];
    mobiles:
    {
        score: string;
        acc: string;
        number: string;
    }[];
    emails:
    {
        score: string;
        acc: string;
        email: string;
    }[];
    webs:
    {
        score: string;
        acc: string;
        url: string;
    }[];
    industry: {
        id: string;
        text: string;
    };
    secondary_industries:
    {
        id: string;
        text: string;
    }[];
    magnitude: {
        id: string;
        trend: string;
        lower_bound: string;
        upper_bound: string;
        text: string;
    };
    turnover: {
        id: string;
        trend: string;
        lower_bound: string;
        upper_bound: string;
        text: string;
    };
    court: {
        name: string;
        file_nr: string;
    };
    is_vatpayer: boolean;
    vat_registration_type: boolean;
    vat_registration_date: string;
    is_unreliable_vatpayer: boolean;
    unreliable_vatpayer_since: string;
    vzp_debt: string;
    insolvency_cases:
    {
        stamp: string;
        status: number;
        ws_id: string;
        court_file_nr: string;
    }[];
    sk_insolvency_cases:
    {
        stamp: string;
        status: number;
        type_id: number;
        ru_id: number;
        court_file_nr: string;
    }[];
    gps: {
        lat: number;
        lon: number;
    };
    salutation: string;
    owning_type: {
        id: string;
        text: string;
    };
    profit: {
        trend: string;
        year: number;
        amount: number;
    };
    ebidta: {
        year: number;
        amount: number;
    };
    bank_accounts_balance: {
        year: number;
        amount: number;
    };
    company_index: {
        year: number;
        value: number;
    };
    link: string;
    business_premises_count: number;
    active_licenses_count: number;
    body: {
        average_age: number;
        persons:
        {
            country_code: string;
            first_name: string;
            last_name: string;
            age: number;
            degree_after: string;
            degree_before: string;
            link: string;
            gender: string;
            salutation: string;
            company_role: string;
            company_role_id: number;
            address: {
                country_code: string;
                number_descriptive: string;
                municipality_part: string;
                municipality: string;
                number: string;
                street: string;
                postal_code: string;
                number_orientation: string;
                municipality_first: string;
                street_fixed: string;
                text: string;
            };
        }[];
    };
    esi:
    {
        project_name: string;
        status_id: number;
        esi_program: string;
        eu_fund: string;
        allocation_amount: number;
        total_paid_from_project_start: number;
        iterim_payment_date: string;
        allocation_date: string;
        expected_end_date_of_the_operation: string;
        union_cofinancing_rate: number;
    }[];
    government_grants:
    {
        grant_id: string;
        beneficiary_id: string;
        case_id: string;
        project_code: string;
        project_name: string;
        project_id: string;
        signed_date: string;
        amount_requested: number;
        amount_granted: number;
    }[];
    trademarks:
    {
        wording: string;
        reproduction: string;
        stamp_application: string;
        stamp_registered: string;
        product_or_service_classes: string;
        image_classes: string;
        nr_register: string;
        nr_application: number;
        source: string;
        url: string;
        url_doc: string;
        tm_type: string;
        status: string;
    }[];
    twitter: [];
    facebook: [];
    linkedin: [];
    acting_manner:
    {
        manner_text: string;
        start_date: string;
    }[];
    last_financial_statement: {
        published_date: string;
        statement_date: string;
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
