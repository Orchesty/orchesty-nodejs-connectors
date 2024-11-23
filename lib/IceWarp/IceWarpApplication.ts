import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import CacheService, { ICacheCallback } from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { decode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

/* eslint-disable prefer-named-capture-group */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-explicit-any */

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const ICE_WARP_APPLICATION = 'ice-warp';

export default class IceWarpApplication extends ABasicApplication {

    public constructor(
        protected readonly cache: CacheService,
        protected readonly redis: Redis,
        protected readonly curl: CurlSender,
    ) {
        super();
    }

    public getName(): string {
        return ICE_WARP_APPLICATION;
    }

    public getPublicName(): string {
        return 'Ice Warp Application';
    }

    public getDescription(): string {
        return 'Ice Warp Application description';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings');
        form.addField(new Field(FieldType.TEXT, ACCESS_TOKEN, 'Access token', undefined, true));
        form.addField(new Field(FieldType.TEXT, REFRESH_TOKEN, 'Refresh token', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[ACCESS_TOKEN] && authorizationForm?.[REFRESH_TOKEN];
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        const host = this.getHost(applicationInstall);
        const token = await this.getXoxpToken(dto, applicationInstall);

        let uri = `${host}${url ?? ''}`;
        if (uri.includes('?')) {
            uri = `${uri}&token=${token}`;
        } else {
            uri = `${uri}?token=${token}`;
        }

        const request = new RequestDto(uri, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    protected async getXoxpToken(dto: AProcessDto, applicationInstall: ApplicationInstall): Promise<string> {
        const xoxpKey = this.xoxpIdKey(dto);
        const xoxpToken = await this.redis.get(xoxpKey);
        if (xoxpToken?.length) {
            return xoxpToken;
        }

        const accessKey = this.accessIdKey(dto);
        const accessToken = await this.redis.get(accessKey) ?? await this.getAccessToken(dto, applicationInstall);

        const request = new RequestDto(
            `${this.getHost(applicationInstall)}/icewarpapi/`,
            HttpMethods.POST,
            dto,
            `<iq uid="123456" type="set" format="xml"><query xmlns="admin:iq:rpc"><commandname>AuthenticateJWT</commandname><commandparams><token>${accessToken}</token></commandparams></query></iq>`,
            {
                'Content-Type': 'text/xml',
                Accept: 'text/xml',
            },
        );
        // eslint-disable-next-line
        const redis = this.redis;
        // eslint-disable-next-line
        const curl = this.curl;
        const sessionKey = this.sessionIdKey(dto);

        return this.cache.entryWithLock(
            this.xoxpIdKey(dto),
            this.xoxpIdLock(dto),
            request,
            async (resp): Promise<ICacheCallback<string>> => {
                const sessionId = [...resp.getBody()?.matchAll(/sid="(.+?)"/g)]?.[0]?.groups?.[1] || '';

                const requestXoxp = new RequestDto(
                    `${this.getHost(applicationInstall)}/icewarpapi/`,
                    HttpMethods.POST,
                    dto,
                    `<iq uid="123456" sid="${sessionId}" format="text/xml"><query xmlns="admin:iq:rpc"><commandname>AuthenticateTeamChatApi</commandname></query></iq>`,
                    {
                        'Content-Type': 'text/xml',
                        Accept: 'text/xml',
                    },
                );

                const expire = 23 * 60 * 60;
                const res = await curl.send(requestXoxp);

                const xoxp = [...res.getBody()?.matchAll(/<result>(.+?)<\/result>/g)]?.[0]?.groups?.[1] || '';
                await redis.set(sessionKey, xoxp, expire);

                return {
                    expire,
                    dataToStore: xoxp,
                };
            },
        );
    }

    protected async getAccessToken(dto: AProcessDto, applicationInstall: ApplicationInstall): Promise<string> {
        const accessKey = this.accessIdKey(dto);
        const accessToken = await this.redis.get(accessKey);
        if (accessToken?.length) {
            return accessToken;
        }

        const refreshKey = this.refreshIdKey(dto);
        const refreshToken = await this.redis.get(refreshKey) ?? applicationInstall.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[REFRESH_TOKEN] ?? '';

        const request = new RequestDto(
            `${this.getHost(applicationInstall)}/icewarpapi/`,
            HttpMethods.POST,
            dto,
            `<iq uid="123456" type="set" format="xml"><query xmlns="admin:iq:rpc" ><commandname>RefreshJWTToken</commandname><commandparams><refreshtoken>${refreshToken}</refreshtoken></commandparams></query></iq>`,
            {
                'Content-Type': 'text/xml',
                Accept: 'text/xml',
            },
        );
        // eslint-disable-next-line
        const redis = this.redis;

        return this.cache.entryWithLock(
            this.accessIdKey(dto),
            this.accessIdLock(dto),
            request,
            async (resp): Promise<ICacheCallback<string>> => {
                const accessToken = [...resp.getBody()?.matchAll(/<accesstoken>(.+?)<\/accesstoken>/g)]?.[0]?.groups?.[1] || '';
                const refreshToken = [...resp.getBody()?.matchAll(/<refreshtoken>(.+?)<\/refreshtoken>/g)]?.[0]?.groups?.[1] || '';

                const tokenData = this.getTokenData(accessToken);
                await redis.set(refreshKey, refreshToken);

                return {
                    expire: Math.floor(((tokenData.exp * 1000) - (new Date().getTime())) * 0.001) - 60,
                    dataToStore: accessToken,
                };
            },
        );
    }

    protected sessionIdKey(dto: AProcessDto): string {
        return `icewarp-session-${dto.getUser()}`;
    }

    protected xoxpIdLock(dto: AProcessDto): string {
        return `icewarp-session-${dto.getUser()}-lock`;
    }

    protected accessIdKey(dto: AProcessDto): string {
        return `icewarp-access-${dto.getUser()}`;
    }

    protected xoxpIdKey(dto: AProcessDto): string {
        return `icewarp-xoxp-${dto.getUser()}`;
    }

    protected refreshIdKey(dto: AProcessDto): string {
        return `icewarp-refresh-${dto.getUser()}`;
    }

    protected accessIdLock(dto: AProcessDto): string {
        return `icewarp-access-${dto.getUser()}-lock`;
    }

    protected getHost(appInstall: ApplicationInstall): string {
        const authForm = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        const tokenData = this.getTokenData(authForm[ACCESS_TOKEN]);

        return `https://${tokenData.iw_host}`;
    }

    private getTokenData(token: string): Record<string, any> {
        const part = token.split('.')?.[1] ?? '';
        const decoded = decode(part, 'base64');

        return JSON.parse(decoded || '{}');
    }

}
