import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import {
    ACCOUNT_OWNER_NAME, APP_LINK_NAME, CREATOR_FORM, REPORT_LINK_NAME,
} from '../ZohoApplication';

export const NAME = 'zoho-get-records-connector';

export default class ZohoGetRecordsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { recordId } = dto.getJsonData();

        if (!recordId) {
            throw new Error('Record ID is missing');
        }

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const accountOwnerName = appInstall.getSettings()[CREATOR_FORM][ACCOUNT_OWNER_NAME];
        const appLink = appInstall.getSettings()[CREATOR_FORM][APP_LINK_NAME];
        const reportLink = appInstall.getSettings()[CREATOR_FORM][REPORT_LINK_NAME];
        const url = `/${accountOwnerName}/${appLink}/report/${reportLink}/${recordId}`;

        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.GET, url);
        const resp = await this.getSender().send<IResponse>(req, [200]);

        const records = resp.getJsonBody();

        if (records.code !== 3000) {
            throw new Error('The request failed');
        }

        return dto.setNewJsonData(records.data);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    code: number;
    data: IOutput;
}

export interface IInput {
    recordId: string;
}

export interface IOutput {
    Multi_Line: string;
    Email: string;
    Address: {
        display_value: string;
        country: string;
        district_city: string;
        latitude: string;
        address_line_1: string;
        state_province: string;
        address_line_2: string;
        postal_code: string;
        longitude: string;
    };
    Phone_Number: string;
    Time: string;
    Image: string;
    Url: {
        value: string;
        url: string;
    };
    Name: {
        display_value: string;
        prefix: string;
        last_name: string;
        suffix: string;
        first_name: string;
    };
    Formula: string;
    Single_Line: string;
    Number: string;
    Decimal: string;
    Decision_box: string;
    File_upload: string;
    Checkbox: string;
    Currency: string;
    Rich_Text: string;
    Lookup: {
        display_value: string;
        ID: string;
    };
    ID: string;
    Integration: {
        display_value: string;
        ID: string;
    };
    Multi_Select: string[];
    Keyword: string;
    Percent: string;
    Prediction: string;
    Dropdown: string;
    Inline_SubForm: { display_value: string; ID: string };
    Radio: string;
    Auto_Number: string;
    users: string;
    Audio: string;
    Video: string;
    Signature: string;
    Sentiment: string;
    Date_Time: string;
    Date_field: string;
    Object_Detection: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
