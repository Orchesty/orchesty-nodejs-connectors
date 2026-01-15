import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'vyfakturuj';
export const USER_EMAIL = 'user_email';
export const API_KEY = 'api_key';

export default class VyfakturujApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Vyfakturuj';
    }

    public getDescription(): string {
        return 'Application that makes it very easy to issue invoices to all clients and to send and record payments directly';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMC4wNCA5NS40Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzNkYzYxNDt9LmNscy0ye2ZpbGw6IzA4NjNkYTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNTAsOThjLTQuNTYtOC41Ni04LjY2LTE2LjQyLTEzLTI0LjE4YTQuNDgsNC40OCwwLDAsMSwuMDktNC45M3ExNi41LTMxLjQ0LDMyLjc1LTYzYzEuMjMtMi4zOSwyLjUxLTMuMzUsNS4yNS0zLjI2LDYuOTQuMjEsMTMuOS4zMSwyMC44MywwLDQuOTEtLjI0LDQuNjQsMS4zMSwyLjc0LDQuODRxLTIyLjM2LDQxLjQzLTQ0LjUzLDgzQzUzLDkyLjgsNTEuNjksOTUuMDcsNTAsOThaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAzIC0yLjY0KSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTMxLjQyLDYzLjIyQzIwLjg0LDQzLjUxLDEwLjg0LDI0Ljg0LjgxLDYuMTktLjM3LDQtLjczLDIuNjQsMi42NiwyLjdjNy43Ni4xNCwxNS41My4wOSwyMy4zLDBhMy43NSwzLjc1LDAsMCwxLDMuODUsMi4zNGM0Ljk1LDkuNjQsMTAsMTkuMjMsMTUuMDUsMjguODJhMy41MywzLjUzLDAsMCwxLDAsMy42OEM0MC41Miw0NS43OCwzNi4yMiw1NC4wNSwzMS40Miw2My4yMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDMgLTIuNjQpIi8+PC9zdmc+';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, USER_EMAIL, ' User email', undefined, true))
            .addField(new Field(FieldType.TEXT, API_KEY, ' Api Key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[USER_EMAIL] && authorizationForm?.[API_KEY];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://api.vyfakturuj.cz/2.0${uri}`, method, dto);
        const userEmail = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][USER_EMAIL];
        const apiKey = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][API_KEY];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${userEmail}:${apiKey}`)}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
