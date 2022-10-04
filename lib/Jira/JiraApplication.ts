import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import {
    ABasicApplication,
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

const PREFIX_URL = 'prefix_url';

export default class JiraApplication extends ABasicApplication {

    public getName(): string {
        return 'jira';
    }

    public getPublicName(): string {
        return 'Jira';
    }

    public getDescription(): string {
        return 'Issue and bug tracking tool that allows software developers to manage product development';
    }

    public getBaseUrl(
        applicationInstall: ApplicationInstall,
    ): string {
        const prefix = applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[PREFIX_URL];
        if (!prefix) {
            throw new Error(`Application [${this.getPublicName()}] doesn't have url prefix!`);
        }
        return `https://${prefix}.atlassian.net`;
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA5Ni43OSAxMDAuMDciPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojMjY4NGZmO30uY2xzLTJ7ZmlsbDp1cmwoI05lcG9qbWVub3ZhbsO9X3DFmWVjaG9kKTt9LmNscy0ze2ZpbGw6dXJsKCNOZXBvam1lbm92YW7DvV9wxZllY2hvZF8yKTt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9Ik5lcG9qbWVub3ZhbsO9X3DFmWVjaG9kIiB4MT0iLTIxOC40MSIgeTE9IjI0MC4xMSIgeDI9Ii0yMjAuMjgiIHkyPSIyNDEuOTgiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQ1NS45NiAtMjYyNy42OSkgc2NhbGUoMTEuMDMpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwLjE4IiBzdG9wLWNvbG9yPSIjMDA1MmNjIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjY4NGZmIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Ik5lcG9qbWVub3ZhbsO9X3DFmWVjaG9kXzIiIHgxPSItMjE3LjkxIiB5MT0iMjQ1LjQ5IiB4Mj0iLTIxNi4wNCIgeTI9IjI0My42MiIgeGxpbms6aHJlZj0iI05lcG9qbWVub3ZhbsO9X3DFmWVjaG9kIi8+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTk3LjIzLDQ3LjIsNTQuMTcsNC4xNCw1MCwwLDE3LjU4LDMyLjM4LDIuNzYsNDcuMmE0LDQsMCwwLDAsMCw1LjZMMzIuMzcsODIuNDEsNTAsMTAwLDgyLjQsNjcuNjJsLjUxLS41LDE0LjMyLTE0LjNhNCw0LDAsMCwwLDAtNS42bDAsMFpNNTAsNjQuOCwzNS4yLDUwLDUwLDM1LjIsNjQuNzksNTBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMS42IDAuMDMpIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNTAsMzUuMkEyNC45LDI0LjksMCwwLDEsNDkuODkuMDlMMTcuNTEsMzIuNDUsMzUuMTMsNTAuMDdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMS42IDAuMDMpIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNjQuODMsNTAsNTAsNjQuOEEyNC45LDI0LjksMCwwLDEsNTAsMTAwTDgyLjQ2LDY3LjU4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuNiAwLjAzKSIvPjwvc3ZnPg==';
    }

    public getRequestDto(
        _dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const password = applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[PASSWORD];
        const user = applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[USER];

        if (!password || !user) {
            throw new Error(`Application [${this.getPublicName()}] doesn't have user name, password or both!`);
        }
        return new RequestDto(
            `${this.getBaseUrl(applicationInstall)}${url}`,
            method,
            _dto,
            data,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${user}:${password}`)}`,
            },
        );
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, PREFIX_URL, 'Attlasian prefix url', undefined, true))
            .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'Token', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[PREFIX_URL] && authorizationForm?.[USER] && authorizationForm?.[PASSWORD];
    }

}
