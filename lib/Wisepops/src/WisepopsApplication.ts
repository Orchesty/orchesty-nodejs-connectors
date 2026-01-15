import { NAME } from '@orchesty/connector-git-hub/src/GitHubApplication';
import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { IWebhookApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';

const API_KEY = 'api_key';
const WISEPOPS_URL = 'https://app.wisepops.com/api1/hooks';
const EMAIL_EVENT = 'email';

export default class WisepopsApplication extends ABasicApplication implements IWebhookApplication {

    public getDescription(): string {
        return 'On-site marketing platform used to grow your email list and boost sales';
    }

    public getName(): string {
        return 'wisepops';
    }

    public getPublicName(): string {
        return 'Wisepops';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk5LjQ0IDk5LjM4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2Y1Mzc0OTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTEuMjgsOTkuNjlDMy41MSw5OS42OS0uODIsOTQuMTcuNTIsODcuMDVjMS4yNC02LjU3LDUuMTEtMTEuNDQsMTAtMTUuNjdhNzcuODMsNzcuODMsMCwwLDEsMzMtMTYuNzZjMi0uNDksMi4zLjA2LDEuODUsMS45QzQyLjA1LDcwLDM1Ljk0LDgyLjA1LDI2LjE5LDkyLjA4LDIxLjg5LDk2LjUxLDE2Ljc3LDk5LjMsMTEuMjgsOTkuNjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4yOCAtMC4zMSkiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMS4zOC4zMmEyMS41MywyMS41MywwLDAsMSwxMy4wOCw2YzEwLjkyLDEwLjI4LDE3LjQ5LDIzLDIxLDM3LjUxLjQ0LDEuODMtLjI1LDEuOTUtMS43MiwxLjU5LTE0LjI3LTMuNDctMjYuODgtMTAtMzcuMTEtMjAuNjVhMjEuMDUsMjEuMDUsMCwwLDEtNi4yNi0xNEMuMTQsNC40NCw0LjMyLjI4LDExLjM4LjMyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMjggLTAuMzEpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODkuNDUuMzFjNywwLDExLjM2LDUuNDQsMTAsMTIuNTgtMS4yNCw2LjY3LTUuMTksMTEuNi0xMC4xNiwxNS44N2E3Ny41MSw3Ny41MSwwLDAsMS0zMi43OCwxNi42Yy0xLjguNDQtMi40My4yLTEuOTMtMS44NEM1OC4wNSwyOS41NCw2NC40LDE3LjE3LDc0Ljc1LDcsNzksMi44OCw4NC43NS4zMyw4OS40NS4zMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjI4IC0wLjMxKSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTg4Ljc5LDk5LjY5YTIwLjY4LDIwLjY4LDAsMCwxLTEyLjU0LTUuNDJDNjQuODEsODMuOTQsNTguMDcsNzAuODgsNTQuNTYsNTZjLS4zMS0xLjI4LS4xOS0xLjg0LDEuMzYtMS40OCwxNSwzLjU0LDI4LjEsMTAuMzIsMzguNDYsMjEuODZhMTkuODgsMTkuODgsMCwwLDEsNS4yOCwxMy4wNkM5OS43OCw5NS42LDk1LjY2LDk5LjY3LDg4Ljc5LDk5LjY5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMjggLTAuMzEpIi8+PC9zdmc+';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]:

                `WISEPOPS-API key="${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][API_KEY]}"`,
        });

        if (data) {
            request.setBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, API_KEY, 'API Key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

    public getWebhookSubscribeRequestDto(
        applicationInstall: ApplicationInstall,
        subscription: WebhookSubscription,
        url: string,
    ): RequestDto {
        const request = ProcessDto.createForFormRequest(NAME, applicationInstall.getUser(), crypto.randomUUID());
        return this.getRequestDto(
            request,
            applicationInstall,
            HttpMethods.POST,
            WISEPOPS_URL,
            JSON.stringify({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                target_url: url,
                event: subscription.getParameters().name,
            }),
        );
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [
            new WebhookSubscription('Collected Emails', 'Webhook', '', { name: EMAIL_EVENT }),
        ];
    }

    public getWebhookUnsubscribeRequestDto(applicationInstall: ApplicationInstall, webhook: Webhook): RequestDto {
        const request = ProcessDto.createForFormRequest(NAME, applicationInstall.getUser(), crypto.randomUUID());
        return this.getRequestDto(
            request,
            applicationInstall,
            HttpMethods.DELETE,
            `${WISEPOPS_URL}?hook_id=${webhook.getWebhookId()}`,
        );
    }

    public processWebhookSubscribeResponse(
        dto: ResponseDto,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        applicationInstall: ApplicationInstall,
    ): string {
        return (dto.getJsonBody() as { id: string }).id;
    }

    public processWebhookUnsubscribeResponse(dto: ResponseDto): boolean {
        return dto.getResponseCode() === StatusCodes.OK;
    }

}
