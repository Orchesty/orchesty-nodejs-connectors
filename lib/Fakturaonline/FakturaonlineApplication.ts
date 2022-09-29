import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'fakturaonline';
export const API_KEY = 'api_key';
export const ID = 'id';

export default class FakturaonlineApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Fakturaonline';
    }

    public getDescription(): string {
        return 'Online invoicing software for businesses and freelancers';
    }

    public getLogo(): string {
        return 'data:image/jpeg;base64,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';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, 'API key', undefined, true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://api.fakturaonline.cz/v0/${uri}`;
        const request = new RequestDto(url, method, dto);
        const settings = applicationInstall.getSettings();
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: settings[AUTHORIZATION_FORM][API_KEY],
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
