import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import {
    ABasicApplication,
    TOKEN,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'git-hub';

export default class GitHubApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'GitHub';
    }

    public getDescription(): string {
        return 'Service that helps developers store and manage their code, as well as track and control changes to their code';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iZ2l0aHViX2JsYWNrIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5OS45NCA5Ny4wNyI+PHBhdGggZD0iTTEwMCw1MS4zMkE1MCw1MCwwLDEsMCwzMy43NCw5OC40OGMxLjItLjg2LDIuNTctMS45MywyLjU3LTMuNzEsMC0yLjc1LS4wNi05LjgtLjA2LTkuOGEzNC41OSwzNC41OSwwLDAsMS01LjI2LjM3Yy03LjgsMC0xMC4yNy00Ljk0LTExLjQ0LTcuN0ExMy41NiwxMy41NiwwLDAsMCwxMy45Myw3MWMtMS4yOS0uODMtMS41OS0xLjgtLjA5LTIuMDgsNi45LTEuMjksOC42Nyw3Ljc2LDEzLjI4LDkuMjEsMy4yOSwxLDcuNTIuNTgsOS42My0uNzdhMTAsMTAsMCwwLDEsNC02LjQyQzI5LDY5LjgxLDIyLDY1Ljc3LDE4LjQyLDU5LjI4TDE4LDU4LjU1bC0uOTEtMi4wNi0uMjctLjc0YTM0LjkyLDM0LjkyLDAsMCwxLTEuNjMtMTEuM2MwLTcuNDksMi4zNi0xMC4zMSw1LjUxLTE0LjMtMi40MS04LjU0Ljg3LTE0LjM4Ljg3LTE0LjM4czUuMDgtMSwxNC42Nyw1Ljc4YzUuMi0yLjIxLDE5LjA3LTIuNCwyNS42My0uNDksNC0yLjY1LDExLjM5LTYuMzksMTQuMzYtNS4zNC44MSwxLjI4LDIuNTQsNSwxLjA2LDEzLjI2LDEsMS44LDYuMjUsNS42NSw2LjI3LDE2LjUyYTQzLDQzLDAsMCwxLTEuMjksMTAuMjZsLS40MywxLjQ2cy0uMjUuNy0uNTIsMS4zNWwtLjMxLjczQzc3LjU3LDY2Ljg4LDcwLjQzLDY5LjcxLDU4LjksNzAuODljMy43MywyLjMzLDQuODEsNS4yNiw0LjgxLDEzLjE5cy0uMTEsOS0uMDgsMTAuODFjMCwxLjYxLDEuMzEsMi43NywyLjQ3LDMuNjRBNDkuODcsNDkuODcsMCwwLDAsMTAwLDUxLjMyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDMgLTEuNDcpIi8+PC9zdmc+';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER, ' User name', undefined, true))
            .addField(new Field(FieldType.TEXT, TOKEN, ' Token', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[USER] && authorizationForm?.[TOKEN];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://api.github.com${uri}`, method, dto);
        const form = applicationInstall.getSettings()[AUTHORIZATION_FORM] ?? {};
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: 'application/vnd.github+json',
            [CommonHeaders.AUTHORIZATION]: encode(`${form[USER] ?? ''}:${form[TOKEN] ?? ''}`),
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
