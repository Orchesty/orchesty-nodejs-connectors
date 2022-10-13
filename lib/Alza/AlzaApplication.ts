import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, PASSWORD } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE, USER } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { createHmac } from 'crypto';
import { BodyInit } from 'node-fetch';

export const SERVER = 'server';
export const API = 'api_path';
export const NAME = 'alza';

export default class AlzaApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Alza';
    }

    public getDescription(): string {
        return 'One of the largest online consumer electronics retailers & marketplaces in Central Europe';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0ZGRkZGRjt9Cgkuc3Qxe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzIzMUYyMDt9Cgkuc3Qye2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzA0MzI2Njt9Cjwvc3R5bGU+Cjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTYuMSw0Mi4zIDI3LjEsMTkuNiA1Mi41LDE0LjcgODMsMTguMiA4OS4zLDM0LjQgODAuNyw4MC4yIDIxLjIsNzkuNiAxMyw2OC4zICIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMC4zLDI5LjZsMzMuOS03LjNjLTUuMywzLTkuNCw3LjUtMTEuNywxMi45TDQ0LjgsMzdjMS00LjIsNS44LTYuNSwxMC4xLTYuNWM1LjcsMCw3LjQsMy43LDYsOC4xCgljLTE2LDAtMzcuOCwzLTQ0LDE4LjljLTIuMSw1LjUtMS42LDEyLjIsMy4xLDE2LjRjMy4yLDIuOCw4LDQuMSwxMy45LDQuMWM3LjksMCwxOC40LTIuNywyMi45LTkuNWwtMC43LDYuNGwwLjQsMi4yaDIzLjIKCWMtMS0zLjYtMC41LTgsMC4xLTExLjZjMC45LTUuMiwyLjMtMTAuNiwzLjUtMTYuMWw4LjMsMzQuNEwxNy4yLDk5LjdMMC4zLDI5LjZMMC4zLDI5LjZMMC4zLDI5LjZ6IE02MC42LDE2LjdsMTQuMS0zbDEuMiw1LjIKCUM3MS4zLDE3LjEsNjUuNywxNi43LDYwLjYsMTYuN0w2MC42LDE2Ljd6Ii8+CjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik05LjEsMTUuNkw4My40LTAuM2wxNi45LDcwLjFsLTIxLjEsNC41Yy0wLjItMywwLTYsMC42LTguOWMyLTEwLjYsNS43LTIyLjUsNS43LTMzLjMKCWMwLTE0LjEtMTQuNy0xNS41LTI2LjMtMTUuNWMtMTQuOCwwLTMwLjYsNC40LTM2LjYsMTguNmwyMi4yLDEuN2MxLTQuMiw1LjgtNi41LDEwLjEtNi41YzUuNywwLDcuNCwzLjcsNiw4LjEKCUM0NiwzOC42LDI2LDQxLjIsMTguNCw1NC41TDkuMSwxNS42TDkuMSwxNS42eiBNNjYuNyw3Ny4xSDU2LjVsLTAuNC0yLjJsMC43LTYuNEM1Mi40LDc1LjIsNDEuOSw3OCwzNCw3OAoJYy0zLjYsMC4xLTcuMS0wLjUtMTAuNC0xLjlsMi4zLDkuN0w2Ni43LDc3LjFMNjYuNyw3Ny4xTDY2LjcsNzcuMXogTTU5LjIsNDkuNWMtNS42LDAtMTMuNCwxLjgtMTYuNCw2LjhjLTEsMS40LTEuMywzLjItMC44LDQuOAoJYzAuMSwwLjcsMC40LDEuMywwLjgsMS45YzEuOSwyLjUsNy45LDEuMiwxMC4zLTAuMkM1Ny42LDYwLjMsNTguMyw1NCw1OS4yLDQ5LjVMNTkuMiw0OS41eiIvPgo8L3N2Zz4K';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER, 'Client', null, true))
            .addField(new Field(FieldType.PASSWORD, PASSWORD, 'Secret', null, true))
            .addField(new Field(FieldType.TEXT, SERVER, 'Server', null, true))
            .addField(new Field(FieldType.TEXT, API, 'Api path', '/rest/api/v1', true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[USER]
          && authorizationForm?.[PASSWORD]
          && authorizationForm?.[SERVER]
          && authorizationForm?.[API];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: BodyInit,
    ): RequestDto {
        const headers = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
        };

        if (!_url) {
            throw new Error('Url must be set.');
        }
        const url = `${this.getBaseUrl(applicationInstall)}/${_url}`;
        const token = this.getToken(method, url, applicationInstall);

        const newUrl = `${url}${url.includes('?') ? '&' : '?'}token=${token}`;

        return new RequestDto(newUrl, method, dto, data, headers);
    }

    private getBaseUrl(applicationInstall: ApplicationInstall): string {
        const server = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][SERVER];
        const apiPath = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][API];

        return `${server}/${apiPath}`;
    }

    private getToken(
        method: HttpMethods,
        url: string,
        applicationInstall: ApplicationInstall,
    ): string {
        const secret = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PASSWORD];
        if (!secret) {
            throw new Error('Invalid secret.');
        }

        const client = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][USER];
        if (!client) {
            throw new Error('Invalid user.');
        }

        const date = new Date();
        const baseUrl = this.getBaseUrl(applicationInstall);
        return createHmac('sha1', secret, { encoding: 'base64' })
            .update(`${client}+${method}+${API}${url.replace(baseUrl, '')}+${date.toISOString()}`)
            .digest('base64');
    }

}
