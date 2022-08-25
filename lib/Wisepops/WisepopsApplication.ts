import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { IWebhookApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
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
import { BodyInit } from 'node-fetch';

const API_KEY = 'api_key';
const WISEPOOPS_URL = 'https://app.wisepops.com/api1/hooks';
const EMAIL_EVENT = 'email';

export default class WisepopsApplication extends ABasicApplication implements IWebhookApplication {

    public getDescription(): string {
        return 'On-site marketing platform used to grow your email list and boost sales. It allows you to display a message to any segment of your visitors using popups, sign-up bars, exit-intent popups, and on-site messaging without any dev needed.';
    }

    public getName(): string {
        return 'wisepops';
    }

    public getPublicName(): string {
        return 'Wisepops';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iI0ZGRkVGRSIgZD0iTTc5LjUsMTUwYy0yNi41ODMsMC01My4wNDIsMC03OS41LDBDMCwxMDAsMCw1MCwwLDBjNTAsMCwxMDAsMCwxNTAsMGMwLDUwLDAsMTAwLDAsMTUwDQoJCUMxMjYuNTQyLDE1MCwxMDMuMDgzLDE1MCw3OS41LDE1MHogTTgzLjU3MSw5Mi43OThjMy4zMjksOS40NjksNy43OTYsMTguMzQ3LDEzLjg0OCwyNi4zODFjMy42NTksNC44NTgsNy41MzYsOS41MjgsMTIuNTc0LDEzLjA1Nw0KCQljNC41NTcsMy4xOTMsOS41MzMsNS4zMjQsMTUuMTk4LDUuMTkxYzUuMjExLTAuMTIzLDkuMjA2LTIuMzU1LDExLjI4Mi03LjM1OWMxLjE2OS0yLjgxOCwxLjE5My01Ljc2NCwwLjY1Mi04LjcxNg0KCQljLTEuMTQ4LTYuMjc1LTQuMzA1LTExLjQ5LTguNzYzLTE1LjkxOEMxMTUuMzQsOTIuNTAyLDk5LjU3Myw4NC42NDgsODEuODMxLDgwLjUwNmMtMC40OTUtMC4xMTYtMS4wMTEtMC4xMzktMS44OTUtMC4yNTYNCgkJQzgxLjE4Miw4NC41NjIsODIuMzQ1LDg4LjU4Nyw4My41NzEsOTIuNzk4eiBNODIuMTg0LDYxLjU1OGMtMC42ODcsMi42NzMtMS4zNzMsNS4zNDYtMi4xMDUsOC4xOTcNCgkJYzAuNjA1LTAuMDgzLDAuODkyLTAuMDksMS4xNi0wLjE2M2MzLjc2OC0xLjAzMyw3LjU5OS0xLjg4NCwxMS4yODgtMy4xNDljMTMuMjc0LTQuNTU1LDI1LjIwOS0xMS4zOTQsMzUuMjY0LTIxLjI5Ng0KCQljNS4yMDgtNS4xMjksOC45MzMtMTEuMDgsOS41NzQtMTguNTVjMC4zOTUtNC42MDMtMC43OTEtOC43MDUtNC42NjYtMTEuNjFjLTMuMzk4LTIuNTQ4LTcuMjk5LTIuODQ2LTExLjMxNy0yLjEyMw0KCQljLTYuOTE1LDEuMjQ0LTEyLjQ0OCw0Ljk1LTE3LjIwMyw5Ljk0MUM5My42NzIsMzMuODM1LDg2LjY1OCw0Ni44NjMsODIuMTg0LDYxLjU1OHogTTY3LjAzMiw1OS4wOQ0KCQljLTIuNzE2LTguMjU2LTYuMzE0LTE2LjEtMTEuMDY2LTIzLjM4N2MtMy45NDYtNi4wNS04LjM1Ni0xMS43MzktMTMuOTQyLTE2LjM3NmMtNC45Mi00LjA4NS0xMC40OTctNi43NTctMTcuMDQ4LTYuNzY4DQoJCWMtNy4zMy0wLjAxMy0xMi40NDEsNS4xMTMtMTIuNDI0LDEyLjQzNmMwLjAxNiw2Ljc0NywyLjgwOCwxMi40NjEsNy4xMDEsMTcuNDIyYzUuNjAzLDYuNDc0LDEyLjQwNCwxMS41MzksMTkuNzg0LDE1LjgyNg0KCQljOS4xMzEsNS4zMDQsMTguODM4LDkuMTQ4LDI5LjE4NiwxMS4zMjZjMC4zNCwwLjA3MiwwLjY5MiwwLjA4MywxLjM0MSwwLjE1OEM2OC45NjUsNjYuMDc4LDY4LjAzMiw2Mi42NzcsNjcuMDMyLDU5LjA5eg0KCQkgTTU1LjY0OSwxMTQuNzcxYzYuODc4LTEwLjU1MywxMS41NTktMjEuOTk4LDE0LjE3NC0zNC41MjZjLTAuNjE2LDAuMDk2LTEuMDE0LDAuMTM4LTEuNDAyLDAuMjIyDQoJCWMtMTEuOTA3LDIuNTg2LTIyLjk3Niw3LjItMzMuMTU0LDEzLjg4OWMtNi42MjcsNC4zNTUtMTIuODYxLDkuMjE0LTE3LjU0NSwxNS43MjJjLTMuMTkyLDQuNDM2LTUuMTk2LDkuMzc2LTUuMTc2LDE0Ljk2DQoJCWMwLjAyNiw3LjI2Niw1LjA1NywxMi4zNTksMTIuMzI2LDEyLjQwMWM2LjIyMywwLjAzNiwxMS42MDMtMi4zODIsMTYuMzgtNi4xNDhDNDcuMDI1LDEyNi43NCw1MS40ODQsMTIwLjk5MSw1NS42NDksMTE0Ljc3MXoiLz4NCgk8cGF0aCBmaWxsPSIjRjUzODRBIiBkPSJNODMuNTQsOTIuNzA1Yy0xLjE5NC00LjExOC0yLjM1OC04LjE0My0zLjYwNS0xMi40NTVjMC44ODQsMC4xMTYsMS40MDEsMC4xNCwxLjg5NSwwLjI1Ng0KCQljMTcuNzQyLDQuMTQyLDMzLjUwOSwxMS45OTYsNDYuNTMxLDI0LjkyOGM0LjQ1OCw0LjQyNyw3LjYxNSw5LjY0Myw4Ljc2MywxNS45MThjMC41NCwyLjk1MywwLjUxNyw1Ljg5OC0wLjY1Miw4LjcxNg0KCQljLTIuMDc2LDUuMDA0LTYuMDcxLDcuMjM2LTExLjI4Miw3LjM1OWMtNS42NjQsMC4xMzMtMTAuNjQxLTEuOTk4LTE1LjE5OC01LjE5MWMtNS4wMzctMy41MjktOC45MTUtOC4xOTktMTIuNTc0LTEzLjA1Nw0KCQlDOTEuMzY3LDExMS4xNDUsODYuOSwxMDIuMjY4LDgzLjU0LDkyLjcwNXoiLz4NCgk8cGF0aCBmaWxsPSIjRjUzODRBIiBkPSJNODIuMjEsNjEuNDZjNC40NDgtMTQuNTk3LDExLjQ2Mi0yNy42MjUsMjEuOTctMzguNjU2YzQuNzU0LTQuOTkxLDEwLjI4OC04LjY5NywxNy4yMDMtOS45NDENCgkJYzQuMDE4LTAuNzIzLDcuOTE5LTAuNDI1LDExLjMxNywyLjEyM2MzLjg3NCwyLjkwNiw1LjA2LDcuMDA4LDQuNjY2LDExLjYxYy0wLjY0MSw3LjQ3LTQuMzY2LDEzLjQyMS05LjU3NCwxOC41NQ0KCQljLTEwLjA1NSw5LjkwMi0yMS45OTEsMTYuNzQxLTM1LjI2NCwyMS4yOTZjLTMuNjg4LDEuMjY2LTcuNTIsMi4xMTYtMTEuMjg4LDMuMTQ5Yy0wLjI2OCwwLjA3NC0wLjU1NSwwLjA4MS0xLjE2LDAuMTYzDQoJCUM4MC44MSw2Ni45MDUsODEuNDk3LDY0LjIzMSw4Mi4yMSw2MS40NnoiLz4NCgk8cGF0aCBmaWxsPSIjRjUzODRBIiBkPSJNNjcuMDY2LDU5LjE4MmMwLjk2NiwzLjQ5NCwxLjg5OSw2Ljg5NSwyLjg5OSwxMC41NDNjLTAuNjQ5LTAuMDc0LTEuMDAxLTAuMDg2LTEuMzQxLTAuMTU4DQoJCWMtMTAuMzQ4LTIuMTc3LTIwLjA1Ni02LjAyMi0yOS4xODYtMTEuMzI2Yy03LjM4LTQuMjg2LTE0LjE4MS05LjM1Mi0xOS43ODQtMTUuODI2Yy00LjI5NC00Ljk2MS03LjA4Ni0xMC42NzQtNy4xMDEtMTcuNDIyDQoJCWMtMC4wMTctNy4zMjMsNS4wOTQtMTIuNDQ5LDEyLjQyNC0xMi40MzZjNi41NTEsMC4wMTIsMTIuMTI4LDIuNjg0LDE3LjA0OCw2Ljc2OGM1LjU4Niw0LjYzNyw5Ljk5NiwxMC4zMjYsMTMuOTQyLDE2LjM3Ng0KCQlDNjAuNzE5LDQyLjk5LDY0LjMxNiw1MC44MzQsNjcuMDY2LDU5LjE4MnoiLz4NCgk8cGF0aCBmaWxsPSIjRjUzODRBIiBkPSJNNTUuNjAxLDExNC44NDhjLTQuMTE3LDYuMTQzLTguNTc2LDExLjg5MS0xNC4zNDksMTYuNDQzYy00Ljc3NywzLjc2Ni0xMC4xNTcsNi4xODUtMTYuMzgsNi4xNDgNCgkJYy03LjI2OS0wLjA0My0xMi4zLTUuMTM2LTEyLjMyNi0xMi40MDFjLTAuMDItNS41ODQsMS45ODQtMTAuNTI0LDUuMTc2LTE0Ljk2YzQuNjgzLTYuNTA4LDEwLjkxOC0xMS4zNjcsMTcuNTQ1LTE1LjcyMg0KCQljMTAuMTc4LTYuNjg5LDIxLjI0Ny0xMS4zMDMsMzMuMTU0LTEzLjg4OWMwLjM4OC0wLjA4NCwwLjc4Ni0wLjEyNiwxLjQwMi0wLjIyMkM2Ny4yMDgsOTIuNzczLDYyLjUyNywxMDQuMjE5LDU1LjYwMSwxMTQuODQ4eiIvPg0KPC9nPg0KPC9zdmc+DQo=';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): RequestDto {
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]:
            /* eslint-enable @typescript-eslint/naming-convention */
                `WISEPOPS-API key="${applicationInstall.getSettings()[AUTHORIZATION_FORM][API_KEY]}"`,
        });

        if (data) {
            request.setBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, 'API Key', undefined, true));

        return new FormStack().addForm(form);
    }

    public getWebhookSubscribeRequestDto(
        applicationInstall: ApplicationInstall,
        subscription: WebhookSubscription,
        url: string,
    ): RequestDto {
        const request = new ProcessDto();
        return this.getRequestDto(
            request,
            applicationInstall,
            HttpMethods.POST,
            WISEPOOPS_URL,
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

    public getWebhookUnsubscribeRequestDto(applicationInstall: ApplicationInstall, id: string): RequestDto {
        const request = new ProcessDto();
        return this.getRequestDto(
            request,
            applicationInstall,
            HttpMethods.DELETE,
            `${WISEPOOPS_URL}?hook_id=${id}`,
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
        return dto.getResponseCode() === 200;
    }

}
