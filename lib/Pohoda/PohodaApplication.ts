import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'pohoda';
export const AUTH_TOKEN = 'Authorization_token';
export const BASE_URL = 'base_url';
export const COMPANY_ID = 'company_id';

export default class PohodaApplication extends ABasicApplication {

    public getDescription(): string {
        return 'POHODA is a popular economic accounting software for small, medium and larger companies. The program is also suitable for contributory and non-profit organizations.';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, BASE_URL, ' Base url', undefined, true))
            .addField(new Field(FieldType.TEXT, COMPANY_ID, ' Company ID', undefined, true))
            .addField(new Field(FieldType.TEXT, AUTH_TOKEN, ' Authorization token', 'QDo=', true));

        return new FormStack().addForm(form);
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Pohoda';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const baseUrl = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][BASE_URL];
        const token = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][AUTH_TOKEN];
        const request = new RequestDto(`${baseUrl}/${url}`, method, dto);

        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: 'text/xml; charset=windows-1250',
            [CommonHeaders.ACCEPT]: 'text/xml',
            'STW-Authorization': `Basic ${token}`,
        });

        if (data) {
            request.setBody(data);
        }

        return request;
    }

}
