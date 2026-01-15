import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import CacheService, { ICacheCallback } from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const PINYA_APPLICATION = 'pinya';

const BASE_URL = 'https://api.pinya.hr';
const TENANT_GUID = 'tenantGuid';
const TENANT_SECRET_KEY = 'secretKey';
const TENANT_SECRET_KEY_IDENTIFIER = 'secretKeyIdentifier';

export const accessCacheKey = 'pinya-accessKey';
export const accessLockKey = `${accessCacheKey}-lock`;

export default class PinyaApplication extends ABasicApplication {

    public constructor(private readonly cache: CacheService) {
        super();
    }

    public getName(): string {
        return PINYA_APPLICATION;
    }

    public getPublicName(): string {
        return 'Pinya';
    }

    public getDescription(): string {
        return 'HR software, který uvolní ruce vašemu týmu. Minimum administrativy zaručí soustředění na samotnou práci a vyšší výkon firmy';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, TENANT_GUID, 'Tenant guid', undefined, true))
            .addField(new Field(FieldType.TEXT, TENANT_SECRET_KEY, 'Tenant secret key', undefined, true))
            .addField(new Field(FieldType.TEXT, TENANT_SECRET_KEY_IDENTIFIER, 'Tenant secret key identifier', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        return authorizationForm?.[TENANT_GUID]
            && authorizationForm?.[TENANT_SECRET_KEY]
            && authorizationForm?.[TENANT_SECRET_KEY_IDENTIFIER];
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        const request = new RequestDto(`${BASE_URL}/${url}`, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: await this.getAccessToken(applicationInstall),
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getLogo(): string {
        return 'PHN2ZyB3aWR0aD0iMjQ2IiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI0NiAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNi4xMiA3MC4wM0wyMi42NCA2Mi42N0wyNi4xMiA1NS4zMUgzMy4wOUwzNi41NyA2Mi42N0wzMy4wOSA3MC4wM0gyNi4xMloiIGZpbGw9IiNGMjUzMEQiLz4KPHBhdGggZD0iTTM3LjUxIDYxLjczTDM0LjAyIDU0LjM3TDM3LjUxIDQ3LjAxSDQ0LjQ3TDQ3Ljk1IDU0LjM3TDQ0LjQ3IDYxLjczSDM3LjUxWiIgZmlsbD0iI0YyNTMwRCIvPgo8cGF0aCBkPSJNMzcuNzYgNzguMDdMMzQuMjggNzAuNzFMMzcuNzYgNjMuMzVINDQuNzNMNDguMjEgNzAuNzFMNDQuNzMgNzguMDdIMzcuNzZaIiBmaWxsPSIjMzgzQTNBIi8+CjxwYXRoIGQ9Ik00OC44MyA2OS43NUw0NS4zNSA2Mi4zOEw0OC44MyA1NS4wMkg1NS44TDU5LjI4IDYyLjM4TDU1LjggNjkuNzVINDguODNaIiBmaWxsPSIjRjI1MzBEIi8+CjxwYXRoIGQ9Ik0yNi4wNSA4Ni4wOEwyMi41NyA3OC43MkwyNi4wNSA3MS4zNkgzMy4wMkwzNi41IDc4LjcyTDMzLjAyIDg2LjA4SDI2LjA1WiIgZmlsbD0iI0YyNTMwRCIvPgo8cGF0aCBkPSJNNDkuMjIgODYuMjRMNDUuNzMgNzguODhMNDkuMjIgNzEuNTJINTYuMThMNTkuNjcgNzguODhMNTYuMTggODYuMjRINDkuMjJaIiBmaWxsPSIjRjI1MzBEIi8+CjxwYXRoIGQ9Ik02MC4xMSA2My4yMkw2MC4zNiA3Ny40Mkw1Ni44OCA3MC4wNkw2MC4xMSA2My4yMloiIGZpbGw9IiNGMjUzMEQiLz4KPHBhdGggZD0iTTIyLjA2IDYzLjc3TDIxLjgxIDc3Ljk3TDI1LjMgNzAuNjFMMjIuMDYgNjMuNzdaIiBmaWxsPSIjRjI1MzBEIi8+CjxwYXRoIGQ9Ik01NS43OCA4Ny42NEw1MC40NyA5MC44Mkw0OS4zMiA4Ny4zM0w1NS43OCA4Ny42NFoiIGZpbGw9IiNGMjUzMEQiLz4KPHBhdGggZD0iTTMxLjY2IDkxLjEyTDI1LjYzIDg3LjIzTDMyLjU4IDg3LjgxTDMxLjY2IDkxLjEyWiIgZmlsbD0iI0YyNTMwRCIvPgo8cGF0aCBkPSJNMC41IDkyLjUxQzQuNzc4NSA5MS42NDExIDkuMTM0MTcgOTEuMjA4OSAxMy41IDkxLjIyQzIzLjYzMzMgOTEuMjIgMjguNjk2NyA5Ni4yMiAyOC42OSAxMDYuMjJDMjguNjkgMTE3LjI2NyAyMy41OTY3IDEyMi43OTMgMTMuNDEgMTIyLjhDMTAuODg2MSAxMjIuODAxIDguMzg4NTggMTIyLjI4NyA2LjA3IDEyMS4yOVYxMzQuMjJIMC41VjkyLjUxWk02LjA2IDExNi4zNkM4LjMzNTY0IDExNy40NjkgMTAuODM4OCAxMTguMDMgMTMuMzcgMTE4QzE5LjkzIDExOCAyMy4yMSAxMTQuMDYgMjMuMjEgMTA2LjE4QzIzLjIxIDk5LjMyIDE5Ljk1IDk1Ljg4MzMgMTMuNDMgOTUuODdDMTAuOTU0NCA5NS44Mzg4IDguNDgyNzkgOTYuMDgwMiA2LjA2IDk2LjU5VjExNi4zNloiIGZpbGw9IiMzODNBM0EiIHN0cm9rZT0iIzM4M0EzQSIvPgo8cGF0aCBkPSJNNTUuODYgMTIyLjhWOTEuMjJINTkuNjJMNjAuNjIgOTUuMjJDNjMuNTczIDkyLjY0ODUgNjcuMzU0MyA5MS4yMjgzIDcxLjI3IDkxLjIyQzc5LjE1IDkxLjIyIDgzLjA5IDk1LjE0IDgzLjA5IDEwMi45OFYxMjIuOEg3Ny41MVYxMDIuOTRDNzcuNTEgOTguMjczMyA3NS4xNzY3IDk1Ljk0IDcwLjUxIDk1Ljk0QzY3LjMzIDk1Ljk0IDY0LjMwMzMgOTcuMjczMyA2MS40MyA5OS45NFYxMjIuOTRMNTUuODYgMTIyLjhaIiBmaWxsPSIjMzgzQTNBIiBzdHJva2U9IiMzODNBM0EiLz4KPHBhdGggZD0iTTg4LjMzIDkxLjIySDk0LjMzTDEwMy4zMyAxMTUuODhMMTEyLjU2IDkxLjIySDExOC40NkwxMDUuMzMgMTIzLjczQzEwMy4wMSAxMjkuNDU3IDk5LjUyMzQgMTMzLjAzNyA5NC44NyAxMzQuNDdMOTIuNzMgMTMwLjUzQzk2LjE2MDEgMTI5LjA3OSA5OC45MTIgMTI2LjM4MSAxMDAuNDMgMTIyLjk4TDg4LjMzIDkxLjIyWiIgZmlsbD0iIzM4M0EzQSIgc3Ryb2tlPSIjMzgzQTNBIi8+CjxwYXRoIGQ9Ik0xMjIuMTggMTEzLjI2QzEyMi4xOCAxMDYuOCAxMjYuNDUgMTAzLjU2MyAxMzQuOTkgMTAzLjU1QzEzNy43NDggMTAzLjU1IDE0MC41MDIgMTAzLjc1IDE0My4yMyAxMDQuMTVWMTAxLjE1QzE0My4yMyA5Ny41MyAxNDAuMzkzIDk1LjcxNjcgMTM0LjcyIDk1LjcxQzEzMS4zMzIgOTUuNzMxOSAxMjcuOTY1IDk2LjIzNyAxMjQuNzIgOTcuMjFWOTIuNzJDMTI3Ljk2NSA5MS43NDcgMTMxLjMzMiA5MS4yNDE5IDEzNC43MiA5MS4yMkMxNDQuMSA5MS4yMiAxNDguNzkgOTQuNDg2NyAxNDguNzkgMTAxLjAyVjEyMi44SDE0NS42N0wxNDMuNzQgMTE5LjY3QzE0MC43MDEgMTIxLjcyIDEzNy4xMTYgMTIyLjgxMSAxMzMuNDUgMTIyLjhDMTI1Ljk0MyAxMjIuOCAxMjIuMTg3IDExOS42MiAxMjIuMTggMTEzLjI2Wk0xMzUgMTA4LjA2QzEzMC4xNjcgMTA4LjA2IDEyNy43NTEgMTA5Ljc2MyAxMjcuNzUgMTEzLjE3QzEyNy43NDkgMTE2LjU3NyAxMjkuNjUzIDExOC4yOCAxMzMuNDYgMTE4LjI4QzEzNi45NzEgMTE4LjM4OSAxNDAuNDE3IDExNy4zMTEgMTQzLjI0IDExNS4yMlYxMDguNjZDMTQwLjUxMiAxMDguMjYgMTM3Ljc1OCAxMDguMDYgMTM1IDEwOC4wNloiIGZpbGw9IiMzODNBM0EiIHN0cm9rZT0iIzM4M0EzQSIvPgo8cGF0aCBkPSJNMzcuOTggNzkuNzNMMzMuMTMgMTE0Ljg4TDQxLjMgMTIzLjI4TDQ5LjAzIDExNC44OEw0NC45NSA3OS43M0gzNy45OFoiIGZpbGw9IiMzODNBM0EiLz4KPHBhdGggZD0iTTYxLjMzIDIzLjU4QzYxLjMzIDIzLjU4IDQxLjE4IDIwLjc4IDQxLjMzIDQ0LjY2QzQxLjMzIDQ0LjY2IDYxLjE5IDI5LjYyIDYxLjMzIDIzLjU4WiIgZmlsbD0iIzg1OUEyMyIvPgo8cGF0aCBkPSJNNDEuNjYgNDQuNDFDNDEuNjYgNDQuNDEgNDEuNTggMzMuOCA1MS40IDMwLjQxQzYxLjIyIDI3LjAyIDYxLjMzIDIzLjYxIDYxLjMzIDIzLjYxQzYxLjMzIDIzLjYxIDY0LjA3IDQ0LjY5IDQxLjY2IDQ0LjQxWiIgZmlsbD0iI0I4RDEyNCIvPgo8cGF0aCBkPSJNMjEuNyAzMi41N0MyMS43IDMyLjU3IDM1LjU2IDI3LjQ2IDM5LjEyIDQ0LjQ1QzM5LjEyIDQ0LjQ1IDIyLjcyIDM2Ljg0IDIxLjcgMzIuNTdaIiBmaWxsPSIjODU5QTIzIi8+CjxwYXRoIGQ9Ik0zOC44NyA0NC4zMkMzOC44NyA0NC4zMiAzNy4yOSAzNi43NyAyOS43OSAzNS44N0MyMi4yOSAzNC45NyAyMS43IDMyLjU3IDIxLjcgMzIuNTdDMjEuNyAzMi41NyAyMyA0OCAzOC44NyA0NC4zMloiIGZpbGw9IiNCOEQxMjQiLz4KPHBhdGggZD0iTTM2IDE2QzM2IDE2IDQ5LjA2IDIyLjk0IDM4Ljc5IDM2Ljk0QzM4LjgxIDM2Ljk0IDMzLjUzIDE5LjYxIDM2IDE2WiIgZmlsbD0iIzg1OUEyMyIvPgo8cGF0aCBkPSJNMzguNzQgMzYuNjNDMzguNzQgMzYuNjMgNDMuMyAzMC40MSAzOSAyNC4yMkMzNC43IDE4LjAzIDM2IDE2IDM2IDE2QzM2IDE2IDI1LjQyIDI3LjI3IDM4Ljc0IDM2LjYzWiIgZmlsbD0iI0I4RDEyNCIvPgo8cGF0aCBkPSJNNDUuNiA0Ny4xM0w1NC45IDUzLjg3TDQ5LjE4IDUzLjc5TDQ1LjYgNDcuMTNaIiBmaWxsPSIjRjI1MzBEIi8+CjxwYXRoIGQ9Ik0zNi4wNiA0Ny4yOEwyNi43NSA1NC4wMkwzMi40OCA1My45NEwzNi4wNiA0Ny4yOFoiIGZpbGw9IiNGMjUzMEQiLz4KPHBhdGggZD0iTTE3MC42MyA5MS44OUgxNjYuODZWMTI0LjM1SDE3MC42M1Y5MS44OVoiIGZpbGw9IiMzODNBM0EiLz4KPHBhdGggZD0iTTIxNC40MiAxMjRIMjA4Ljk0VjEwOS44MUgxOTQuNzhWMTI0SDE4OS4zM1Y5MkgxOTQuODNWMTA1LjMzSDIwOC45OVY5Mi4wMUgyMTQuNDdMMjE0LjQyIDEyNFoiIGZpbGw9IiNGMzkzMjIiLz4KPHBhdGggZD0iTTIzMy40NiAxMTEuN0gyMjcuMzNWMTI0SDIyMS44M1Y5MkgyMzIuOTdDMjM2LjYxNyA5MiAyMzkuNDM3IDkyLjgyNjcgMjQxLjQzIDk0LjQ4QzI0My40MjMgOTYuMTMzMyAyNDQuNDIzIDk4LjUzMzMgMjQ0LjQzIDEwMS42OEMyNDQuNDk4IDEwMy41ODYgMjQzLjk2MyAxMDUuNDY2IDI0Mi45IDEwNy4wNUMyNDEuODE2IDEwOC41NDQgMjQwLjMzMiAxMDkuNzAxIDIzOC42MiAxMTAuMzlMMjQ1LjczIDEyMy43MVYxMjMuOTlIMjM5Ljg0TDIzMy40NiAxMTEuN1pNMjI3LjMzIDEwNy4yMkgyMzIuOTlDMjM0LjU2NCAxMDcuMzA4IDIzNi4xMTMgMTA2LjgwMSAyMzcuMzMgMTA1LjhDMjM3Ljg1NCAxMDUuMzA3IDIzOC4yNjUgMTA0LjcwNyAyMzguNTM2IDEwNC4wNDFDMjM4LjgwNyAxMDMuMzc1IDIzOC45MzEgMTAyLjY1OCAyMzguOSAxMDEuOTRDMjM4Ljk0NiAxMDEuMjA5IDIzOC44NDEgMTAwLjQ3NyAyMzguNTkyIDk5Ljc4ODlDMjM4LjM0MiA5OS4xMDA3IDIzNy45NTQgOTguNDcxMyAyMzcuNDUgOTcuOTRDMjM2LjI0OCA5Ni45MjMgMjM0LjcwMiA5Ni40MDQyIDIzMy4xMyA5Ni40OUgyMjcuMzNWMTA3LjIyWiIgZmlsbD0iI0YzOTMyMiIvPgo8L3N2Zz4=';
    }

    private async accessToken(applicationInstall: ApplicationInstall): Promise<IAccess> {
        const {
            tenantGuid,
            secretKey,
            secretKeyIdentifier,
        } = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        const requestDto = new RequestDto(
            `${BASE_URL}/authentication`,
            HttpMethods.POST,
            new ProcessDto(),
            JSON.stringify({
                tenantGuid,
                tenantSecretKey: secretKey,
                tenantSecretKeyIdentifier: secretKeyIdentifier,
            }),
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.ACCEPT]: JSON_TYPE,
            },
        );

        return this.cache.entryWithLock(
            accessCacheKey,
            accessLockKey,
            requestDto,
            this.accessCallBack.bind(this),
        );
    }

    private async getAccessToken(applicationInstall: ApplicationInstall): Promise<string> {
        const date = new Date();
        date.setMinutes(date.getMinutes() - 1);
        const storedAccessToken = await this.accessToken(applicationInstall);
        // eslint-disable-next-line @typescript-eslint/prefer-destructuring
        let accessToken = storedAccessToken.accessToken;

        if (storedAccessToken.expiration < date.getTime()) {
            // eslint-disable-next-line @typescript-eslint/prefer-destructuring
            accessToken = (await this.accessTokenByRefreshToken(
                storedAccessToken.accessToken,
                storedAccessToken.refreshToken,
            )).accessToken;
        }
        return `Bearer ${accessToken}`;
    }

    private async accessTokenByRefreshToken(
        accessToken: string,
        refreshToken: string,
    ): Promise<IAccess> {
        const requestDto = new RequestDto(
            `${BASE_URL}/authentication/refresh`,
            HttpMethods.POST,
            new ProcessDto(),
            JSON.stringify({
                accessToken,
                refreshToken,
            }),
        );

        await this.cache.deleteCache(accessCacheKey);

        return this.cache.entryWithLock<IAccess>(
            accessCacheKey,
            accessLockKey,
            requestDto,
            this.accessCallBack.bind(this),
        );
    }

    // eslint-disable-next-line @hanaboso/arrow
    private readonly accessCallBack = async (res: ResponseDto): Promise<ICacheCallback<IAccess>> => {
        const body = await res.getJsonBody() as { data: IAccess };
        const token: IAccess = {
            accessToken: body.data.accessToken,
            refreshToken: body.data.refreshToken,
            expiration: this.getExpirationWithOffset(new Date().getTime() + 5 * 60_000),
        };

        // Tested to last no more than 5 minutes
        const expire = 5 * 60;
        return {
            dataToStore: token,
            expire,
        };
    };

    private getExpirationWithOffset(expiration: number, secondsOffset = 10): number {
        const date = new Date(expiration);
        date.setSeconds(date.getSeconds() - secondsOffset);
        return date.getTime();
    }

}

interface IAccess {
    accessToken: string;
    refreshToken: string;
    expiration: number;
}
