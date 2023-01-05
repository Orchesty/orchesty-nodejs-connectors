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

export const NAME = 'merk';
export const API_KEY = 'api_key';

export default class MerkApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Merk';
    }

    public getDescription(): string {
        return 'Company database and marketing tool that helps users to improve their business as well as find new opportunities';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMxM0NERjA7fQoJLnN0MXtmaWxsOiMwQ0E4REU7fQo8L3N0eWxlPgo8ZyBpZD0ibG9nbyI+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTkuNyw0OS4zYy0xLjMtMTYuNy0xNS4xLTI5LjYtMzEuOS0yOS43Yy0wLjQsMC0wLjcsMC0xLjEsMGMxLDEuMywxLjksMi42LDIuNiw0LjEKCQljMTUuNCwwLjgsMjcuMiwxMy45LDI2LjQsMjkuM0M5NSw2Ny4yLDgzLjksNzguNSw2OS44LDc5LjVjLTAuNywwLTEuNCwwLjEtMiwwLjFjLTEzLjUsMC0yNS4xLTkuNy0yNy41LTIzCgkJYzAuNi0xLjcsMC45LTMuNiwwLjktNS40YzAtOS03LjItMTYuMy0xNi4yLTE2LjNDMTYsMzQuOCw4LjcsNDIsOC43LDUxbDAsMHYxLjFoNS42di0xYzAtNS45LDQuOS0xMC42LDEwLjgtMTAuNgoJCWM1LjksMCwxMC42LDQuOSwxMC42LDEwLjhjMCw1LjktNC44LDEwLjYtMTAuNywxMC42aC0wLjJsLTEuMSwwdjUuNmgxaDAuMmM0LjgsMCw5LjMtMi4xLDEyLjQtNS44YzQuMywxMy4xLDE2LjYsMjIsMzAuNCwyMgoJCWMwLjgsMCwxLjUsMCwyLjMtMC4xQzg3LjcsODIuMywxMDEsNjcsOTkuNyw0OS4zQzk5LjcsNDkuMyw5OS43LDQ5LjMsOTkuNyw0OS4zTDk5LjcsNDkuM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03MC43LDI3LjVjMC41LDEuOCwwLjcsMy43LDAuNyw1LjZjMCwwLDAsMC4xLDAsMC4xYzEwLjIsMiwxNi44LDExLjgsMTQuOCwyMmMtMiwxMC4yLTExLjgsMTYuOC0yMiwxNC44CgkJYy04LjgtMS43LTE1LjEtOS40LTE1LjEtMTguNGMwLTAuMSwwLTAuMiwwLTAuM2wwLDBDNDkuMSwzNy45LDM4LjIsMjcsMjQuOCwyN2MtNS40LDAtMTAuNiwxLjgtMTQuOCw1bDAsMAoJCUMtMC44LDQwLjEtMi44LDU1LjMsNS4zLDY2YzcuOSwxMC40LDIyLjYsMTIuNywzMy4zLDUuMmMtMS0xLjYtMS45LTMuMy0yLjYtNWMtOC4zLDYuMi0yMCw0LjYtMjYuMi0zLjdDNy4zLDU5LjIsNS45LDU1LjIsNiw1MS4xCgkJaDBjMC0xMC4zLDguNS0xOC43LDE4LjgtMTguNmMxMC4zLDAsMTguNyw4LjUsMTguNiwxOC44bDAsMGMwLDAuMSwwLDAuMiwwLDAuM2MwLDEzLjQsMTAuOSwyNC4zLDI0LjMsMjQuMwoJCWMxMy40LDAsMjQuMy0xMC45LDI0LjMtMjQuM0M5Mi4xLDM5LjMsODIuOSwyOC45LDcwLjcsMjcuNUw3MC43LDI3LjV6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzcuNiwyOC4yYzIuOC02LjYsMTAuNC05LjgsMTctN2M2LjYsMi44LDkuOCwxMC40LDcsMTdjLTEuOSw0LjUtNi4xLDcuNS0xMC45LDcuOWMwLjIsMC44LDAuMywxLjYsMC4zLDIuNAoJCWMwLDAuNSwwLjEsMC45LDAuMSwxLjRjOS4zLTAuOCwxNi4xLTkuMSwxNS4zLTE4LjNjLTAuOC05LjMtOS4xLTE2LjEtMTguMy0xNS4zYy02LjIsMC42LTExLjUsNC41LTE0LDEwLjEKCQlDMzUuMywyNywzNi41LDI3LjYsMzcuNiwyOC4yeiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyLjYsMzEuOGwwLjIsMGMwLjctNCw0LjQtNi42LDguNC02YzQsMC43LDYuNiw0LjQsNiw4LjRjLTAuNywzLjktNC40LDYuNi04LjMsNmgtMC4xCgkJYzAuMywwLjcsMC42LDEuNSwwLjksMi4zYzUuMiwwLjEsOS42LTQsOS43LTkuMmMwLjEtNS4yLTQtOS42LTkuMi05LjdjLTQuMy0wLjEtOC4xLDIuNy05LjMsNi44QzQxLjUsMzAuOSw0Mi4xLDMxLjMsNDIuNiwzMS44eiIKCQkvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcwLjksMzcuN2MtMS44LDguNS04LjUsMTUuMS0xNy4xLDE2LjhjMS42LDcuNyw5LjIsMTIuNiwxNi45LDExYzcuNy0xLjYsMTIuNi05LjIsMTEtMTYuOQoJCUM4MC41LDQzLjIsNzYuMywzOSw3MC45LDM3Ljd6Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
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
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://api.merk.cz/${_url}`, method, dto);
        const apiKey = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][API_KEY];

        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Token ${apiKey}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
