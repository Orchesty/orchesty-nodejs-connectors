import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit, Headers } from 'node-fetch';

export const BASE_URL = 'https://api.idoklad.cz/v3';

export default class IDokladApplication extends AOAuth2Application {

    public getName(): string {
        return 'i-doklad';
    }

    public getPublicName(): string {
        return 'iDoklad';
    }

    public getDescription(): string {
        return 'Web service for managing and issuing invoices';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZFQzkyOTt9Cgkuc3Qxe2ZpbGw6IzgwQkU2ODt9Cgkuc3Qye2ZpbGw6I0YyN0MzNjt9Cgkuc3Qze2ZpbGw6I0YwNjYzMjt9Cgkuc3Q0e2ZpbGw6I0ZBQUUyRDt9Cgkuc3Q1e2ZpbGw6IzQ1OTRDQzt9Cgkuc3Q2e2ZpbGw6IzY1QUQ2Njt9Cgkuc3Q3e2ZpbGw6IzM4NzdCODt9Cjwvc3R5bGU+CjxnIGlkPSJVRlMyazIudGlmIj4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00NS4zLDAuMkM0NiwwLjYsNDYuNywwLjksNDcsMS43YzAuMiwwLjQsMC4zLDAuNywwLjMsMS4xYzAsMTMuOSwwLDI3LjgsMCw0MS43YzAsMS41LTEuMiwyLjctMi42LDIuNwoJCWMtNi43LDAtMTMuNCwwLTIwLjEsMGMtMC4xLDAtMC4yLDAtMC4yLDBjMC4xLTAuMSwwLjMtMC4xLDAuNC0wLjFDMjUuOCw0Ny4xLDI3LDQ2LDI3LDQ1YzAtNiwwLTExLjksMC0xNy45YzAtMC4yLDAtMC40LDAtMC42CgkJYzAtNy43LDAtMTUuNCwwLTIzLjFjMC0xLjMsMC41LTIuMywxLjctMi45YzAuMi0wLjEsMC4zLTAuMSwwLjUtMC4yTDQ1LjMsMC4yeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTk3LjgsMC4yYzAuNywwLjMsMS4zLDAuNywxLjcsMS4zYzAuMiwwLjQsMC40LDAuOCwwLjQsMS4yYzAsNi42LDAsMTMuMSwwLDE5LjdjMCwwLjEsMCwwLjIsMCwwLjMKCQljLTAuNS0xLjYtMS41LTIuMy0zLjEtMi4zYy01LjcsMC0xMS40LDAtMTcsMGMtOCwwLTE2LjEsMC0yNC4xLDBjLTEuNywwLTIuOC0xLjItMi44LTIuOWMwLTQuOCwwLTkuNiwwLTE0LjQKCQljMC0xLjQsMC42LTIuMywxLjktMi44YzAuMSwwLDAuMSwwLDAuMS0wLjFMOTcuOCwwLjJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMjAuNCw3OS42YzgsMCwxNi4xLDAsMjQuMSwwYzEuNiwwLDIuOCwxLjIsMi44LDIuOGMwLDQuOSwwLDkuNywwLDE0LjZjMCwxLjUtMS4yLDIuOC0yLjgsMi44YzAsMCwwLDAtMC4xLDAKCQljLTEzLjgsMC0yNy42LDAtNDEuNCwwYy0xLjMsMC0yLjQtMC43LTIuOC0xLjljMC0wLjEsMC0wLjEtMC4xLTAuMVY3Ny4zYzAuNSwxLjUsMS41LDIuMywzLjEsMi4zQzksNzkuNiwxNC43LDc5LjYsMjAuNCw3OS42eiIvPgoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTIwLjQsNzkuNmMtNS43LDAtMTEuNCwwLTE3LjEsMGMtMS42LDAtMi42LTAuOS0zLjEtMi4zVjU0LjdjMC4yLTAuMywwLjMtMC43LDAuNi0xLjFjMC42LTAuNiwxLjItMSwyLjEtMQoJCWM0LjksMCw5LjgsMCwxNC43LDBjMS42LDAsMi44LDEuMiwyLjgsMi44YzAsNy45LDAsMTUuNywwLDIzLjZDMjAuNCw3OS4yLDIwLjQsNzkuNCwyMC40LDc5LjZ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMC4yLDI5LjJjMC4yLTAuNCwwLjQtMC44LDAuNi0xLjFjMC43LTAuNywxLjUtMSwyLjQtMWM2LjcsMCwxMy41LDAsMjAuMiwwYzEuMiwwLDIuMywwLDMuNSwwCgkJYzAsNiwwLDExLjksMCwxNy45YzAsMS0xLjIsMi4xLTIuMywyLjJjLTAuMSwwLTAuMywwLTAuNCwwLjFjLTAuNSwwLTEsMC0xLjUsMGMtNi41LDAtMTIuOSwwLTE5LjQsMGMtMS43LDAtMi44LTAuOC0zLjItMi4zCgkJTDAuMiwyOS4yeiIvPgoJPHBhdGggY2xhc3M9InN0NSIgZD0iTTUyLjcsNTVjMC4zLTEuNSwxLjMtMi4zLDIuOC0yLjNjNi40LDAsMTIuOCwwLDE5LjIsMGMwLjIsMCwwLjQsMCwwLjYsMGMtMC4xLDAuMS0wLjMsMC4xLTAuNCwwLjIKCQljLTEuMywwLjQtMS45LDEuMy0xLjksMi43YzAsNS44LDAsMTEuNiwwLDE3LjNjMCwwLjIsMCwwLjQsMCwwLjZjMCw3LjcsMCwxNS40LDAsMjMuMmMwLDEuNi0wLjgsMi43LTIuMywzLjFjLTAuMiwwLTAuMywwLTAuNSwwCgkJYy00LjksMC05LjgsMC0xNC43LDBjLTEuNSwwLTIuOC0xLjItMi44LTIuNmMwLTEwLjcsMC0yMS41LDAtMzIuMmMwLDAsMC0wLjEsMC0wLjFjMC4xLTAuMSwwLjEtMC4zLDAuMS0wLjVjMC0yLjksMC01LjksMC04LjgKCQlDNTIuOCw1NS4zLDUyLjgsNTUuMiw1Mi43LDU1eiIvPgoJPHBhdGggY2xhc3M9InN0NiIgZD0iTTc5LjYsMjAuNGM1LjcsMCwxMS40LDAsMTcsMGMxLjcsMCwyLjYsMC43LDMuMSwyLjNjMCwwLjEsMCwwLjMsMCwwLjRjMCwwLDAsMCwwLDBjMCwwLDAsMCwwLDAuMQoJCWMwLDAuMiwwLDAuMywwLDAuNWMwLDYuOSwwLDEzLjksMCwyMC44YzAsMS42LTEuMiwyLjgtMi44LDIuOGMtNC45LDAtOS43LDAtMTQuNiwwYy0xLjYsMC0yLjgtMS4yLTIuOC0yLjhjMC03LjgsMC0xNS43LDAtMjMuNQoJCUM3OS42LDIwLjgsNzkuNiwyMC42LDc5LjYsMjAuNHoiLz4KCTxwYXRoIGNsYXNzPSJzdDciIGQ9Ik03Myw3Mi45YzAtNS44LDAtMTEuNiwwLTE3LjNjMC0xLjQsMC42LTIuMiwxLjktMi43YzAuMSwwLDAuMy0wLjEsMC40LTAuMmMwLjEsMCwwLjIsMCwwLjMsMGMwLDAsMC4xLDAsMC4xLDAKCQljMS40LDAsMi45LDAsNC4zLDBjNS43LDAsMTEuMywwLDE3LDBjMS42LDAsMi44LDEuMiwyLjgsMi44YzAsNC45LDAsOS44LDAsMTQuN2MwLDEuNC0xLjIsMi43LTIuNiwyLjdDODkuMSw3Mi45LDgxLDcyLjksNzMsNzIuOXoKCQkiLz4KCTxwYXRoIGNsYXNzPSJzdDciIGQ9Ik01Mi43LDU1YzAuMSwwLjEsMC4xLDAuMywwLjEsMC41YzAsMi45LDAsNS45LDAsOC44YzAsMC4yLDAuMSwwLjMtMC4xLDAuNUw1Mi43LDU1eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTk5LjgsMjMuMkM5OS44LDIzLjIsOTkuOCwyMy4yLDk5LjgsMjMuMkM5OS44LDIzLjIsOTkuOCwyMy4xLDk5LjgsMjMuMkM5OS44LDIzLjIsOTkuOCwyMy4yLDk5LjgsMjMuMnoiLz4KCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik03NS43LDUyLjdDNzUuNyw1Mi44LDc1LjYsNTIuOCw3NS43LDUyLjdMNzUuNyw1Mi43eiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const headers = new Headers({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
        });

        return new RequestDto(url ?? BASE_URL, method, dto, data, headers);
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET];
    }

    public getAuthUrl(): string {
        return 'https://identity.idoklad.cz/server/connect/authorize';
    }

    public getTokenUrl(): string {
        return 'https://identity.idoklad.cz/server/connect/token';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['idoklad_api', 'offline_access'];
    }

}
