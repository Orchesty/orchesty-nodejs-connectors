import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

const BASE_URL = 'https://discord.com/';

export default class DiscordApplication extends ABasicApplication {

    public getName(): string {
        return 'discord';
    }

    public getPublicName(): string {
        return 'Discord';
    }

    public getDescription(): string {
        return 'All-in-one voice & text chat for gamers';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM1ODY1RjI7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04NC41LDE4Yy02LjQtMy0xMy4zLTUuMi0yMC41LTYuNGMtMC45LDEuNi0xLjksMy43LTIuNiw1LjVjLTcuNi0xLjEtMTUuMi0xLjEtMjIuNywwCgkJYy0wLjctMS43LTEuOC0zLjktMi43LTUuNUMyOC44LDEyLjgsMjEuOSwxNSwxNS41LDE4QzIuNSwzNy42LTEsNTYuNywwLjcsNzUuNkM5LjMsODIsMTcuNyw4NS45LDI1LjksODguNWMyLTIuOCwzLjgtNS43LDUuNC04LjkKCQljLTMtMS4xLTUuOC0yLjUtOC41LTQuMWMwLjctMC41LDEuNC0xLjEsMi4xLTEuNmMxNi40LDcuNiwzNC4xLDcuNiw1MC4zLDBjMC43LDAuNiwxLjQsMS4xLDIuMSwxLjZjLTIuNywxLjYtNS41LDMtOC41LDQuMQoJCWMxLjYsMy4xLDMuNCw2LjEsNS40LDguOWM4LjItMi42LDE2LjYtNi41LDI1LjItMTIuOUMxMDEuMyw1My43LDk1LjcsMzQuOCw4NC41LDE4eiBNMzMuNSw2NGMtNC45LDAtOC45LTQuNi04LjktMTAuMgoJCXMzLjktMTAuMiw4LjktMTAuMmM1LDAsOSw0LjYsOC45LDEwLjJDNDIuNCw1OS40LDM4LjUsNjQsMzMuNSw2NHogTTY2LjUsNjRjLTQuOSwwLTguOS00LjYtOC45LTEwLjJzMy45LTEwLjIsOC45LTEwLjIKCQljNSwwLDksNC42LDguOSwxMC4yQzc1LjQsNTkuNCw3MS41LDY0LDY2LjUsNjR6Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getRequestDto(
        _dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const token = applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[TOKEN];
        if (!token) {
            throw new Error(`Application [${this.getPublicName()}] doesn't have token!`);
        }
        return new RequestDto(
            `${BASE_URL}${url}`,
            method,
            _dto,
            data,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Bot ${token}`,
            },
        );
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Bot token', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client id', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[TOKEN] && authorizationForm?.[CLIENT_ID];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected customFormReplace(forms: FormStack, applicationInstall: ApplicationInstall): void {
        forms.getForms().forEach((form) => {
            form.getFields().forEach((field) => {
                if (field.getKey() === CLIENT_ID && field.getValue()) {
                    form.addField(
                        new Field(
                            FieldType.TEXT,
                            'URL',
                            'Url to add bot to your server',
                            `https://discord.com/api/oauth2/authorize?client_id=${field.getValue()}&permissions=67584&scope=bot`,
                        ).setReadOnly(true),
                    );
                }
            });
        });
    }

}
