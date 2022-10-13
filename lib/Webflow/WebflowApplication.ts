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
import { BodyInit } from 'node-fetch';

const BASE_URL = 'https://api.webflow.com/';
const API_KEY = 'apiKey';
const API_VERSION = '1.0.0';

export default class WebflowApplication extends ABasicApplication {

    public getName(): string {
        return 'webflow';
    }

    public getPublicName(): string {
        return 'Webflow';
    }

    public getDescription(): string {
        return 'Design and build professional websites with a CMS from scratch online with Webflow';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojNDI1MmZlO30uY2xzLTJ7ZmlsbDojZmVmZWZlO308L3N0eWxlPjwvZGVmcz48cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzQuODgsNTYuMzVjMi4yNS01LjgsNC4zOC0xMS42NSw2Ljc4LTE3LjM5LDIuMTctNS4xOCw1LjY3LTkuMDcsMTEuMjctMTAuODgsMy4zMy0xLjA4LDQuNzctLjE5LDUuMTUsMy4yOS44MSw3LjU3LDEuODMsMTUuMTEsMi43NywyMi42Ni4xMywxLjA2LS4wOSwyLjI1LDEuMjUsMy4yMSwxLjc4LTUuNSwzLjM5LTEwLjkxLDUuMjktMTYuMjJDNjkuNjksMzQuNTksNzMuNSwyOS41Myw4MC42NSwyOGMxLS4yNCwyLjMxLS45LDMuMTEuMTEuNjYuODQtLjI1LDEuODQtLjYsMi43Qzc5LjA4LDQwLjkxLDc1LDUxLjA2LDcwLjgxLDYxLjE0Yy0yLjcyLDYuNTItNy4xOSwxMS4wNy0xNC41NCwxMi4yMy0yLjA3LjMzLTMtLjA2LTMuMjUtMi4zM2EyMjMuMTMsMjIzLjEzLDAsMCwwLTQuNDEtMjQuNzVjLTEuODEsNC42My0zLjU2LDkuMjgtNS40MywxMy44Ny0yLjIsNS40MS01LjM0LDEwLTExLjEsMTIuMjNzLTYuMjQsMS44My03LjItMy45NEMyMi44MSw1NiwyMC43OSw0My42MSwxOC42MiwzMS4yMWMtLjU0LTMuMTMuMTYtNC4wNywzLjM0LTMuMDlhMTQuNzgsMTQuNzgsMCwwLDEsMTAuNjUsMTNjLjM3LDQuNTUuNTYsOS4xMi44MywxMy42OEMzNC4wOSw1NS4xNCwzMy4yMiw1Ni44OSwzNC44OCw1Ni4zNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48L3N2Zz4=';
    }

    public getRequestDto(
        _dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const apiKey = applicationInstall.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[API_KEY];
        if (!apiKey) {
            throw new Error(`Application [${this.getPublicName()}] doesn't have api key!`);
        }

        const requestUrl = new URL(url ?? '', BASE_URL);
        const query = new URLSearchParams(requestUrl.search);
        query.set('api_version', API_VERSION);
        requestUrl.search = query.toString();

        return new RequestDto(
            requestUrl.toString(),
            method,
            _dto,
            data,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Bearer ${apiKey}`,
            },
        );
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, 'Api key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

}
