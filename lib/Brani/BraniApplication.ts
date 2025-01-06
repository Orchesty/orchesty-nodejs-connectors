import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'brani';

export default class BraniApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Brani';
    }

    public getDescription(): string {
        return 'BRANI.cz is the proverbial Swiss for e-shop automation. Just like a Swiss Army Knife will make survival in the wild easier, automation from BRANI.CZ will help you fight your daily routine and save you at least an hour a day.';
    }

    public getLogo(): string {
        return 'data:image/webp;base64,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';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings');
        form.addField(new Field(FieldType.TEXT, TOKEN, 'Api key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        return authorizationForm?.[TOKEN];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://api.brani.cz/${_url}`, method, dto);
        const token = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][TOKEN];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [
            new WebhookSubscription('status_change', 'start', 'example-topology'),
        ];
    }

}
