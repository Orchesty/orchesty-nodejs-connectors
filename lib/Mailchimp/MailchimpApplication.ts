import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { IWebhookApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BodyInit } from 'node-fetch';

export const MAILCHIMP_URL = 'https://login.mailchimp.com/oauth2/authorize';
export const MAILCHIMP_DATACENTER_URL = 'https://login.mailchimp.com';
export const AUDIENCE_ID = 'audience_id';
export const TOKEN_URL = 'https://login.mailchimp.com/oauth2/token';
export const API_KEYPOINT = 'api_keypoint';
export const SEGMENT_ID = 'segment_id';

export default class MailchimpApplication extends AOAuth2Application implements IWebhookApplication {

    public constructor(private readonly sender: CurlSender, private readonly inputProvider: OAuth2Provider) {
        super(inputProvider);
    }

    public getDescription(): string {
        return 'Mail marketing automation service that lets you send out professional-looking newsletters';
    }

    public getName(): string {
        return 'mailchimp';
    }

    public getPublicName(): string {
        return 'Mailchimp';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPGc+CgkJCTxnPgoJCQkJPHBhdGggZD0iTTczLjcsNDcuM2MwLjctMC4xLDEuNC0wLjEsMi4xLDBjMC40LTAuOCwwLjQtMi4zLDAuMS0zLjljLTAuNS0yLjQtMS4yLTMuOC0yLjUtMy42Yy0xLjQsMC4yLTEuNCwxLjktMC45LDQuMwoJCQkJCUM3Mi42LDQ1LjQsNzMuMSw0Ni42LDczLjcsNDcuM3oiLz4KCQkJCTxwYXRoIGQ9Ik02MS44LDQ5LjFjMSwwLjQsMS42LDAuNywxLjgsMC41YzAuMi0wLjIsMC4xLTAuNS0wLjEtMC44QzYzLDQ4LDYyLDQ3LjIsNjAuOSw0Ni43Yy0yLjItMC45LTQuOC0wLjYtNi44LDAuOAoJCQkJCWMtMC43LDAuNS0xLjMsMS4yLTEuMiwxLjZjMCwwLjEsMC4xLDAuMiwwLjQsMC4zYzAuNSwwLjEsMi41LTAuOSw0LjctMUM1OS41LDQ4LjIsNjAuOCw0OC43LDYxLjgsNDkuMXoiLz4KCQkJCTxwYXRoIGQ9Ik01OS44LDUwLjNjLTEuMywwLjItMiwwLjYtMi41LDFjLTAuNCwwLjMtMC42LDAuNy0wLjYsMWMwLDAuMSwwLjEsMC4yLDAuMSwwLjJjMC4xLDAuMSwwLjEsMC4xLDAuMiwwLjEKCQkJCQljMC4zLDAsMC45LTAuMywwLjktMC4zYzEuOC0wLjYsMy0wLjYsNC4yLTAuNGMwLjcsMC4xLDEsMC4xLDEuMS0wLjFjMC0wLjEsMC4xLTAuMiwwLTAuNEM2Mi45LDUwLjksNjEuNiw1MC4xLDU5LjgsNTAuM3oiLz4KCQkJCTxwYXRoIGQ9Ik02OS42LDU0LjVjMC45LDAuNCwxLjgsMC4zLDIuMi0wLjRjMC4zLTAuNi0wLjEtMS41LTEtMS45Yy0wLjktMC40LTEuOC0wLjMtMi4yLDAuNEM2OC4zLDUzLjIsNjguOCw1NCw2OS42LDU0LjV6Ii8+CgkJCQk8cGF0aCBkPSJNNzUuMyw0OS41Yy0wLjcsMC0xLjMsMC44LTEuMywxLjdjMCwxLDAuNSwxLjgsMS4zLDEuOGMwLjcsMCwxLjMtMC44LDEuMy0xLjdDNzYuNSw1MC4zLDc2LDQ5LjUsNzUuMyw0OS41eiIvPgoJCQkJPHBhdGggZD0iTTI3LjUsNjcuMUMyNy4zLDY2LjksMjcsNjcsMjYuNyw2N2MtMC4yLDAtMC40LDAuMS0wLjcsMC4xYy0wLjUsMC0xLTAuMi0xLjItMC42Yy0wLjMtMC41LTAuMy0xLjIsMC4xLTIuMQoJCQkJCWMwLTAuMSwwLjEtMC4yLDAuMi0wLjRjMC42LTEuMywxLjUtMy40LDAuNS01LjVjLTAuOC0xLjUtMi4xLTIuNS0zLjctMi43Yy0xLjUtMC4yLTMuMSwwLjQtNC4xLDEuNWMtMS42LDEuNy0xLjgsNC4xLTEuNSw0LjkKCQkJCQljMC4xLDAuMywwLjMsMC40LDAuNCwwLjRjMC4zLDAsMC43LTAuMiwwLjktMC44YzAsMCwwLTAuMSwwLjEtMC4yYzAuMS0wLjQsMC4zLTEsMC43LTEuNWMwLjQtMC42LDEtMS4xLDEuOC0xLjIKCQkJCQljMC44LTAuMiwxLjUsMCwyLjIsMC40YzEuMSwwLjcsMS41LDIuMSwxLjEsMy40Yy0wLjIsMC43LTAuNiwxLjktMC42LDNjMC4yLDIuMSwxLjUsMywyLjcsMy4xYzEuMSwwLDEuOS0wLjYsMi4xLTEuMQoJCQkJCUMyNy42LDY3LjQsMjcuNSw2Ny4yLDI3LjUsNjcuMXoiLz4KCQkJCTxwYXRoIGQ9Ik05My4yLDYzLjJjMC0wLjItMC4zLTEuMi0wLjctMi40Yy0wLjQtMS4yLTAuOC0yLjEtMC44LTIuMWMxLjYtMi4zLDEuNi00LjQsMS40LTUuNmMtMC4yLTEuNS0wLjgtMi43LTIuMS00CgkJCQkJYy0xLjItMS4zLTMuNy0yLjYtNy4zLTMuNkM4My40LDQ1LjQsODIsNDUsODEuOSw0NWMwLTAuMS0wLjEtNC40LTAuMi02LjJjLTAuMS0xLjMtMC4yLTMuNC0wLjgtNS41Yy0wLjgtMi44LTIuMS01LjItMy44LTYuNwoJCQkJCWM0LjYtNC44LDcuNS0xMCw3LjUtMTQuNmMwLTguNy0xMC43LTExLjMtMjMuOC01LjljMCwwLTIuOCwxLjItMi44LDEuMmMwLDAtNS00LjktNS4xLTVDMzcuOS0xMC43LTksNDEuMyw2LDU0bDMuMywyLjgKCQkJCQljLTAuOCwyLjItMS4yLDQuNy0wLjksNy40YzAuMywzLjUsMi4xLDYuOCw1LjEsOS40YzIuOCwyLjQsNi40LDQsOS45LDRDMjkuMiw5MSw0Mi41LDk5LjMsNTguMSw5OS43CgkJCQkJYzE2LjgsMC41LDMwLjgtNy40LDM2LjctMjEuNWMwLjQtMSwyLTUuNSwyLTkuNEM5Ni45LDY0LjksOTQuNiw2My4yLDkzLjIsNjMuMnogTTI0LjcsNzMuOGMtMC41LDAuMS0xLDAuMS0xLjYsMC4xCgkJCQkJQzE4LDczLjgsMTIuNiw2OS4yLDEyLDYzLjhjLTAuNi02LDIuNC0xMC42LDcuOS0xMS43YzAuNi0wLjEsMS40LTAuMiwyLjMtMC4yYzMsMC4yLDcuNSwyLjUsOC41LDkuMQoJCQkJCUMzMS42LDY2LjksMzAuMSw3Mi45LDI0LjcsNzMuOHogTTE5LDQ4LjZjLTMuNCwwLjctNi4zLDIuNi04LjEsNS4yYy0xLjEtMC45LTMuMS0yLjctMy41LTMuM2MtMi45LTUuNSwzLjItMTYuMiw3LjQtMjIuMgoJCQkJCUMyNS4yLDEzLjMsNDEuNiwyLDQ5LjIsNC4xYzEuMiwwLjMsNS4zLDUuMSw1LjMsNS4xcy03LjYsNC4yLTE0LjYsMTAuMUMzMC40LDI2LjUsMjMuMywzNy4xLDE5LDQ4LjZ6IE03Mi4xLDcxLjYKCQkJCQljMC4xLDAsMC4yLTAuMiwwLjItMC4zYzAtMC4yLTAuMi0wLjMtMC4zLTAuMmMwLDAtNy45LDEuMi0xNS40LTEuNmMwLjgtMi43LDMtMS43LDYuMy0xLjRjNS45LDAuNCwxMS4yLTAuNSwxNS4xLTEuNgoJCQkJCWMzLjQtMSw3LjgtMi45LDExLjMtNS42YzEuMiwyLjYsMS42LDUuNCwxLjYsNS40czAuOS0wLjIsMS43LDAuM2MwLjcsMC40LDEuMiwxLjQsMC45LDMuN2MtMC43LDQuNC0yLjYsOC01LjcsMTEuMwoJCQkJCWMtMS45LDIuMS00LjIsMy45LTYuOSw1LjJjLTEuNCwwLjctMi45LDEuNC00LjUsMS45Yy0xMS45LDMuOS0yNC0wLjQtMjcuOS05LjVjLTAuMy0wLjctMC42LTEuNC0wLjgtMi4yCgkJCQkJYy0xLjctNi0wLjMtMTMuMyw0LjItMTcuOGMwLDAsMCwwLDAsMGMwLjMtMC4zLDAuNi0wLjYsMC42LTEuMWMwLTAuNC0wLjItMC43LTAuNC0xYy0xLjUtMi4yLTYuOS02LjEtNS44LTEzLjUKCQkJCQljMC44LTUuMyw1LjQtOS4xLDkuOC04LjljMC40LDAsMC43LDAsMS4xLDAuMWMxLjksMC4xLDMuNSwwLjQsNS4xLDAuNGMyLjYsMC4xLDQuOS0wLjMsNy43LTIuNmMwLjktMC44LDEuNy0xLjUsMi45LTEuNwoJCQkJCWMwLjEsMCwwLjUtMC4xLDEuMS0wLjFjMC43LDAsMS4zLDAuMiwxLjksMC42YzIuMiwxLjUsMi41LDUsMi42LDcuN2MwLjEsMS41LDAuMiw1LjEsMC4zLDYuMWMwLjEsMi40LDAuOCwyLjcsMiwzLjEKCQkJCQljMC43LDAuMiwxLjQsMC40LDIuMywwLjdjMi45LDAuOCw0LjcsMS43LDUuOCwyLjdjMC43LDAuNywxLDEuNCwxLjEsMi4xYzAuMywyLjUtMiw1LjYtOC4xLDguNUM3NSw2NS4zLDY2LjksNjYsNjEuMyw2NS40CgkJCQkJYy0wLjQsMC0yLTAuMi0yLTAuMmMtNC41LTAuNi03LDUuMi00LjMsOS4xYzEuNywyLjYsNi40LDQuMiwxMS4xLDQuMmMxMC44LDAsMTkuMS00LjYsMjIuMi04LjZjMC4xLTAuMSwwLjEtMC4xLDAuMi0wLjQKCQkJCQljMC4yLTAuMiwwLTAuNC0wLjItMC4yYy0yLjUsMS43LTEzLjcsOC42LTI1LjcsNi41YzAsMC0xLjUtMC4yLTIuOC0wLjhjLTEuMS0wLjQtMy4zLTEuNC0zLjUtMy43QzY2LDc0LjQsNzIuMSw3MS42LDcyLjEsNzEuNnoKCQkJCQkgTTU2LjgsNjkuOEM1Ni44LDY5LjgsNTYuOCw2OS44LDU2LjgsNjkuOEM1Ni44LDY5LjgsNTYuOCw2OS44LDU2LjgsNjkuOEM1Ni44LDY5LjgsNTYuOCw2OS44LDU2LjgsNjkuOHogTTM4LjMsMjguMgoJCQkJCWMzLjctNC4zLDguMy04LDEyLjQtMTAuMWMwLjEtMC4xLDAuMywwLjEsMC4yLDAuMmMtMC4zLDAuNi0xLDEuOC0xLjEsMi44YzAsMC4yLDAuMSwwLjMsMC4zLDAuMmMyLjUtMS43LDctMy42LDEwLjktMy44CgkJCQkJYzAuMiwwLDAuMiwwLjIsMC4xLDAuM2MtMC42LDAuNS0xLjIsMS4xLTEuNywxLjdjLTAuMSwwLjEsMCwwLjMsMC4xLDAuM2MyLjcsMCw2LjYsMSw5LjEsMi40YzAuMiwwLjEsMCwwLjQtMC4xLDAuNAoJCQkJCWMtMy44LTAuOS0xMC0xLjUtMTYuNSwwYy01LjgsMS40LTEwLjIsMy42LTEzLjQsNS45QzM4LjQsMjguNiwzOC4yLDI4LjMsMzguMywyOC4yeiIvPgoJCQk8L2c+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=';
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
            [CommonHeaders.AUTHORIZATION]: `OAuth ${this.getAccessToken(applicationInstall)}`,
        });

        if (data) {
            request.setBody(data);
        }

        return request;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [];
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true))
            .addField(new Field(FieldType.TEXT, AUDIENCE_ID, 'Audience Id', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET] && authorizationForm?.[AUDIENCE_ID];
    }

    public getAuthUrl(): string {
        return MAILCHIMP_URL;
    }

    public getTokenUrl(): string {
        return TOKEN_URL;
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [
            new WebhookSubscription('Create User', 'starting-point', '', { name: 'subscribe' }),
            new WebhookSubscription('Update User', 'starting-point', '', { name: 'upemail' }),
            new WebhookSubscription('Delete User', 'starting-point', '', { name: 'unsubscribe' }),
        ];
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
            `${applicationInstall.getSettings()[API_KEYPOINT]}
    /3.0/lists/${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][AUDIENCE_ID]}/webhooks`,
            JSON.stringify(
                {
                    url,
                    events: {
                        [subscription.getParameters().name]: true,
                    },
                    sources:
                        {
                            user: true,
                            admin: true,
                            api: true,
                        },
                },
            ),
        );
    }

    public getWebhookUnsubscribeRequestDto(
        applicationInstall: ApplicationInstall,
        id: string,
    ): RequestDto {
        return this.getRequestDto(
            new ProcessDto(),
            applicationInstall,
            HttpMethods.DELETE,
            // eslint-disable-next-line max-len
            `${applicationInstall.getSettings()[API_KEYPOINT]}/3.0/lists/${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][AUDIENCE_ID]}/webhooks/${id}`,
        );
    }

    public processWebhookSubscribeResponse(
        dto: ResponseDto,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        applicationInstall: ApplicationInstall,
    ): string {
        return JSON.parse(dto.getBody()).id;
    }

    public processWebhookUnsubscribeResponse(dto: ResponseDto): boolean {
        return dto.getResponseCode() === 204;
    }

    public async getApiEndpoint(applicationInstall: ApplicationInstall): Promise<string> {
        const output = await this.sender.send(
            this.getRequestDto(
                new ProcessDto(),
                applicationInstall,
                HttpMethods.GET,
                '%s/oauth2/metadata',
                MAILCHIMP_DATACENTER_URL,
            ),
        );

        // eslint-disable-next-line @typescript-eslint/naming-convention
        return output.getJsonBody() as { api_endpoint: string }['api_endpoint'] ?? '';
    }

}
