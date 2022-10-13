import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

const BASE_URL = 'https://api.stripe.com';
const API_KEY = 'api_key';

export default class StripeApplication extends ABasicApplication {

    public getDescription(): string {
        return 'Developer-friendly way to accept payments online and in mobile apps';
    }

    public getName(): string {
        return 'stripe';
    }

    public getPublicName(): string {
        return 'Stripe';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWx0ZXI6dXJsKCNBZG9iZV9PcGFjaXR5TWFza0ZpbHRlcik7fQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGRkZGRkY7fQoJLnN0MnttYXNrOnVybCgjYl8xXyk7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMUExOTE4O30KPC9zdHlsZT4KPGc+Cgk8ZGVmcz4KCQk8ZmlsdGVyIGlkPSJBZG9iZV9PcGFjaXR5TWFza0ZpbHRlciIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwLjEiIHk9IjI5LjMiIHdpZHRoPSI5OS45IiBoZWlnaHQ9IjQxLjQiPgoJCQk8ZmVDb2xvck1hdHJpeCAgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjEgMCAwIDAgMCAgMCAxIDAgMCAwICAwIDAgMSAwIDAgIDAgMCAwIDEgMCIvPgoJCTwvZmlsdGVyPgoJPC9kZWZzPgoJPG1hc2sgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMC4xIiB5PSIyOS4zIiB3aWR0aD0iOTkuOSIgaGVpZ2h0PSI0MS40IiBpZD0iYl8xXyI+CgkJPGcgY2xhc3M9InN0MCI+CgkJCTxwYXRoIGlkPSJhXzFfIiBjbGFzcz0ic3QxIiBkPSJNMC4xLDI5LjNoOTkuOXY0MS40SDAuMVYyOS4zeiIvPgoJCTwvZz4KCTwvbWFzaz4KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMC41LDQ3LjljLTIuMi0wLjgtMy4zLTEuNC0zLjMtMi40YzAtMC44LDAuNy0xLjMsMS45LTEuM2MyLjIsMCw0LjUsMC45LDYsMS42bDAuOS01LjUKCQljLTEuMi0wLjYtMy44LTEuNi03LjMtMS42Yy0yLjUsMC00LjUsMC42LTYsMS45QzEuMiw0MiwwLjQsNDMuOCwwLjQsNDZjMCw0LDIuNCw1LjcsNi40LDcuMmMyLjYsMC45LDMuNCwxLjYsMy40LDIuNgoJCWMwLDEtMC44LDEuNS0yLjMsMS41Yy0xLjksMC00LjktMC45LTYuOS0yLjFsLTAuOSw1LjVjMS43LDEsNC45LDIsOC4yLDJjMi42LDAsNC44LTAuNiw2LjMtMS44YzEuNy0xLjMsMi41LTMuMiwyLjUtNS43CgkJQzE3LDUxLjEsMTQuNSw0OS40LDEwLjUsNDcuOUwxMC41LDQ3Ljl6IE0zMS40LDQ0LjdsMC45LTUuNGgtNC43di02LjZsLTYuMywxbC0wLjksNS42bC0yLjIsMC40bC0wLjgsNS4xaDN2MTAuNgoJCWMwLDIuOCwwLjcsNC43LDIuMiw1LjljMS4yLDEsMi45LDEuNCw1LjQsMS40YzEuOSwwLDMtMC4zLDMuOC0wLjV2LTUuN2MtMC40LDAuMS0xLjQsMC4zLTIuMSwwLjNjLTEuNCwwLTIuMS0wLjctMi4xLTIuNHYtOS42CgkJSDMxLjRMMzEuNCw0NC43eiBNNDUuNSwzOWMtMi4xLDAtMy43LDEuMS00LjQsM2wtMC40LTIuN2gtNi40djIyLjloNy4zVjQ3LjNjMC45LTEuMSwyLjItMS41LDQtMS41YzAuNCwwLDAuOCwwLDEuMywwLjF2LTYuOAoJCUM0Ni4zLDM5LDQ1LjksMzksNDUuNSwzOXogTTUyLjMsMzdjMi4xLDAsMy44LTEuNywzLjgtMy45YzAtMi4yLTEuNy0zLjktMy44LTMuOWMtMi4yLDAtMy45LDEuNy0zLjksMy45CgkJQzQ4LjQsMzUuMyw1MC4yLDM3LDUyLjMsMzdMNTIuMywzN3ogTTQ4LjYsMzkuM0g1NnYyMi45aC03LjNWMzkuM3ogTTc2LjgsNDEuM2MtMS4zLTEuNy0zLjEtMi41LTUuNC0yLjVjLTIuMSwwLTQsMC45LTUuNywyLjcKCQlsLTAuNC0yLjNoLTYuNHYzMS40bDcuMy0xLjJ2LTcuNGMxLjEsMC40LDIuMywwLjUsMy4zLDAuNWMxLjgsMCw0LjUtMC41LDYuNS0yLjdjMi0yLjIsMy01LjUsMy05LjlDNzksNDYuMiw3OC4yLDQzLjIsNzYuOCw0MS4zCgkJTDc2LjgsNDEuM3ogTTcwLjcsNTUuNWMtMC42LDEuMS0xLjUsMS43LTIuNiwxLjdjLTAuNywwLTEuNC0wLjEtMi0wLjRWNDUuOWMxLjItMS4zLDIuNC0xLjQsMi44LTEuNGMxLjksMCwyLjgsMiwyLjgsNS45CgkJQzcxLjcsNTIuNiw3MS40LDU0LjMsNzAuNyw1NS41TDcwLjcsNTUuNXogTTk5LjksNTAuNWMwLTMuNy0wLjgtNi41LTIuNC04LjZjLTEuNi0yLjEtNC0zLjEtNy0zLjFjLTYuMiwwLTEwLjEsNC42LTEwLjEsMTIKCQljMCw0LjEsMSw3LjIsMy4xLDkuMmMxLjgsMS44LDQuNSwyLjcsNy44LDIuN2MzLjEsMCw2LTAuNyw3LjgtMS45bC0wLjgtNWMtMS44LDEtMy45LDEuNS02LjMsMS41Yy0xLjQsMC0yLjQtMC4zLTMuMS0wLjkKCQljLTAuOC0wLjYtMS4yLTEuNy0xLjQtMy4yaDEyLjFDOTkuOSw1Mi43LDk5LjksNTEuMSw5OS45LDUwLjVMOTkuOSw1MC41eiBNODcuNyw0OC42YzAuMi0zLjMsMS4xLTQuOCwyLjgtNC44CgkJYzEuNywwLDIuNSwxLjYsMi42LDQuOEg4Ny43eiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getRequestDto(
        _dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        if (!this.isAuthorized(applicationInstall)) {
            throw new Error(`Application [${this.getPublicName()}] is not authorized!`);
        }

        const apiKey = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][ACCESS_TOKEN];
        return new RequestDto(
            `${BASE_URL}${url}`,
            method,
            _dto,
            data,
            {
                [CommonHeaders.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
                [CommonHeaders.AUTHORIZATION]: `Bearer ${apiKey}`,
            },
        );
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, 'API Key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

}
