import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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

export const NAME = 'myob';

export default class MYOBApplication extends AOAuth2Application {

    public getName(): string {
        return 'myob';
    }

    public getPublicName(): string {
        return 'MYOB';
    }

    public getDescription(): string {
        return 'Software that helps businesses manage payroll, monitor cash flow, and track finances';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9Im15b2ItbG9nbyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDEwMCAxMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMCAxMDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDp1cmwoI1NWR0lEXzFfKTt9Cgkuc3Qxe2ZpbGw6dXJsKCNTVkdJRF8yXyk7fQoJLnN0MntmaWxsOnVybCgjU1ZHSURfM18pO30KCS5zdDN7ZmlsbDp1cmwoI1NWR0lEXzRfKTt9Cjwvc3R5bGU+CjxnPgoJCgkJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIwLjE0MTUiIHkxPSI0OS45OTk4IiB4Mj0iOTkuODQ2IiB5Mj0iNDkuOTk5OCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDk5LjQ4OTgpIj4KCQk8c3RvcCAgb2Zmc2V0PSIwLjM2IiBzdHlsZT0ic3RvcC1jb2xvcjojNjEwMEE1Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC40NTU3IiBzdHlsZT0ic3RvcC1jb2xvcjojNzAwMUEwIi8+CgkJPHN0b3AgIG9mZnNldD0iMC42NDA5IiBzdHlsZT0ic3RvcC1jb2xvcjojOTgwMjkzIi8+CgkJPHN0b3AgIG9mZnNldD0iMC44OTQ3IiBzdHlsZT0ic3RvcC1jb2xvcjojRDkwNTdFIi8+CgkJPHN0b3AgIG9mZnNldD0iMC45NyIgc3R5bGU9InN0b3AtY29sb3I6I0VEMDY3NyIvPgoJPC9saW5lYXJHcmFkaWVudD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNi42LDQxLjZjLTEuNS0xLjktMy45LTMtNi44LTNjLTUuOCwwLTkuNiw0LjEtOS42LDkuNXYxMi40aDEuOGMxLjItMC4xLDMuNi0wLjcsMy43LTQuMlY0OAoJCWMwLTIuNCwxLjctNC4xLDQuMi00LjFjMy42LDAsNCwyLjksNCw0LjF2MTIuNWgxLjhjMS4yLTAuMSwzLjYtMC43LDMuNy00LjJWNDhjMC0yLjQsMS44LTQuMSw0LjItNC4xYzMuNiwwLDQsMi45LDQsNC4xdjEyLjVoMS44CgkJYzEuMi0wLjEsMy43LTAuNywzLjctNC4zdi04LjFjMC01LjYtMy42LTkuNi05LjUtOS42QzIwLjYsMzguNSwxOC4yLDM5LjcsMTYuNiw0MS42Ii8+CgkKCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAuMTQxNSIgeTE9IjQ0Ljc1OTkiIHgyPSI5OS44NDYiIHkyPSI0NC43NTk5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgOTkuNDg5OCkiPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzYiIHN0eWxlPSJzdG9wLWNvbG9yOiM2MTAwQTUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjQ1NTciIHN0eWxlPSJzdG9wLWNvbG9yOiM3MDAxQTAiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjY0MDkiIHN0eWxlPSJzdG9wLWNvbG9yOiM5ODAyOTMiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjg5NDciIHN0eWxlPSJzdG9wLWNvbG9yOiNEOTA1N0UiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk3IiBzdHlsZT0ic3RvcC1jb2xvcjojRUQwNjc3Ii8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTQ4LjgsNDEuNGwtNC42LDEyLjhsLTUtMTMuM2MtMC44LTIuMS0yLjctMi0yLjctMmgtNC4zbDguNSwyMC44YzAsMCwwLDAsMC0wLjFjMCwwLDAsMCwwLDAuMQoJCWMwLDAsMCwwLjEsMCwwLjFsMC0wLjFjMC4zLDAuOCwwLjIsMS4zLTAuMSwyLjFsLTAuMiwwLjVjLTEsMi41LTIuNCwzLjEtNS4zLDN2MGwyLDVjMy44LTAuMSw2LjctMS4zLDguNi02LjFMNTUuOSwzOWwwLDBoLTMuOAoJCWwwLDBDNTEuOSwzOSw0OS43LDM5LjEsNDguOCw0MS40Ii8+CgkKCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzNfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAuMTQxNSIgeTE9IjQ5LjczNjEiIHgyPSI5OS44NDYiIHkyPSI0OS43MzYxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgOTkuNDg5OCkiPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzYiIHN0eWxlPSJzdG9wLWNvbG9yOiM2MTAwQTUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjQ1NTciIHN0eWxlPSJzdG9wLWNvbG9yOiM3MDAxQTAiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjY0MDkiIHN0eWxlPSJzdG9wLWNvbG9yOiM5ODAyOTMiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjg5NDciIHN0eWxlPSJzdG9wLWNvbG9yOiNEOTA1N0UiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk3IiBzdHlsZT0ic3RvcC1jb2xvcjojRUQwNjc3Ii8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTYwLDQ5LjhjMC0zLjcsMi40LTYuMyw1LjMtNi4zczUuMywyLjYsNS4zLDYuM2MwLDMuNi0yLjQsNi4xLTUuMyw2LjFTNjAsNTMuNCw2MCw0OS44IE01NC41LDQ5LjgKCQljMCw2LjQsNC44LDExLjIsMTAuOCwxMS4yUzc2LDU2LjIsNzYsNDkuOHMtNC45LTExLjMtMTAuOC0xMS4zQzU5LjMsMzguNSw1NC41LDQzLjQsNTQuNSw0OS44Ii8+CgkKCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzRfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAuMTQxNSIgeTE9IjU0LjI1NTgiIHgyPSI5OS44NDYiIHkyPSI1NC4yNTU4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgOTkuNDg5OCkiPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzYiIHN0eWxlPSJzdG9wLWNvbG9yOiM2MTAwQTUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjQ1NTciIHN0eWxlPSJzdG9wLWNvbG9yOiM3MDAxQTAiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjY0MDkiIHN0eWxlPSJzdG9wLWNvbG9yOiM5ODAyOTMiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjg5NDciIHN0eWxlPSJzdG9wLWNvbG9yOiNEOTA1N0UiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk3IiBzdHlsZT0ic3RvcC1jb2xvcjojRUQwNjc3Ii8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTgzLjQsNDkuOGMwLTMuNCwyLjUtNi4yLDUuNS02LjJzNS41LDIuNyw1LjUsNi4yYzAsMy40LTIuNSw2LTUuNSw2Qzg1LjgsNTUuOSw4My40LDUzLjIsODMuNCw0OS44CgkJIE04Mi4yLDI5LjVMODIuMiwyOS41Yy0zLjcsMC00LjMsMi41LTQuNCwzLjd2MjcuMmgyLjZjMi4xLDAsMi42LTEuMywyLjYtMi4xdi0wLjF2LTAuMWMxLjcsMS44LDMuOSwyLjcsNi41LDIuNwoJCWM1LjYsMCwxMC4yLTQuOCwxMC4yLTExLjJjMC02LjQtNC42LTExLjItMTAuMi0xMS4yYy0yLjUsMC00LjYsMC45LTYuMywyLjVWMjkuNUg4Mi4yeiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getAuthUrl(): string {
        return 'https://secure.myob.com/oauth2/account/authorize';
    }

    public getTokenUrl(): string {
        return 'https://secure.myob.com/oauth2/v1/authorize';
    }

    public getScopes(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        applicationInstall: ApplicationInstall,
    ): string[] {
        return ['CompanyFile'];
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://api.myob.com/accountright/${url}`, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
            'x-myobapi-version': 'v2', // eslint-disable-line
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
