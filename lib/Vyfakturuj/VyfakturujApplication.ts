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
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'vyfakturuj';
export const USER_EMAIL = 'user_email';
export const API_KEY = 'api_key';

export default class VyfakturujApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Vyfakturuj';
    }

    public getDescription(): string {
        return 'Application that makes it very easy to issue invoices to all clients and to send and record payments directly';
    }

    public getLogo(): string {
        return 'data:image/png;base64,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';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER_EMAIL, ' User email', undefined, true))
            .addField(new Field(FieldType.TEXT, API_KEY, ' Api Key', undefined, true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://api.vyfakturuj.cz/2.0${uri}`, method, dto);
        const userEmail = applicationInstall.getSettings()[AUTHORIZATION_FORM][USER_EMAIL];
        const apiKey = applicationInstall.getSettings()[AUTHORIZATION_FORM][API_KEY];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${userEmail}:${apiKey}`)}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
