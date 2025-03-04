import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
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
import { AxiosResponse } from 'axios';

export const NAME = 'fapi';

export enum WebhookTypes {
    ORDERED = 'ordered',
}

export default class FapiApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getDescription(): string {
        return 'Jednoduchý online prodej';
    }

    public getPublicName(): string {
        return 'Fapi';
    }

    public getLogo(): string {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAABXBAMAAADSXjV5AAAACXBIWXMAAAsSAAALEgHS3X78AAAAJFBMVEVHcEwAbtsAbtsAbtsAbtsAbtsAbtsAbtsAbtsAbtsAbtsAbtstx4spAAAAC3RSTlMAwUCBX5wl2hDxsRVwA1oAAARZSURBVGjetZq/b9NQEMdffjlJWQIrS1QQQrAE2oksXhiQl4pKFSiLV5SlEkVC8mKBUFV1CVKFomap2rELifOjrv85aJvY78fd+2H7vS1+5/vEz1/f3TubEOfdY2TshoQbzvv7iX2fwAPwtb/bxeyuXEJaTxN0nHFntQbriWkI0hFfX13EbuWTZiIZ3B8/TifGIB7zFR8gdmPiyfCH7GmDdGIK4nFfT2C7iFzL8Ev2juHr8jAk9/ETaLeSnZIkM8Z7jZq5gPAB7il2QTsTfBtdl/WQuYpAOxO8h3jTwid7RfG0TFbG+EVBvMNMuaZ46vJz4WvM1IUxPiqGZ4PKjTE+e1h18Yy+XzNTc3P8d1P8CI559w+yOT4yxffoPCHPBxr42DfDL2jfdfw51sSnV6OHP3dl6ezGHD+W4Yl8DDlfcxk+PfQ8AG5+HvyAv5NaeFKl+NP8+NaEX0pfC09+iafkwNdlOUSGp5fNzY2vbMy+4QUXjD8WInUOfKq8j7j2YHxVKN5y4Pvp/QvQnAvjKcTf3PhJCh2g2kPwHp/CzPH1bMmHqPYQ/KPi+K0s2FVQ7SH4Ch93zPHUJddQ7SH4WnF8P3t0W2i9Zw9Py/0a0541fJXOwR5UDljFN+jyqw0WQzh+qzD+dGPUof/LXA/f5JO0Md6jk4aD7XMR/LDwc7+JeXHIbBF9LXyfr5xN8Q5b/fUR7cF4qlIYadd6q0tIeTN2NUc6+EZ2uGNQalIh/YTNmE1EezDeE0pdLfwc8NBj88+tBr6uWWwJyw+0I3xux+Gr8X3Ro16dHwrKm/I7/Z4K3/qgW2jjO1Ihx3lw6ys7dWc93gTQjtUQ3+YzfBvWnmqXs5cP7/HnN2DtqfB+Pvw1f8SBtaegL0guvCM+CwGovXLbCz6vvEh8mg6tNVdiIWEuxSQ208fPzVpLC0F5HbF4XVhrrI2FPaILRNLQUltx6vNNnTgEGj2uLr6nwO8wY9cXrnQB7ZpHmvgzVUsZqzXakMw86KCEPvXz4ofQQ9aGlgSnr7okLz5d58vtbLyCtIdfu0vy4sWmToK1tjGTI7wkVeLrilh2qMD/vnop2Qsq8U0FfqkstEkR/FA3j9nB91WN4tAqfqIqIlybeJXyaO1ZwFeU+KVN/FCJX9jE95X42CY+UOIz7ZWPVyuPKoLKx29p4Jf28Kca+Mge3tPAx/bwWcx7u82OZ6L2SsdXodAu/LOOLXwDfqXIvaNZ2sKfIF8SsPEwsoX3EriRwNYhK1v4IMHax0xEcu3gHdlLw5bsBVkp+EaCtW9B7ZWNb0s/VvAkjfJS8F6Cv7IEtFc2fiD7WID+lMUvjI+l34B15cLssuaxHE/ZDZD+LGs3VbzS77K/bzU/BbjNYpdUXH9AN1+4feYQD5FwvJxlwQO6u5t337ELv2WYsMqX+oIC1n+79Vb5CNzdfn6gHyB+fgbs/lnmix60nXOXvX3E8MfdZIg7upt+Qa2HzBcR7f4BpkgWeCA6iDMAAAAASUVORK5CYII=';
    }

    public getFormStack(): FormStack {
        return new FormStack()
            .addForm(
                new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
                    .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
                    .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', undefined, true)),
            );
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const { user, password } = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        const requestDto = new RequestDto(
            `https://api.fapi.cz/${url}`,
            method,
            dto,
            undefined,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.ACCEPT]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${user}:${password}`)}`,
            },
        );

        if (data) {
            requestDto.setJsonBody(data);
        }

        return requestDto;
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [];
    }

}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getErrorInResponse(response: AxiosResponse, body: string): Promise<string> {
    const data = JSON.parse(body) as IErrorResponse;

    if ('type' in data && 'message' in data) {
        return `Error: ${data.type}: ${data.message}`;
    }

    return body;
}

interface IErrorResponse {
    type: string;
    message: string;
}
