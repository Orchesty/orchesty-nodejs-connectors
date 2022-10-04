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

export const NAME = 'fakturaonline';
export const API_KEY = 'api_key';
export const ID = 'id';

export default class FakturaonlineApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Fakturaonline';
    }

    public getDescription(): string {
        return 'Online invoicing software for businesses and freelancers';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMwOTdGQjU7fQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxyZWN0IHg9IjAiIHk9IjAiIGNsYXNzPSJzdDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIi8+Cgk8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMyA0NykiPgoJCTxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iLTguNSwtMTYuMiAtOC41LDIyLjIgMS41LDIyLjIgMS41LDkgMTcuMiw5IDE3LjIsMC4yIDEuNSwwLjIgMS41LC02LjggMjAuNCwtNi44IDIwLjQsLTE2LjIgCQkiLz4KCQk8cGF0aCBkPSJNNDQuMy0xNy40YzExLjUsMCwyMC44LDkuMiwyMC44LDIwLjRzLTkuMywyMC40LTIwLjgsMjAuNFMyMy41LDE0LjMsMjMuNSwzUzMyLjgtMTcuNCw0NC4zLTE3LjR6IE00NC4zLTcuNAoJCQlDMzguNC03LjQsMzMuNi0yLjcsMzMuNiwzczQuOCwxMC40LDEwLjcsMTAuNFM1NSw4LjcsNTUsM1M1MC4yLTcuNCw0NC4zLTcuNHoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, 'API key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://api.fakturaonline.cz/v0/${uri}`;
        const request = new RequestDto(url, method, dto);
        const settings = applicationInstall.getSettings();
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: settings[AUTHORIZATION_FORM][API_KEY],
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
