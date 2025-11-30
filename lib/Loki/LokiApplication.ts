import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'loki';

export const TENANT_KEY = 'tenant';
export const URL_KEY = 'url';

export enum LokiHeaders {
    TENANT = 'X-Scope-OrgID',
}

export default class LokiApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getDescription(): string {
        return 'Grafana Loki is a set of open source components that can be composed into a fully featured logging stack. A small index and highly compressed chunks simplifies the operation and significantly lowers the cost of Loki.';
    }

    public getPublicName(): string {
        return 'Loki';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MCIgaGVpZ2h0PSIxMDQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHZlcnNpb249IjEuMSI+CiA8ZGVmcz4KICA8bGluZWFyR3JhZGllbnQgeTI9Ii0xMC4wMzIyNyIgeDI9Ii0xLjExNjg4IiB5MT0iMy4yMDUxNSIgeDE9IjAuOTIwMTYiIGlkPSJTVkdJRF8xXyI+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmYWVkMWUiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZjE1YjJiIiBvZmZzZXQ9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxsaW5lYXJHcmFkaWVudCB5Mj0iLTUuODA2NjQiIHgyPSIwLjE0NDEiIHkxPSIzLjI5MTEyIiB4MT0iMC42NTg4OCIgaWQ9IlNWR0lEXzJfIj4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZhZWQxZSIgb2Zmc2V0PSIwIi8+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmMTViMmIiIG9mZnNldD0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPGxpbmVhckdyYWRpZW50IHkyPSItOC42NzU2OSIgeDI9Ii0wLjkwODEzIiB5MT0iNC41NjE3MyIgeDE9IjEuMTI4OTEiIGlkPSJTVkdJRF8zXyI+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmYWVkMWUiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZjE1YjJiIiBvZmZzZXQ9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxsaW5lYXJHcmFkaWVudCB5Mj0iLTEwLjAzMjg2IiB4Mj0iLTEuMTE3MTEiIHkxPSIzLjIwNDU3IiB4MT0iMC45MTk5MyIgaWQ9IlNWR0lEXzRfIj4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZhZWQxZSIgb2Zmc2V0PSIwIi8+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmMTViMmIiIG9mZnNldD0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPGxpbmVhckdyYWRpZW50IHkyPSItOC42NzU1OCIgeDI9Ii0wLjkwOTY3IiB5MT0iNC41NjE4NCIgeDE9IjEuMTI5NSIgaWQ9IlNWR0lEXzVfIj4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZhZWQxZSIgb2Zmc2V0PSIwIi8+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmMTViMmIiIG9mZnNldD0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPGxpbmVhckdyYWRpZW50IHkyPSItNi43MzkwNyIgeDI9IjAuMDkxNDkiIHkxPSIyLjM1ODY5IiB4MT0iMC42MDYyNyIgaWQ9IlNWR0lEXzZfIj4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZhZWQxZSIgb2Zmc2V0PSIwIi8+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmMTViMmIiIG9mZnNldD0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPGxpbmVhckdyYWRpZW50IHkyPSItMTAuMDMyMzkiIHgyPSItMS4xMTg1MSIgeTE9IjMuMjA1MDQiIHgxPSIwLjkyMDY3IiBpZD0iU1ZHSURfN18iPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZmFlZDFlIiBvZmZzZXQ9IjAiLz4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2YxNWIyYiIgb2Zmc2V0PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8bGluZWFyR3JhZGllbnQgeTI9Ii04LjY3NjE2IiB4Mj0iLTAuOTA3OSIgeTE9IjQuNTYxMjYiIHgxPSIxLjEyOTE0IiBpZD0iU1ZHSURfOF8iPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZmFlZDFlIiBvZmZzZXQ9IjAiLz4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2YxNWIyYiIgb2Zmc2V0PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8bGluZWFyR3JhZGllbnQgeTI9Ii0wLjEyMzkyIiB4Mj0iMC4wMzQxMiIgeTE9IjEuNjcyMjciIHgxPSIxLjM4MzI0IiBpZD0iU1ZHSURfOV8iPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZmFlZDFlIiBvZmZzZXQ9IjAiLz4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2YxNWIyYiIgb2Zmc2V0PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8bGluZWFyR3JhZGllbnQgeTI9Ii0wLjEyNDI5IiB4Mj0iMC4wMjU1MiIgeTE9IjEuNjcyOTQiIHgxPSIxLjM5ODc4IiBpZD0iU1ZHSURfMTBfIj4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZhZWQxZSIgb2Zmc2V0PSIwIi8+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmMTViMmIiIG9mZnNldD0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPGxpbmVhckdyYWRpZW50IHkyPSItMC4xMjQ2MiIgeDI9IjAuMDE4OCIgeTE9IjEuNjczNjEiIHgxPSIxLjQxMTIiIGlkPSJTVkdJRF8xMV8iPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZmFlZDFlIiBvZmZzZXQ9IjAiLz4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2YxNWIyYiIgb2Zmc2V0PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8bGluZWFyR3JhZGllbnQgeTI9Ii0wLjEyNDEzIiB4Mj0iMC4wMjk5MSIgeTE9IjEuNjcyNzgiIHgxPSIxLjM5MTI5IiBpZD0iU1ZHSURfMTJfIj4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZhZWQxZSIgb2Zmc2V0PSIwIi8+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmMTViMmIiIG9mZnNldD0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPGxpbmVhckdyYWRpZW50IHkyPSItMC4xMjM2MSIgeDI9IjAuMDQ0NDciIHkxPSIxLjY3MTUxIiB4MT0iMS4zNjQ0NCIgaWQ9IlNWR0lEXzEzXyI+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmYWVkMWUiIG9mZnNldD0iMCIvPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjZjE1YjJiIiBvZmZzZXQ9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxsaW5lYXJHcmFkaWVudCB5Mj0iLTAuMTIzODQiIHgyPSIwLjAzOTciIHkxPSIxLjY3MTkiIHgxPSIxLjM3MzA0IiBpZD0iU1ZHSURfMTRfIj4KICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZhZWQxZSIgb2Zmc2V0PSIwIi8+CiAgIDxzdG9wIHN0b3AtY29sb3I9IiNmMTViMmIiIG9mZnNldD0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiA8L2RlZnM+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPGcgaWQ9InN2Z18xIj4KICAgPGcgaWQ9InN2Z18xNSI+CiAgICA8cG9seWdvbiBpZD0ic3ZnXzE2IiBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIgcG9pbnRzPSIyMS4xODk5OTQ4MTIwMTE3Miw5NC4zNTk5OTc1NzA1MTQ2OCAxMi45MDk5OTYwMzI3MTQ4NDQsOTUuNjM5OTk2MzQ5ODExNTUgMTQuMTg5OTk0ODEyMDExNzE5LDEwMy45MjAwMDI3NTg1MDI5NiAyMi40NzAwMDEyMjA3MDMxMjUsMTAyLjY0OTk5ODQ4NjA0MjAyICIvPgogICAgPHBvbHlnb24gaWQ9InN2Z18xNyIgZmlsbD0idXJsKCNTVkdJRF8yXykiIHBvaW50cz0iNTEuMDkwMDAzOTY3Mjg1MTU2LDg0Ljk2OTk5ODE4MDg2NjI0IDg3LjY1MDAwMTUyNTg3ODksNzkuMzQwMDAwOTI3NDQ4MjcgODYuMzcwMDAyNzQ2NTgyMDMsNzEuMDYwMDAyMTQ4MTUxNCA0OS44MTk5OTk2OTQ4MjQyMiw3Ni42Nzk5OTcyNjUzMzg5ICIvPgogICAgPHBvbHlnb24gaWQ9InN2Z18xOCIgZmlsbD0idXJsKCNTVkdJRF8zXykiIHBvaW50cz0iMzYuODQ5OTk4NDc0MTIxMDk0LDc4LjY3OTk5NzI2NTMzODkgMzguMTE5OTk1MTE3MTg3NSw4Ni45NjAwMDM2NzQwMzAzIDQ2LjQwOTk5NjAzMjcxNDg0NCw4NS42ODk5OTk0MDE1NjkzNyA0NS4xMjk5OTcyNTM0MTc5Nyw3Ny4zOTk5OTg0ODYwNDIwMiAiLz4KICAgIDxwb2x5Z29uIGlkPSJzdmdfMTkiIGZpbGw9InVybCgjU1ZHSURfNF8pIiBwb2ludHM9IjM1LjQzOTk5NDgxMjAxMTcyLDEwMC42NDk5OTg0ODYwNDIwMiAzNC4xNTk5OTYwMzI3MTQ4NDQsOTIuMzY5OTk5NzA2NzQ1MTUgMjUuODc5OTk3MjUzNDE3OTcsOTMuNjM5OTk2MzQ5ODExNTUgMjcuMTUwMDAxNTI1ODc4OTA2LDEwMS45Mjk5OTcyNjUzMzg5ICIvPgogICAgPHBvbHlnb24gaWQ9InN2Z18yMCIgZmlsbD0idXJsKCNTVkdJRF81XykiIHBvaW50cz0iMTIuMTg5OTk0ODEyMDExNzE5LDkwLjk1MDAwMTUzNzc5OTg0IDIwLjQ3MDAwMTIyMDcwMzEyNSw4OS42Nzk5OTcyNjUzMzg5IDE5LjE5OTk5Njk0ODI0MjE4OCw4MS4zODk5OTYzNDk4MTE1NSAxMC45MTk5OTgxNjg5NDUzMTIsODIuNjcwMDAyNzU4NTAyOTYgIi8+CiAgICA8cG9seWdvbiBpZD0ic3ZnXzIxIiBmaWxsPSJ1cmwoI1NWR0lEXzZfKSIgcG9pbnRzPSI4OC4zNzAwMDI3NDY1ODIwMyw4NC4wMzAwMDMzNjg4NTQ1MiA1MS44MTAwMDUxODc5ODgyOCw4OS42NDk5OTg0ODYwNDIwMiA1My4wOTAwMDM5NjcyODUxNTYsOTcuOTM5OTk5NDAxNTY5MzcgODkuNjM5OTkxNzYwMjUzOSw5Mi4zMTAwMDIxNDgxNTE0ICIvPgogICAgPHBvbHlnb24gaWQ9InN2Z18yMiIgZmlsbD0idXJsKCNTVkdJRF83XykiIHBvaW50cz0iMzguODQ5OTk4NDc0MTIxMDk0LDkxLjY0OTk5ODQ4NjA0MjAyIDQwLjExOTk5NTExNzE4NzUsOTkuOTI5OTk3MjY1MzM4OSA0OC40MDAwMDE1MjU4Nzg5MDYsOTguNjYwMDAwNjIyMjcyNDkgNDcuMTI5OTk3MjUzNDE3OTcsOTAuMzY5OTk5NzA2NzQ1MTUgIi8+CiAgICA8cG9seWdvbiBpZD0ic3ZnXzIzIiBmaWxsPSJ1cmwoI1NWR0lEXzhfKSIgcG9pbnRzPSIyNS4xNTk5OTYwMzI3MTQ4NDQsODguOTYwMDAzNjc0MDMwMyAzMy40Mzk5OTQ4MTIwMTE3Miw4Ny42Nzk5OTcyNjUzMzg5IDMyLjE2OTk5ODE2ODk0NTMxLDc5LjM5OTk5ODQ4NjA0MjAyIDIzLjg3OTk5NzI1MzQxNzk3LDgwLjY3MDAwMjc1ODUwMjk2ICIvPgogICAgPHBvbHlnb24gaWQ9InN2Z18yNCIgZmlsbD0idXJsKCNTVkdJRF85XykiIHBvaW50cz0iMTAuMTk5OTk2OTQ4MjQyMTg4LDc3Ljk5MDAwMjQ1MzMyNzE4IDEzLjY4OTk5NDgxMjAxMTcxOSw3Ny40NTAwMDE1Mzc3OTk4NCAzLjUsMTEuMTY5OTk5ODk3NDgwMDExIDAsMTEuNzA5OTk5ODU5MzMzMDM4ICIvPgogICAgPHBvbHlnb24gaWQ9InN2Z18yNSIgZmlsbD0idXJsKCNTVkdJRF8xMF8pIiBwb2ludHM9IjE1LDc3LjI0OTk5Njk2MDE2MzEyIDE4LjUsNzYuNzEwMDAzNjc0MDMwMyA3LjU1OTk5NzU1ODU5Mzc1LDUuNTUwMDAwMDExOTIwOTI5IDQuMDU5OTk3NTU4NTkzNzUsNi4wODk5OTk5NzM3NzM5NTYgIi8+CiAgICA8cG9seWdvbiBpZD0ic3ZnXzI2IiBmaWxsPSJ1cmwoI1NWR0lEXzExXykiIHBvaW50cz0iMjMuMjIwMDAxMjIwNzAzMTI1LDc1Ljk4MDAwMDMxNzA5NjcxIDI2LjcwOTk5OTA4NDQ3MjY1Niw3NS40Mzk5OTk0MDE1NjkzNyAxNS4xMTAwMDA2MTAzNTE1NjIsMCAxMS42MTAwMDA2MTAzNTE1NjIsMC41NDAwMDAwMjE0NTc2NzIxICIvPgogICAgPHBvbHlnb24gaWQ9InN2Z18yNyIgZmlsbD0idXJsKCNTVkdJRF8xMl8pIiBwb2ludHM9IjI4LjAxOTk5NjY0MzA2NjQwNiw3NS4yNDAwMDI0NTMzMjcxOCAzMS41MTk5OTY2NDMwNjY0MDYsNzQuNzAwMDAxNTM3Nzk5ODQgMjAuOTM5OTk0ODEyMDExNzIsNS45MTk5OTk4OTc0ODAwMTEgMTcuNDM5OTk0ODEyMDExNzIsNi40NTk5OTk4NTkzMzMwMzggIi8+CiAgICA8cG9seWdvbiBpZD0ic3ZnXzI4IiBmaWxsPSJ1cmwoI1NWR0lEXzEzXykiIHBvaW50cz0iMzYuMTI5OTk3MjUzNDE3OTcsNzMuOTk5OTk2OTYwMTYzMTIgMzkuNjI5OTk3MjUzNDE3OTcsNzMuNDYwMDAzNjc0MDMwMyAzMC4yMjk5OTU3Mjc1MzkwNjIsMTIuMzYwMDAwNDMxNTM3NjI4IDI2LjcyOTk5NTcyNzUzOTA2MiwxMi44OTAwMDAxNjQ1MDg4MiAiLz4KICAgIDxwb2x5Z29uIGlkPSJzdmdfMjkiIGZpbGw9InVybCgjU1ZHSURfMTRfKSIgcG9pbnRzPSI0MC45Mzk5OTQ4MTIwMTE3Miw3My4yNTk5OTkwOTYzOTM1OSA0NC40Mzk5OTQ4MTIwMTE3Miw3Mi43MTk5OTgxODA4NjYyNCAzNC42ODAwMDAzMDUxNzU3OCw5LjI3OTk5OTU1NDE1NzI1NyAzMS4xODAwMDAzMDUxNzU3OCw5LjgxMDAwMDI0MDgwMjc2NSAiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KPC9zdmc+';
    }

    public getFormStack(): FormStack {
        return new FormStack().addForm(
            new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
                .addField(new Field(FieldType.URL, URL_KEY, 'Url', undefined, true))
                .addField(new Field(FieldType.TEXT, TENANT_KEY, 'Tenant', undefined, false))
                .addField(new Field(FieldType.TEXT, USER, 'User', undefined, false))
                .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', undefined, false)),
        );
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        path?: string,
        data?: unknown,
    ): RequestDto {
        const {
            user,
            password,
            tenant,
            url: lokiURL,
        } = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        const url = new URL(path ?? '', lokiURL).href;

        const headers: Record<string, string> = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
        };

        if (user && password) {
            headers[CommonHeaders.AUTHORIZATION] = `Basic ${encode(`${user}:${password}`)}`;
        }

        if (tenant) {
            headers[LokiHeaders.TENANT] = tenant;
        }

        const requestDto = new RequestDto(url, method, dto, data, headers);

        return requestDto;
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return (
            authorizationForm?.[URL_KEY]
            ?? (authorizationForm?.[URL_KEY] && authorizationForm?.[USER] && authorizationForm?.[PASSWORD])
        );
    }

}
