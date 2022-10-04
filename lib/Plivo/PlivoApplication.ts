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
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'plivo';
export const AUTH_ID = 'Authorization_id';
export const AUTH_TOKEN = 'Authorization_token';

export default class PlivoApplication extends ABasicApplication {

    public getName(): string {
        return 'plivo';
    }

    public getPublicName(): string {
        return 'Plivo';
    }

    public getDescription(): string {
        return 'Cloud-based communication platform to digitize and modernize business communications. It allows users to automatically interact using text messages in over 190 countries';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ImxheWVyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwM0E5NEE7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00OS45LDEwLjdjLTguNCwwLjEtMTYuMiwyLjktMjIuNSw3LjZTMTYuNCwyOS43LDEzLjksMzcuNGMtMC4xLDAuMy0wLjMsMC42LTAuNSwwLjkKCQljLTAuMiwwLjMtMC40LDAuNS0wLjcsMC43Yy0zLjksMi41LTcuMSw2LjEtOS4yLDEwLjNjLTIuMiw0LjItMy4zLDktMy4xLDE0LjFjMC40LDcuNCwzLjYsMTMuOSw4LjcsMTguNWM1LDQuNywxMS44LDcuNSwxOSw3LjQKCQloMjEuOUg3MmM3LjMtMC4xLDE0LTIuOSwxOS03LjZjNS00LjcsOC4yLTExLjMsOC42LTE4LjdjMC4yLTUuMS0wLjktOS45LTMuMS0xNC4xYy0yLjItNC4yLTUuNC03LjctOS4zLTEwLjIKCQljLTAuMy0wLjItMC41LTAuNC0wLjctMC43cy0wLjQtMC41LTAuNS0wLjljLTIuNS03LjctNy4zLTE0LjQtMTMuNi0xOUM2Ni4xLDEzLjQsNTguMywxMC42LDQ5LjksMTAuNyBNNDkuOSwyMC41CgkJYzYuMiwwLDEyLjEsMi4xLDE2LjksNS43YzQuOCwzLjYsOC41LDguOCwxMC4zLDE0LjhsMC40LDEuM2wwLjQsMS4zYzAuMSwwLjQsMC4zLDAuNywwLjUsMC45czAuNSwwLjUsMC44LDAuN2wxLjEsMC43bDEuMSwwLjcKCQljMi44LDEuNyw1LDQsNi40LDYuN3MyLjIsNS45LDIuMSw5LjFjLTAuMiw0LjgtMi4zLDktNS41LDEyYy0zLjIsMy4xLTcuNiw0LjktMTIuMyw0LjlsLTIyLDAuMUwyOCw3OS42Yy00LjcsMC05LjEtMS44LTEyLjMtNC44CgkJYy0zLjMtMy01LjQtNy4yLTUuNi0xMmMtMC4yLTMuMywwLjYtNi40LDItOS4yYzEuNS0yLjcsMy42LTUuMSw2LjQtNi44bDEuMS0wLjdsMS4xLTAuN2MwLjMtMC4yLDAuNi0wLjQsMC44LTAuNwoJCWMwLjItMC4zLDAuNC0wLjYsMC41LTAuOWwwLjQtMS4zbDAuNC0xLjNjMS44LTYuMSw1LjQtMTEuMiwxMC4yLTE0LjlDMzcuOCwyMi42LDQzLjcsMjAuNSw0OS45LDIwLjUiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00Mi40LDQ0LjNjMCwwLjYtMC4yLDEuMS0wLjYsMS41Yy0wLjQsMC40LTAuOSwwLjYtMS41LDAuNmgtMi4xaC0yLjFjLTAuNiwwLTEuMS0wLjItMS41LTAuNgoJCWMtMC40LTAuNC0wLjYtMC45LTAuNi0xLjV2LTIuMXYtMi4xYzAtMC42LDAuMi0xLjEsMC42LTEuNWMwLjQtMC40LDAuOS0wLjYsMS41LTAuNmgyLjFoMi4xYzAuNiwwLDEuMSwwLjMsMS41LDAuNgoJCWMwLjQsMC40LDAuNiwwLjksMC42LDEuNXYyLjFWNDQuM3ogTTU0LjIsNDQuM2MwLDAuNi0wLjIsMS4xLTAuNiwxLjVjLTAuNCwwLjQtMC45LDAuNi0xLjUsMC42SDUwaC0yLjFjLTAuNiwwLTEuMS0wLjItMS41LTAuNgoJCWMtMC40LTAuNC0wLjYtMC45LTAuNi0xLjV2LTIuMXYtMi4xYzAtMC42LDAuMi0xLjEsMC42LTEuNWMwLjQtMC40LDAuOS0wLjYsMS41LTAuNkg1MGgyLjFjMC42LDAsMS4xLDAuMywxLjUsMC42CgkJYzAuNCwwLjQsMC42LDAuOSwwLjYsMS41djIuMVY0NC4zeiBNNjUuOCw0NC4zYzAsMC42LTAuMiwxLjEtMC42LDEuNXMtMC45LDAuNi0xLjUsMC42aC0yLjFoLTIuMWMtMC42LDAtMS4xLTAuMi0xLjUtMC42CgkJYy0wLjQtMC40LTAuNi0wLjktMC42LTEuNXYtMi4xdi0yLjFjMC0wLjYsMC4yLTEuMSwwLjYtMS41YzAuNC0wLjQsMC45LTAuNiwxLjUtMC42aDIuMWgyLjFjMC42LDAsMS4xLDAuMiwxLjUsMC42CgkJYzAuNCwwLjQsMC42LDAuOSwwLjYsMS41bDAsMGwwLDB2Mi4xVjQ0LjN6IE00Mi40LDU2LjNjMCwwLjYtMC4yLDEuMS0wLjYsMS41Yy0wLjQsMC40LTAuOSwwLjYtMS41LDAuNmgtMi4xaC0yLjEKCQljLTAuNiwwLTEuMS0wLjItMS41LTAuNmMtMC40LTAuNC0wLjYtMC45LTAuNi0xLjV2LTIuMVY1MmMwLTAuNiwwLjItMS4xLDAuNi0xLjVjMC40LTAuNCwwLjktMC42LDEuNS0wLjZoMi4xaDIuMQoJCWMwLjYsMCwxLjEsMC4zLDEuNSwwLjZjMC40LDAuNCwwLjYsMC45LDAuNiwxLjV2Mi4xVjU2LjN6IE01NC4yLDU2LjNjMCwwLjYtMC4yLDEuMS0wLjYsMS41Yy0wLjQsMC40LTAuOSwwLjYtMS41LDAuNkg1MGgtMi4xCgkJYy0wLjYsMC0xLjEtMC4yLTEuNS0wLjZjLTAuNC0wLjQtMC42LTAuOS0wLjYtMS41di0yLjFWNTJjMC0wLjYsMC4yLTEuMSwwLjYtMS41YzAuNC0wLjQsMC45LTAuNiwxLjUtMC42SDUwaDIuMQoJCWMwLjYsMCwxLjEsMC4zLDEuNSwwLjZjMC40LDAuNCwwLjYsMC45LDAuNiwxLjV2Mi4xVjU2LjN6IE02NS44LDU2LjNjMCwwLjYtMC4yLDEuMS0wLjYsMS41cy0wLjksMC42LTEuNSwwLjZoLTIuMWgtMi4xCgkJYy0wLjYsMC0xLjEtMC4yLTEuNS0wLjZjLTAuNC0wLjQtMC42LTAuOS0wLjYtMS41di0yLjFWNTJjMC0wLjYsMC4yLTEuMSwwLjYtMS41YzAuNC0wLjQsMC45LTAuNiwxLjUtMC42aDIuMWgyLjEKCQljMC42LDAsMS4xLDAuMywxLjUsMC42YzAuNCwwLjQsMC42LDAuOSwwLjYsMS41djIuMVY1Ni4zeiBNNDIuNCw2OC4xYzAsMC42LTAuMiwxLjEtMC42LDEuNWMtMC40LDAuNC0wLjksMC42LTEuNSwwLjZoLTIuMWgtMi4xCgkJYy0wLjYsMC0xLjEtMC4yLTEuNS0wLjZjLTAuNC0wLjQtMC42LTAuOS0wLjYtMS41di0yLjF2LTIuMWMwLTAuNiwwLjItMS4xLDAuNi0xLjVjMC40LTAuNCwwLjktMC42LDEuNS0wLjZoMi4xaDIuMQoJCWMwLjYsMCwxLjEsMC4yLDEuNSwwLjZjMC40LDAuNCwwLjYsMC45LDAuNiwxLjVWNjZWNjguMXogTTU0LjIsNjguMWMwLDAuNi0wLjIsMS4xLTAuNiwxLjVjLTAuNCwwLjQtMC45LDAuNi0xLjUsMC42SDUwaC0yLjEKCQljLTAuNiwwLTEuMS0wLjItMS41LTAuNmMtMC40LTAuNC0wLjYtMC45LTAuNi0xLjV2LTIuMXYtMi4xYzAtMC42LDAuMi0xLjEsMC42LTEuNWMwLjQtMC40LDAuOS0wLjYsMS41LTAuNkg1MGgyLjEKCQljMC42LDAsMS4xLDAuMiwxLjUsMC42YzAuNCwwLjQsMC42LDAuOSwwLjYsMS41VjY2VjY4LjF6IE02NS45LDY4LjFjMCwwLjYtMC4yLDEuMS0wLjYsMS41Yy0wLjQsMC40LTAuOSwwLjYtMS41LDAuNmgtMi4xaC0yLjEKCQljLTAuNiwwLTEuMS0wLjItMS41LTAuNmMtMC40LTAuNC0wLjYtMC45LTAuNi0xLjV2LTIuMXYtMi4xYzAtMC42LDAuMi0xLjEsMC42LTEuNWMwLjQtMC40LDAuOS0wLjYsMS41LTAuNmgyLjFoMi4xCgkJYzAuNiwwLDEuMSwwLjIsMS41LDAuNmMwLjQsMC40LDAuNiwwLjksMC42LDEuNVY2NlY2OC4xeiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, AUTH_ID, ' Authorization id', undefined, true))
            .addField(new Field(FieldType.PASSWORD, AUTH_TOKEN, ' Authorization token', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[AUTH_ID] && authorizationForm?.[AUTH_TOKEN];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://api.plivo.com/v1/${url}`, method, dto);
        const id = applicationInstall.getSettings()[AUTHORIZATION_FORM][AUTH_ID];
        const token = applicationInstall.getSettings()[AUTHORIZATION_FORM][AUTH_TOKEN];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${id}:${token}`)}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
