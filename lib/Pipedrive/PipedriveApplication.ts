import ApplicationTypeEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/ApplicationTypeEnum';
import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { IWebhookApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';

export const PIPEDRIVE_URL = 'https://api.pipedrive.com';
export const ADDED = 'added';
export const ACTIVITY = 'activity';
export const SUBDOMAIN = 'subdomain';
export const NAME = 'pipedrive';

export default class PipedriveApplication extends ABasicApplication implements IWebhookApplication {

    public getApplicationType(): ApplicationTypeEnum {
        return ApplicationTypeEnum.WEBHOOK;
    }

    public getDescription(): string {
        return 'Sales pipeline and CRM software for deal makers, close deals in less time';
    }

    public getName(): string {
        return 'pipedrive';
    }

    public getPublicName(): string {
        return 'Pipedrive';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGREZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGQ9Ik0xNC44LTAuMWg3MC40YzguMiwwLDE0LjksNi43LDE0LjksMTQuOXY3MC40YzAsOC4yLTYuNywxNC45LTE0LjksMTQuOUgxNC44Yy04LjIsMC0xNC45LTYuNy0xNC45LTE0LjlWMTQuOAoJCUMtMC4xLDYuNiw2LjYtMC4xLDE0LjgtMC4xeiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTU1LjEsMTYuOGMtNy40LDAtMTEuNywzLjMtMTMuNyw1LjZjLTAuMi0yLTEuNi00LjUtNi42LTQuNUgyMy43djExLjVoNC41YzAuNywwLDEsMC4yLDEsMXY1Mi44aDEzLjFWNjIKCQljMiwxLjksNiw0LjUsMTIuMSw0LjVjMTIuOCwwLDIxLjgtMTAuMiwyMS44LTI0LjhDNzYuNCwyNi44LDY3LjgsMTYuOCw1NS4xLDE2Ljh6IE01Mi41LDU1Yy03LjEsMC0xMC4zLTYuOC0xMC4zLTEzLjEKCQljMC05LjksNS40LTEzLjUsMTAuNS0xMy41YzYuMiwwLDEwLjQsNS4zLDEwLjQsMTMuM0M2Myw1MC45LDU3LjcsNTUsNTIuNSw1NXoiLz4KPC9nPgo8L3N2Zz4K';
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const appInstall = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return !!appInstall?.[TOKEN] && !!appInstall?.[SUBDOMAIN];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const subdomain = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][SUBDOMAIN];
        let url = `https://${subdomain}.pipedrive.com/api/v1`;
        const join = _url?.includes('?') ? '&' : '?';
        url += `${_url}${join}api_token=${this.getToken(applicationInstall)}`;
        const request = new RequestDto(url.toString(), method, dto);
        request.setHeaders({
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        });
        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, TOKEN, 'API token', undefined, true))
            .addField(new Field(FieldType.TEXT, SUBDOMAIN, 'Subdomain', undefined, true));

        return new FormStack().addForm(form);
    }

    public getWebhookSubscribeRequestDto(
        applicationInstall: ApplicationInstall,
        subscription: WebhookSubscription,
        url: string,
    ): RequestDto {
        return this.getRequestDto(
            new ProcessDto(),
            applicationInstall,
            HttpMethods.POST,
            `${PIPEDRIVE_URL}/v1/webhooks`,
            JSON.stringify(
                {
                    /* eslint-disable @typescript-eslint/naming-convention */
                    subscription_url: url,
                    event_action: subscription.getParameters().action,
                    event_object: subscription.getParameters().object,
                    /* eslint-enable @typescript-eslint/naming-convention */
                },
            ),
        );
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [
            new WebhookSubscription(
                'New activity',
                'Webhook',
                '',
                {
                    action:
                    ADDED,
                    object:
                    ACTIVITY,
                },
            ),
        ];
    }

    public getWebhookUnsubscribeRequestDto(
        applicationInstall: ApplicationInstall,
        webhook: Webhook,
    ): RequestDto {
        return this.getRequestDto(
            new ProcessDto(),
            applicationInstall,
            HttpMethods.DELETE,
            `${PIPEDRIVE_URL}/v1/webhooks/${webhook.getWebhookId()}`,
        );
    }

    public processWebhookSubscribeResponse(
        dto: ResponseDto,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        applicationInstall: ApplicationInstall,
    ): string {
        return (dto.getJsonBody() as { data: { id: string } }).data.id;
    }

    public processWebhookUnsubscribeResponse(dto: ResponseDto): boolean {
        return dto.getResponseCode() === StatusCodes.OK;
    }

    private getToken(
        applicationInstall: ApplicationInstall,
    ): string {
        return applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][TOKEN];
    }

}
