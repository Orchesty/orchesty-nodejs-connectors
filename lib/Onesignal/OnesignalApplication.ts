import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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

export const NAME = 'onesignal';
export const API_KEY = 'api_key';
export const REST_API_KEY = 'rest_api_key';

export default class OnesignalApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Onesignal';
    }

    public getDescription(): string {
        return 'Market-leading customer messaging and engagement solution, offering mobile and web push notifications, in-app messaging, SMS, and email';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFNDRBNDk7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MC4xLDRDMjIuNSw0LDAuMSwyNi41LDAuMSw1NC4xYzAsMTcuNiw5LjIsMzMsMjIuNyw0MS45YzAuOC0wLjUsMS42LTEuMSwyLjQtMS42YzAuNS0wLjMsMS40LTAuOCwxLjktMS4xCgkJYzAuOC0wLjMsMS42LTAuOCwyLjItMS4xYzAuOC0wLjMsMS42LTAuNSwyLjQtMS4xYzAuNS0wLjMsMS40LTAuNSwxLjktMC44YzAuOC0wLjMsMS45LTAuNSwyLjctMC44YzAuOC0wLjMsMS40LTAuMywyLjItMC41CgkJYzAuOC0wLjMsMS40LTAuMywyLjItMC41YzAuOC0wLjMsMS42LTAuMywyLjQtMC4zbDAsMGMwLjgsMCwxLjktMC4zLDIuNy0wLjNsMCwwdi0zLjJ2LTIuN1Y3MC44di0yLjd2LTEwaC0yLjd2LTUuNGgyLjdoOC4xaDIuNwoJCXYxNC42djN2MTEuNHYyLjd2NC4xYzcuNiwxLjEsMTQuMywzLjgsMjAuNiw3LjZsMCwwQzkxLDg3LjEsOTkuOSw3MS42LDk5LjksNTQuMUMxMDAuMiwyNi41LDc3LjcsNCw1MC4xLDRMNTAuMSw0eiBNNjUsNTQuMQoJCWMwLTguMS02LjgtMTQuOS0xNC45LTE0LjlzLTE0LjksNi44LTE0LjksMTQuOWMwLDUuNywzLjIsMTAuOCw4LjEsMTMuM3YzYy02LjItMi43LTEwLjgtOC45LTEwLjgtMTYuMmMwLTkuNyw3LjgtMTcuNiwxNy42LTE3LjYKCQlzMTcuNiw3LjgsMTcuNiwxNy42YzAsNi4yLTMuMiwxMS42LTguMSwxNC45di0zLjJDNjIuOSw2Mi43LDY1LDU4LjcsNjUsNTQuMUw2NSw1NC4xeiBNNTkuNiw4My42di0zYzExLjEtMy44LDE4LjktMTQuMywxOC45LTI2LjgKCQljMC0xNS40LTEyLjctMjguMS0yOC40LTI4LjFTMjEuNywzOC40LDIxLjcsNTQuMWMwLDEzLjMsOS4yLDI0LjYsMjEuNiwyNy42djIuN0MyOS42LDgxLjQsMTksNjguOSwxOSw1NC4xCgkJYzAtMTcuMywxMy44LTMxLjEsMzEuMS0zMS4xczMxLjEsMTMuOCwzMS4xLDMxLjFDODEuMyw2Ny45LDcyLjEsNzkuOCw1OS42LDgzLjZMNTkuNiw4My42eiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, 'api_key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const key = settings[CoreFormsEnum.AUTHORIZATION_FORM][REST_API_KEY];
        const url = `https://onesignal.com/api/v1/${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${key}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
