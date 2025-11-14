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
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'open-ai';
export const API_KEY = 'api_key';
export const ORGANIZATION_ID = 'organization_id';
export const PROJECT_ID = 'project_id';

enum OpenAIHeaders {
    ORGANIZATION = 'OpenAI-Organization',
    PROJECT = 'OpenAI-Project',
}

export const BASE_PATH = 'https://api.openai.com';

export default class OpenAIApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getDescription(): string {
        return 'Get answers. Find inspiration. Be more productive.';
    }

    public getPublicName(): string {
        return 'OpenAI';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiBmaWxsPSJub25lIj4KICA8c3R5bGU+CiAgICA6cm9vdCB7CiAgICAgIC0tcHJpbWFyeS1maWxsOiAjZmZmOwogICAgICAtLXNlY29uZGFyeS1maWxsOiAjMDAwOwogICAgfQogICAgQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykgewogICAgICA6cm9vdCB7CiAgICAgICAgLS1wcmltYXJ5LWZpbGw6ICMwMDA7CiAgICAgICAgLS1zZWNvbmRhcnktZmlsbDogI2ZmZjsKICAgICAgfQogICAgfQogIDwvc3R5bGU+CiAgPGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj4KICAgIDxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiBmaWxsPSJ2YXIoLS1wcmltYXJ5LWZpbGwpIiByeD0iOTAiIC8+CiAgICA8ZyBjbGlwLXBhdGg9InVybCgjYikiPgogICAgICA8cGF0aAogICAgICAgIGZpbGw9InZhcigtLXNlY29uZGFyeS1maWxsKSIKICAgICAgICBkPSJNNzUuOTEgNzMuNjI4VjYyLjIzMmMwLS45Ni4zNi0xLjY4IDEuMTk5LTIuMTZsMjIuOTEyLTEzLjE5NGMzLjExOS0xLjggNi44MzgtMi42MzkgMTAuNjc2LTIuNjM5IDE0LjM5NCAwIDIzLjUxMSAxMS4xNTcgMjMuNTExIDIzLjAzMiAwIC44MzkgMCAxLjc5OS0uMTIgMi43NThsLTIzLjc1Mi0xMy45MTRjLTEuNDM5LS44NC0yLjg3OS0uODQtNC4zMTggMEw3NS45MSA3My42MjdabTUzLjQ5OSA0NC4zODN2LTI3LjIzYzAtMS42OC0uNzItMi44OC0yLjE1OS0zLjcxOUw5Ny4xNDIgNjkuNTVsOS44MzYtNS42MzhjLjgzOS0uNDggMS41NTktLjQ4IDIuMzk5IDBsMjIuOTEyIDEzLjE5NWM2LjU5OCAzLjgzOSAxMS4wMzUgMTEuOTk1IDExLjAzNSAxOS45MTIgMCA5LjExNi01LjM5NyAxNy41MTMtMTMuOTE1IDIwLjk5MnYuMDAxWm0tNjAuNTc3LTIzLjk5LTkuODM2LTUuNzU4Yy0uODQtLjQ4LTEuMi0xLjItMS4yLTIuMTZ2LTI2LjM5YzAtMTIuODM0IDkuODM3LTIyLjU1IDIzLjE1Mi0yMi41NSA1LjAzOSAwIDkuNzE2IDEuNjc5IDEzLjY3NiA0LjY3OEw3MC45OTMgNTUuNTE2Yy0xLjQ0Ljg0LTIuMTYgMi4wMzktMi4xNiAzLjcxOXYzNC43ODctLjAwMlptMjEuMTczIDEyLjIzNEw3NS45MSA5OC4zMzlWODEuNTQ2bDE0LjA5NS03LjkxNyAxNC4wOTQgNy45MTd2MTYuNzkzbC0xNC4wOTQgNy45MTZabTkuMDU2IDM2LjQ2N2MtNS4wMzggMC05LjcxNi0xLjY4LTEzLjY3NS00LjY3OGwyMy42MzEtMTMuNjc2YzEuNDM5LS44MzkgMi4xNTktMi4wMzggMi4xNTktMy43MThWODUuODYzbDkuOTU2IDUuNzU3Yy44NC40OCAxLjIgMS4yIDEuMiAyLjE2djI2LjM4OWMwIDEyLjgzNS05Ljk1NyAyMi41NTItMjMuMjcgMjIuNTUydi4wMDFabS0yOC40My0yNi43NUw0Ny43MiAxMDIuNzc4Yy02LjU5OS0zLjg0LTExLjAzNi0xMS45OTYtMTEuMDM2LTE5LjkxMyAwLTkuMjM2IDUuNTE4LTE3LjUxMyAxNC4wMzQtMjAuOTkydjI3LjM1YzAgMS42OC43MiAyLjg3OSAyLjE2IDMuNzE4bDI5Ljk4OSAxNy4zOTMtOS44MzcgNS42MzhjLS44NC40OC0xLjU2LjQ4LTIuMzk5IDBabS0xLjMxOCAxOS42NzNjLTEzLjU1NSAwLTIzLjUxMi0xMC4xOTYtMjMuNTEyLTIyLjc5MiAwLS45NTkuMTItMS45MTkuMjQtMi44NzlsMjMuNjMgMTMuNjc1YzEuNDQuODQgMi44OC44NCA0LjMyIDBsMzAuMTA4LTE3LjM5MnYxMS4zOTVjMCAuOTYtLjM2MSAxLjY4LTEuMiAyLjE2bC0yMi45MTIgMTMuMTk0Yy0zLjExOSAxLjgtNi44MzcgMi42MzktMTAuNjc1IDIuNjM5Wm0yOS43NDggMTQuMjc0YzE0LjUxNSAwIDI2LjYzLTEwLjMxNiAyOS4zOS0yMy45OTEgMTMuNDM0LTMuNDc5IDIyLjA3MS0xNi4wNzQgMjIuMDcxLTI4LjkxIDAtOC4zOTYtMy41OTgtMTYuNTUzLTEwLjA3Ni0yMi40My42LTIuNTIuOTYtNS4wMzkuOTYtNy41NTcgMC0xNy4xNTMtMTMuOTE1LTI5Ljk5LTI5Ljk4OS0yOS45OS0zLjIzOSAwLTYuMzU4LjQ4LTkuNDc3IDEuNTYtNS4zOTgtNS4yNzgtMTIuODM1LTguNjM3LTIwLjk5Mi04LjYzNy0xNC41MTUgMC0yNi42MyAxMC4zMTYtMjkuMzkgMjMuOTkxLTEzLjQzNCAzLjQ4LTIyLjA3IDE2LjA3NC0yMi4wNyAyOC45MSAwIDguMzk2IDMuNTk4IDE2LjU1MyAxMC4wNzUgMjIuNDMxLS42IDIuNTE5LS45NiA1LjAzOC0uOTYgNy41NTYgMCAxNy4xNTQgMTMuOTE1IDI5Ljk4OSAyOS45OSAyOS45ODkgMy4yMzggMCA2LjM1Ny0uNDc5IDkuNDc2LTEuNTU5IDUuMzk3IDUuMjc4IDEyLjgzNSA4LjYzNyAyMC45OTIgOC42MzdaIgogICAgICAvPgogICAgPC9nPgogIDwvZz4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iYSI+CiAgICAgIDxwYXRoIGQ9Ik0wIDBoMTgwdjE4MEgweiIgLz4KICAgIDwvY2xpcFBhdGg+CiAgICA8Y2xpcFBhdGggaWQ9ImIiPgogICAgICA8cGF0aCBkPSJNMjkuNDg3IDI5Ljk2NGgxMjEuMDM1djExOS45NTRIMjkuNDg3eiIgLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgo8L3N2Zz4K';
    }

    public getFormStack(): FormStack {
        return new FormStack()
            .addForm(
                new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
                    .addField(new Field(FieldType.TEXT, API_KEY, 'Api key', undefined, true))
                    .addField(new Field(FieldType.TEXT, ORGANIZATION_ID, 'Organization id', undefined, false))
                    .addField(new Field(FieldType.TEXT, PROJECT_ID, 'Project id', undefined, false)),
            );
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        path?: string,
        data?: unknown,
    ): RequestDto {
        const {
            [API_KEY]: apiKey,
            [ORGANIZATION_ID]: organizationId,
            [PROJECT_ID]: projectId,
        } = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        const headers: Record<string, string> = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${apiKey}`,
        };

        if (organizationId) {
            headers[OpenAIHeaders.ORGANIZATION] = organizationId;
        }

        if (projectId) {
            headers[OpenAIHeaders.PROJECT] = projectId;
        }

        const url = new URL(path ?? '', BASE_PATH).href;

        const requestDto = new RequestDto(
            url,
            method,
            dto,
            data,
            headers,
        );

        return requestDto;
    }

}
