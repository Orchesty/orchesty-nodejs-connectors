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

export const NAME = 'bulk-gate';
export const APPLICATION_ID = 'application_id';
export const APPLICATION_TOKEN = 'application_token';

export default class BulkGateApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Bulk Gate Application';
    }

    public getDescription(): string {
        return 'Messaging platform that enables companies and individuals to spread their message with personalized bulk SMS';
    }

    public getLogo(): string {
        return 'data:image/png;base64,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';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, APPLICATION_ID, 'Application Id', undefined, true))
            .addField(new Field(FieldType.TEXT, APPLICATION_TOKEN, 'Application token', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[APPLICATION_ID] && authorizationForm?.[APPLICATION_TOKEN];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://portal.bulkgate.com/api/1.0/simple/${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
        });

        if (data) {
            const newBody = {
                [APPLICATION_ID]: applicationInstall.getSettings()[AUTHORIZATION_FORM][APPLICATION_ID],
                [APPLICATION_TOKEN]: applicationInstall.getSettings()[AUTHORIZATION_FORM][APPLICATION_TOKEN],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...data as any,
            };
            request.setJsonBody(newBody);
        }

        return request;
    }

}
