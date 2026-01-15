import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'merk-suggest-connector';

export default class MerkSuggestConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const {
            regno, email, name, country_code, bank_account, only_active, expand_regno, sort,
        } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,

            `suggest/?regno=${regno}&email=${email}&name=${name}&bank_account=${bank_account}&only_active=${only_active}&expand_regno=${expand_regno}&sort_by=${sort}&country_code=${country_code}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    regno: number;
    email: string;
    name: string;
    country_code: string;
    bank_account: string;
    only_active: boolean;
    expand_regno: boolean;
    sort: string;

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
    bank_accounts: {
        account_number: string;
        bank_code: string;
    }[];
    phones: {
        score: string;
        acc: string;
        number: string;
    }[];
    mobiles: {
        score: string;
        acc: string;
        number: string;
    }[];
    emails: {
        score: string;
        acc: string;
        email: string;
    }[];
    webs: {
        score: string;
        acc: string;
        url: string;
    }[];
    industry: {
        id: string;
        text: string;
    };
    secondary_industries: {
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
    insolvency_cases: {
        stamp: string;
        status: number;
        ws_id: string;
        court_file_nr: string;
    }[];
    sk_insolvency_cases: {
        stamp: string;
        status: number;
        type_id: number;
        ru_id: number;
        court_file_nr: string;
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
