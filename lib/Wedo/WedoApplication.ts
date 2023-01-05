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
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const PASSWORD = 'userName';
export const USER = 'password';
export const NAME = 'wedo';

export default class WedoApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'WEDO';
    }

    public getDescription(): string {
        return 'Transport company providing logistics services with a focus on the end customer';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzIxRDc1Rjt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnPgoJPHJlY3QgeD0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiLz4KCTxnPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00OS4xLDYwLjFoMS41VjM2LjRoLTEuNVY2MC4xeiBNNTIsNjAuMWgxLjVWMzYuNEg1MlY2MC4xeiIvPgoJCTxnPgoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzQuNSwzOS43Yy0xLDAtMS43LDAuNS0xLjcsMS43djEzLjhjMCwxLDAuNSwxLjcsMS43LDEuN2g5LjljMC44LDAsMS4zLTAuNiwxLjMtMS4zYzAtMC42LTAuNi0xLjMtMS4zLTEuMwoJCQkJaC04LjJ2LTQuNUg0M2MwLjgsMCwxLjMtMC42LDEuMy0xLjNjMC0wLjgtMC42LTEuMy0xLjMtMS4zaC02Ljh2LTQuOWg3LjljMC44LDAsMS4zLTAuNiwxLjMtMS4zYzAtMC44LTAuNi0xLjMtMS4zLTEuM2gtOS42CgkJCQlWMzkuN3ogTTI5LjMsMzkuNmMtMC44LDAtMS4zLDAuNC0xLjUsMS4zTDI0LjcsNTNsMCwwbC0yLjgtMTEuN2MtMC4zLTEuMy0xLjItMS44LTIuMi0xLjhzLTEuOSwwLjYtMi4yLDEuOEwxNC43LDUzbDAsMAoJCQkJbC0zLjEtMTIuMmMtMC4zLTAuOS0wLjgtMS4zLTEuNS0xLjNjLTEuMywwLTEuOSwxLTEuNSwyLjRMMTIuMiw1NWMwLjQsMS4zLDEuMiwxLjksMi4zLDEuOWMxLjMsMCwyLTAuNiwyLjQtMS45bDIuOC0xMC44CgkJCQlMMjIuNiw1NWMwLjQsMS4zLDEuMiwxLjksMi40LDEuOWMxLjIsMCwyLTAuNiwyLjMtMS45TDMxLjEsNDJDMzEuMiw0MC44LDMwLjYsMzkuNiwyOS4zLDM5LjYiLz4KCQk8L2c+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik02MS4zLDQzLjFoMi4zYzMuMiwwLDQuNywxLjgsNC43LDUuMWMwLDMuNi0xLjUsNS40LTQuNyw1LjRoLTIuM1Y0My4xeiBNNjQuMSw1NC43YzMuNiwwLDUuOC0yLjMsNS44LTYuNAoJCQkJUzY3LjcsNDIsNjQuMSw0MmgtNC40djEyLjhoNC40VjU0Ljd6IE01OC41LDQwLjloNS45YzQuNCwwLDYuOSwyLjcsNi45LDcuM2MwLDIuMy0wLjYsNC4xLTEuOSw1LjVjLTEuMywxLjMtMi45LDItNS4xLDJoLTUuOQoJCQkJVjQwLjlINTguNXogTTY0LjgsNTYuOGMyLjQsMCw0LjUtMC44LDUuOS0yLjRjMS41LTEuNywyLjMtMy43LDIuMy02LjFjMC0yLjYtMC44LTQuNi0yLjMtNi4xYy0xLjUtMS41LTMuNS0yLjMtNS45LTIuM2gtNy43djE3CgkJCQlINjQuOHoiLz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkxLjcsNDguM2MwLDQtMi45LDcuNy04LjEsNy43Yy00LjYsMC03LjctMy41LTcuNy03LjZjMC0zLjgsMi43LTcuNyw3LjgtNy43CgkJCQlDODguNSw0MC42LDkxLjcsNDQuMSw5MS43LDQ4LjMgTTkzLjIsNDguM2MwLTUtNC04LjgtOS41LTguOGMtNiwwLTkuMyw0LjUtOS4zLDljMCw0LjcsMy43LDguOCw5LjIsOC44CgkJCQlDODkuNiw1Ny4xLDkzLjIsNTIuOSw5My4yLDQ4LjMiLz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTgzLjgsNDEuNmMtNC4yLDAtNi43LDMuMS02LjcsNi43YzAsMy44LDMuMSw2LjUsNi41LDYuNWMzLjYsMCw2LjctMi4yLDYuNy02LjcKCQkJCUM5MC40LDQ1LjQsODguMiw0MS42LDgzLjgsNDEuNnogTTgzLjcsNTMuNmMtMi44LDAtNS0yLjItNS01LjNjMC0zLjEsMS45LTUuNCw1LjEtNS40YzMuMywwLDUuMSwyLjcsNS4xLDUuMwoJCQkJQzg4LjgsNTEuNiw4Ni43LDUzLjYsODMuNyw1My42eiIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8L3N2Zz4K';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://bridge.intime.cz${uri}`, method, dto);
        const password = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PASSWORD];
        const user = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][USER];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: encode(`${password}:${user}`),
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, USER, ' User name', undefined, true))
            .addField(new Field(FieldType.PASSWORD, PASSWORD, ' Password', undefined, true));

        return new FormStack().addForm(form);
    }

}
