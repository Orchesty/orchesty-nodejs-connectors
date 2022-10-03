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

export const NAME = 'active-campaign';
export const APPLICATION_KEY = 'application_token';
export const SUBDOMAIN = 'subdomain';

export default class ActiveCampaignApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'ActiveCampaign';
    }

    public getDescription(): string {
        return 'Cloud software platform for small-to-mid-sized businesses. The company offers software for customer experience automation';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5OS45NiA5OS45NiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMzNTZhZTY7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxyZWN0IGlkPSJSZWN0YW5nbGUiIGNsYXNzPSJjbHMtMSIgd2lkdGg9Ijk5Ljk2IiBoZWlnaHQ9Ijk5Ljk2IiByeD0iMTIuNDkiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik01MSw1Mi4zM2E0LjczLDQuNzMsMCwwLDAsMi43OC0xLjA3YzEuMTMtLjc5LDIuMTUtMS40NywyLjE1LTEuNDdsLjM1LS4yMy0uMzQtLjI0Yy0uMTYtLjExLTE1LjI2LTEwLjU5LTE2LjgyLTExLjU5YTIuMTIsMi4xMiwwLDAsMC0yLjIxLS4zLDEuOSwxLjksMCwwLDAtMSwxLjc4djMuNTZsLjEyLjA4Yy4xMS4wNywxMC40OCw3LjI5LDEyLjUxLDguNjRBNC4zMiw0LjMyLDAsMCwwLDUxLDUyLjMzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDIgLTAuMDIpIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNzEuMTksNDYuMDZjLS45LS42OC0zMy4yOS0yMy4yNi0zNC42Ny0yNC4yMmwtLjQ0LS4zMXY1LjU1YzAsMS43Ni45MiwyLjQzLDIuMDksMy4yN0w2Ni4wOSw0OS44MUM2Myw1MiwzOS42MSw2OC4xNywzOC4xMyw2OS4xMmMtMS43NywxLjE4LTEuOTQsMS45NC0xLjk0LDMuNTN2NmwzNS0yNWgwQTQuNDYsNC40NiwwLDAsMCw3My4xMyw1MHYtLjY0QTQsNCwwLDAsMCw3MS4xOSw0Ni4wNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAyIC0wLjAyKSIvPjwvZz48L3N2Zz4=';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, APPLICATION_KEY, 'Application key', undefined, true))
            .addField(new Field(FieldType.TEXT, SUBDOMAIN, 'Account name', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[APPLICATION_KEY] && authorizationForm?.[SUBDOMAIN];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const token = settings[AUTHORIZATION_FORM][APPLICATION_KEY];
        const subdomain = settings[AUTHORIZATION_FORM][SUBDOMAIN];
        const url = `https://${subdomain}.api-us1.com/api/3/${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            /* eslint-disable @typescript-eslint/naming-convention */
            'api-token': token,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
