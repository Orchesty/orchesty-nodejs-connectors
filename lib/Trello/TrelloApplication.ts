import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

const BASE_URL = 'https://api.trello.com';
const API_KEY = 'apiKey';

export default class TrelloApplication extends ABasicApplication {

    public getName(): string {
        return 'trello';
    }

    public getPublicName(): string {
        return 'Trello';
    }

    public getDescription(): string {
        return 'Team collaboration tool that lets you organize anything and everything to keep your projects on task';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMDc5QkY7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNS4xLDAuMWg2OS45YzguMywwLDE1LDYuNywxNSwxNXY2OS45YzAsOC4zLTYuNywxNS0xNSwxNUgxNS4xYy04LjMsMC0xNS02LjctMTUtMTVWMTUuMQoJCUMwLjEsNi44LDYuOCwwLjEsMTUuMSwwLjF6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTkuOSwxOC42aDE2LjhjMi41LDAsNC41LDIsNC41LDQuNXYyNy43YzAsMi41LTIsNC41LTQuNSw0LjVINTkuOWMtMi41LDAtNC41LTItNC41LTQuNVYyMy4xCgkJQzU1LjUsMjAuNiw1Ny41LDE4LjYsNTkuOSwxOC42eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIzLjUsMTguNmgxNi44YzIuNSwwLDQuNSwyLDQuNSw0LjV2NDguN2MwLDIuNS0yLDQuNS00LjUsNC41SDIzLjVjLTIuNSwwLTQuNS0yLTQuNS00LjVWMjMuMQoJCUMxOSwyMC42LDIxLDE4LjYsMjMuNSwxOC42eiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getRequestDto(
        _dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const token = applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[TOKEN];
        const apiKey = applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[API_KEY];
        if (!token || !apiKey) {
            throw new Error(`Application [${this.getPublicName()}] doesn't have token, apiKey or both!`);
        }

        const requestUrl = new URL(url ?? '', BASE_URL);
        const query = new URLSearchParams(requestUrl.search);
        query.set('key', apiKey);
        query.set('token', token);
        requestUrl.search = query.toString();

        return new RequestDto(
            requestUrl.toString(),
            method,
            _dto,
            data,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            },
        );
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Bot token', undefined, true))
            .addField(new Field(FieldType.TEXT, API_KEY, 'Api key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[TOKEN] && authorizationForm?.[API_KEY];
    }

}
