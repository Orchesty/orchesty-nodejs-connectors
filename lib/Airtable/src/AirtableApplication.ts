import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'airtable';
export const BASE_URL = 'https://api.airtable.com/v0';
export const BASE_ID = 'base_id';
export const TABLE_NAME = 'table_name';

export default class AirtableApplication extends ABasicApplication {

    public getDescription(): string {
        return 'Airtable is a low-code platform for building collaborative apps. Customize your workflow, collaborate, and achieve ambitious outcomes';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Airtable';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ImJvZHlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDEwMCAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMCAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZDQzAwO30KCS5zdDF7ZmlsbDojMzFDMkYyO30KCS5zdDJ7ZmlsbDojRUQzMDQ5O30KCS5zdDN7ZmlsbDojQzYyODQyO30KPC9zdHlsZT4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAwIDApIj4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00NC43LDEuM0w3LjQsMTkuN2MtMi4xLDEtMi4xLDQuNSwwLDUuNWwwLDBMNDQuOCw0M2MzLjMsMS42LDcsMS42LDEwLjIsMGwwLDBsMzcuNC0xNy43YzIuMS0xLDIuMS00LjUsMC01LjUKCQlsMCwwTDU1LjMsMS4zQzUxLjktMC40LDQ4LjEtMC40LDQ0LjcsMS4zIi8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTMuMyw1Mi43Vjk3YzAsMSwwLjQsMS45LDEuMSwyLjVjMC43LDAuNiwxLjYsMC43LDIuMywwLjNsMCwwbDQxLjctMTkuNGMxLTAuNSwxLjYtMS42LDEuNi0yLjhsMCwwVjMzLjMKCQljMC0xLTAuNC0xLjktMS4xLTIuNWMtMC43LTAuNi0xLjYtMC43LTIuMy0wLjNsMCwwTDU0LjksNDkuOUM1My45LDUwLjQsNTMuMyw1MS41LDUzLjMsNTIuNyIvPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQzLjUsNTVsLTEzLjYsNy45bC0yNi4xLDE1Yy0xLjcsMS0zLjgtMC41LTMuOC0yLjdsMCwwVjMzLjVjMC0wLjgsMC4zLTEuNSwwLjgtMmMwLjItMC4yLDAuNC0wLjQsMC42LTAuNgoJCWMwLjYtMC40LDEuNS0wLjYsMi4zLTAuMmwwLDBsMzkuNiwxOC44QzQ1LjQsNTAuNSw0NS41LDUzLjgsNDMuNSw1NSIvPgoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTQzLjUsNTVsLTEyLjQsNy4xTDAuOCwzMS41YzAuMi0wLjIsMC40LTAuNCwwLjYtMC42YzAuNi0wLjQsMS41LTAuNiwyLjMtMC4ybDAsMGwzOS42LDE4LjgKCQlDNDUuNCw1MC41LDQ1LjUsNTMuOCw0My41LDU1Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM));
        form.addField(new Field(FieldType.TEXT, TOKEN, 'API Key', undefined, true));
        form.addField(new Field(FieldType.TEXT, BASE_ID, 'Base id', undefined, true));
        form.addField(new Field(FieldType.TEXT, TABLE_NAME, 'Table name', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[TOKEN] && authorizationForm?.[BASE_ID] && authorizationForm?.[TABLE_NAME];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> | RequestDto {
        const headers = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
        };
        return new RequestDto(url ?? '', method, dto, data, headers);
    }

    public getValue(applicationInstall: ApplicationInstall, value: string): string | undefined {
        if (applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][value]) {
            return applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][value];
        }

        return undefined;
    }

    private getAccessToken(applicationInstall: ApplicationInstall): string {
        if (applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][TOKEN]) {
            return applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][TOKEN];
        }

        throw new Error('There is no access token');
    }

}
