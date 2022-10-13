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

export const API_KEY = 'api_key';
export const NAME = 'get-response';

export default class GetResponseApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'GetResponse';
    }

    public getDescription(): string {
        return 'Comprehensive marketing software platform that helps you create content, boost sales, and increase traffic to your business online';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzAwQkFGRjt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTk5LjUsNzcuM2MwLDIuMy0yLDQuNC00LjQsNC40SDQuNWMtMi4zLDAtNC40LTItNC40LTQuNFYyMi43YzAtMi4zLDEuOC00LjQsNC40LTQuNGg5MC45CgkJCWMyLjMsMCw0LjQsMiw0LjQsNC40djU0LjdIOTkuNXoiLz4KCTwvZz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05OC40LDE5LjdDODYuNywzOC4yLDY4LjMsNTQuOCw0OS42LDU0LjJjLTctMC4zLTE0LjktMi0yMS42LTcuNmMtNS00LjEtOS45LTEwLjUtMTItMTkuNmMtMC45LDAtMS41LDAtMiwwCgkJYy0yLjksMC01LDIuNi00LjQsNS4zYzAsMC42LDAuMywxLjIsMC4zLDEuOGMxLjUsOC44LDYuNywxOC43LDE1LjUsMjUuMWM3LDUuNiwxNS4yLDguOCwyNC42LDguOGMxNi43LDAsMzQuMi0xMC41LDQ5LjctMzcuN3YtNy45CgkJQzk5LjUsMjEuNSw5OSwyMC42LDk4LjQsMTkuN3oiLz4KPC9nPgo8L3N2Zz4K';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, ' Api key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://api.getresponse.com/v3/${url}`, method, dto);
        const apiKey = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][API_KEY];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            'X-Auth-Token': `api-key ${apiKey}`, // eslint-disable-line
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
