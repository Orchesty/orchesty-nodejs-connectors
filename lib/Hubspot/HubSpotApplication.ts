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
import ScopeSeparatorEnum from '@orchesty/nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const APP_ID = 'app_id';
export const BASE_URL = 'https://api.hubapi.com';

export default class HubSpotApplication extends AOAuth2Application implements IWebhookApplication {

    public getApplicationType(): ApplicationTypeEnum {
        return ApplicationTypeEnum.WEBHOOK;
    }

    public getName(): string {
        return 'hub-spot';
    }

    public getPublicName(): string {
        return 'HubSpot';
    }

    public getAuthUrl(): string {
        return 'https://app.hubspot.com/oauth/authorize';
    }

    public getTokenUrl(): string {
        return 'https://api.hubapi.com/oauth/v1/token';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk1LjE4IDk5LjY0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmN2E1OTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzUuNDksMzNWMjEuMDhhOS4xMyw5LjEzLDAsMCwwLDUuMjctOC4yM3YtLjI4YTkuMTQsOS4xNCwwLDAsMC05LjE0LTkuMTNoLS4yN2E5LjE0LDkuMTQsMCwwLDAtOS4xNCw5LjEzdi4yOGE5LjEzLDkuMTMsMCwwLDAsNS4yNyw4LjIzVjMzYTI1LjkxLDI1LjkxLDAsMCwwLTEyLjMsNS40MUwyMi42MywxM0E5LjczLDkuNzMsMCwwLDAsMjMsMTAuNDUsMTAuMywxMC4zLDAsMSwwLDEyLjY5LDIwLjczaDBhMTAuMjYsMTAuMjYsMCwwLDAsNS4wNy0xLjM4TDQ5LjgxLDQ0LjI4YTI2LDI2LDAsMCwwLC4zOSwyOS4yNGwtOS43NCw5Ljc1YTguNTgsOC41OCwwLDEsMCw1LjYzLDUuNjNsOS42NC05LjY1QTI2LDI2LDAsMSwwLDc1LjQ5LDMzbS00LDM5YTEzLjM0LDEzLjM0LDAsMSwxLS43MS0yNi42N2guNzFhMTMuMzQsMTMuMzQsMCwwLDEsMCwyNi42NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIuNDEgLTAuMTQpIi8+PC9zdmc+';
    }

    public getDescription(): string {
        return 'Marketing, sales, and customer service, with a completely free CRM at its core';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        return new RequestDto(
            url ?? BASE_URL,
            method,
            dto,
            data,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.ACCEPT]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
            },
        );
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true))
            .addField(new Field(FieldType.TEXT, APP_ID, 'Application Id', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET]
            && authorizationForm?.[APP_ID];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['oauth', 'crm.lists.read', 'crm.objects.contacts.read', 'crm.objects.contacts.write', 'crm.objects.companies.write', 'crm.schemas.contacts.read', 'crm.lists.write', 'crm.objects.companies.read', 'crm.objects.deals.read', 'crm.objects.deals.write', 'crm.schemas.companies.read', 'crm.schemas.companies.write', 'crm.schemas.contacts.write', 'crm.schemas.deals.read', 'crm.schemas.deals.write', 'crm.objects.owners.read'];
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [
            new WebhookSubscription('Create Contact', 'Webhook', '', { name: 'contact.creation' }),
            new WebhookSubscription('Delete Contact', 'Webhook', '', { name: 'contact.deletion' }),
        ];
    }

    public getWebhookSubscribeRequestDto(
        applicationInstall: ApplicationInstall,
        subscription: WebhookSubscription,
        url: string,
    ): RequestDto {
        const hubspotUrl = `${BASE_URL}/webhooks/v1/${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][APP_ID]}`;
        const body = JSON.stringify({
            webhookUrl: url,
            subscriptionDetails: {
                subscriptionType: subscription.getParameters().name,
                propertyName: 'email',
            },
            enabled: false,
        });

        return this.getRequestDto(new ProcessDto(), applicationInstall, HttpMethods.POST, hubspotUrl, body);
    }

    public getWebhookUnsubscribeRequestDto(applicationInstall: ApplicationInstall, webhook: Webhook): RequestDto {
        const url = `${BASE_URL}/webhooks/v1/${applicationInstall
            .getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][APP_ID]}/subscriptions/${webhook.getWebhookId()}`;

        return this.getRequestDto(new ProcessDto(), applicationInstall, HttpMethods.DELETE, url);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public processWebhookSubscribeResponse(dto: ResponseDto, applicationInstall: ApplicationInstall): string {
        const jsonBody = dto.getJsonBody() as { id: string };

        return jsonBody.id ?? '';
    }

    public processWebhookUnsubscribeResponse(dto: ResponseDto): boolean {
        return dto.getResponseCode() === 204;
    }

    protected getScopesSeparator(): string {
        return ScopeSeparatorEnum.SPACE;
    }

}
