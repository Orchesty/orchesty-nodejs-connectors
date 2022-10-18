import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

const BASE_URL = 'https://slack.com/api/';

export default class SlackApplication extends AOAuth2Application {

    public getAuthUrl(): string {
        return 'https://slack.com/oauth/v2/authorize';
    }

    public getTokenUrl(): string {
        return 'https://slack.com/api/oauth.v2.access';
    }

    public getDescription(): string {
        return 'In-process library that implements a self-contained, serverless, zero-configuration, transactional SQL database engine';
    }

    public getName(): string {
        return 'slack';
    }

    public getPublicName(): string {
        return 'Slack';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFMDFFNUE7fQoJLnN0MXtmaWxsOiMzNkM1RjA7fQoJLnN0MntmaWxsOiMyRUI2N0Q7fQoJLnN0M3tmaWxsOiNFQ0IyMkU7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjEsNjNjMCw1LjgtNC43LDEwLjUtMTAuNSwxMC41UzAsNjguOCwwLDYzczQuNy0xMC41LDEwLjUtMTAuNUgyMVY2M3ogTTI2LjIsNjNjMC01LjgsNC43LTEwLjUsMTAuNS0xMC41CglTNDcuMiw1Ny4zLDQ3LjIsNjN2MjYuMmMwLDUuOC00LjcsMTAuNS0xMC41LDEwLjVTMjYuMiw5NSwyNi4yLDg5LjJWNjN6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zNi43LDIxYy01LjgsMC0xMC41LTQuNy0xMC41LTEwLjVTMzAuOSwwLDM2LjcsMHMxMC41LDQuNywxMC41LDEwLjVWMjFIMzYuN3ogTTM2LjcsMjYuMwoJYzUuOCwwLDEwLjUsNC43LDEwLjUsMTAuNXMtNC43LDEwLjUtMTAuNSwxMC41SDEwLjRDNC42LDQ3LjMsMCw0Mi42LDAsMzYuOHM0LjctMTAuNSwxMC41LTEwLjVIMzYuN3oiLz4KPHBhdGggY2xhc3M9InN0MiIgZD0iTTc4LjcsMzYuOGMwLTUuOCw0LjctMTAuNSwxMC41LTEwLjVjNS44LDAsMTAuNSw0LjcsMTAuNSwxMC41Uzk1LDQ3LjMsODkuMiw0Ny4zSDc4LjdWMzYuOHogTTczLjUsMzYuOAoJYzAsNS44LTQuNywxMC41LTEwLjUsMTAuNXMtMTAuNS00LjctMTAuNS0xMC41VjEwLjVDNTIuNSw0LjcsNTcuMiwwLDYzLDBjNS44LDAsMTAuNSw0LjcsMTAuNSwxMC41QzczLjUsMTAuNSw3My41LDM2LjgsNzMuNSwzNi44egoJIi8+CjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik02Myw3OC44YzUuOCwwLDEwLjUsNC43LDEwLjUsMTAuNWMwLDUuOC00LjcsMTAuNS0xMC41LDEwLjVTNTIuNSw5NSw1Mi41LDg5LjJWNzguOEg2M3ogTTYzLDczLjUKCWMtNS44LDAtMTAuNS00LjctMTAuNS0xMC41UzU3LjIsNTIuNiw2Myw1Mi42aDI2LjNjNS44LDAsMTAuNSw0LjcsMTAuNSwxMC41Uzk1LDczLjUsODkuMiw3My41SDYzeiIvPgo8L3N2Zz4K';
    }

    public getRequestDto(
        _dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        if (!this.isAuthorized(applicationInstall)) {
            throw new Error(`Application [${this.getPublicName()}] is not authorized!`);
        }

        const token = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][TOKEN][ACCESS_TOKEN];
        return new RequestDto(
            `${BASE_URL}${url}`,
            method,
            _dto,
            data,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
            },
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [
            'app_mentions:read',
            'chat:write',
            'chat:write.public',
        ];
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET];
    }

}
