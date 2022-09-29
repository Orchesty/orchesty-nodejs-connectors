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
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojNDM1M0ZGO30KCS5zdDF7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMiAwIDAgMiAwIC02NCkiPgoJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMzcuNSIgY3k9IjY5LjUiIHI9IjM3LjUiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00OC41LDY1bC0zLjQsMTAuN2MwLTAuOC0yLjMtMTguNi0yLjMtMTguNmMtNS40LDAtOC4yLDMuOC05LjgsNy45bC00LjEsMTAuN2MwLTAuOC0wLjYtMTAuNi0wLjYtMTAuNgoJCWMtMC40LTQuNC00LjEtNy44LTguNS03LjlsNC40LDI2LjljNS42LDAsOC43LTMuOCwxMC4yLTcuOWwzLjUtOS4xYzAsMC40LDIuMywxNywyLjMsMTdjNC43LDAsOC45LTMuMSwxMC4zLTcuNmw4LTE5LjQKCQlDNTIuOSw1Ny4yLDUwLDYxLDQ4LjUsNjVMNDguNSw2NXoiLz4KPC9nPgo8L3N2Zz4K';
    }

    public getRequestDto(
        _dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const apiKey = applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[API_KEY];
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
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, 'Api key', undefined, true));

        return new FormStack().addForm(form);
    }

}
