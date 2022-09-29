import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { EXPIRES } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import MongoDbClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Mongodb/Client';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import { Headers } from 'node-fetch';

export const NAME = 'tableau';
export const BASE_URL = 'https://replace_me.online.tableau.com/api/3.14/';
export const PREFIX_SITE = 'prefix_site';
export const TOKEN_NAME = 'token_name';
export const MAX_EXPIRE = 14;
export const X_TABLEAU_AUTH = 'X-Tableau-Auth';
export const CONTENT_URL = 'content_url';
export const SITE_ID = 'site_id';
export const CLIENT_ID = 'client_id';
export const TOKEN_SECRET = 'token_secret';
export const TOKEN = 'token';

export default class TableauApplication extends ABasicApplication {

    public constructor(private readonly sender: CurlSender, private readonly dbClient: MongoDbClient) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Tableau';
    }

    public getDescription(): string {
        return 'Global organizations unleash the power of their most valuable assets: their data and their people';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRTg3NjJEO30KCS5zdDF7ZmlsbDojQzcyMDM3O30KCS5zdDJ7ZmlsbDojNUI4NzlCO30KCS5zdDN7ZmlsbDojNUM2NjkyO30KCS5zdDR7ZmlsbDojRUI5MTI5O30KCS5zdDV7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMUY0NTdFO30KCS5zdDZ7ZmlsbDojNzE5OUE2O30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzAuOSwxMDAuN2g4LjFWNzguNmgyMC40di03LjlINzkuMVY0OC41aC04LjF2MjIuMkg1MC43djcuOWgyMC4yVjEwMC43eiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMzLjIsMTMyLjhoNi45di0xOS43aDE4LjJ2LTYuMkg0MC4xdi0yMGgtNi45djIwSDE1djYuMmgxOC4yVjEzMi44eiIvPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwOS45LDYxLjZoNi45VjQxLjloMTguNVYzNmgtMTguNVYxNmgtNi45djIwSDkxLjZ2NS45aDE4LjJWNjEuNnoiLz4KCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik03Mi4yLDE0OC4zaDUuOXYtMTRoMTIuNnYtNS4ySDc4LjF2LTE0aC01Ljl2MTRINTkuOHY1LjJoMTIuM1YxNDguM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0zMy41LDYxLjZoNi40di0yMGgxOC41VjM2SDM5LjlWMTZoLTYuNHYyMEgxNXY1LjdoMTguNVY2MS42eiIvPgoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTEzMC44LDkxLjFoNS45Vjc3LjNoMTIuNnYtNS40aC0xMi42VjU4LjFoLTUuOXYxMy44aC0xMi4zdjUuNGgxMi4zVjkxLjF6Ii8+Cgk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNMTA5LjksMTMyLjhoNi45di0xOS43aDE4LjV2LTYuMmgtMTguNXYtMjBoLTYuOXYyMEg5MS42djYuMmgxOC4yVjEzMi44eiIvPgoJPHBhdGggY2xhc3M9InN0NiIgZD0iTTg5LjcsMTkuNHYtNC4ySDc3LjNWMS43aC00LjR2MTMuNkg2MC42djQuMmgxMi4zVjMzaDQuNFYxOS40SDg5Ljd6IE0xMyw5MC4yaDQuNFY3Ni42aDEyLjN2LTQuMkgxNy41VjU5LjEKCQlIMTN2MTMuM0gwLjd2NC40TDEzLDc2LjZWOTAuMnoiLz4KPC9nPgo8L3N2Zz4K';
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        const token = await this.getOrRefreshToken(applicationInstall, dto);
        const url = `${this.getUrl(applicationInstall)}${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [X_TABLEAU_AUTH]: token,
        });
        if (data) {
            request.setJsonBody(data);
        }
        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(
                FieldType.TEXT,
                PREFIX_SITE,
                'Prefix site (https://[this value].online.tableau.com/)',
                null,
                true,
            ))
            .addField(new Field(FieldType.TEXT, TOKEN, 'Token', null, true))
            .addField(new Field(FieldType.TEXT, TOKEN_NAME, 'Token name', null, true))
            .addField(new Field(FieldType.TEXT, CONTENT_URL, 'Content url', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[TOKEN] && authorizationForm?.[TOKEN_NAME] && authorizationForm?.[CONTENT_URL];
    }

    public async setSettings(applicationInstall: ApplicationInstall, dto: AProcessDto): Promise<ApplicationInstall> {
        const { siteId, token } = await this.getToken(applicationInstall, dto);
        const date = new Date();
        date.setDate(date.getDate() + MAX_EXPIRE);
        applicationInstall.setExpires(date);
        applicationInstall.addSettings({ [AUTHORIZATION_FORM]: { [TOKEN]: token } });
        applicationInstall.addSettings({ [AUTHORIZATION_FORM]: { [SITE_ID]: siteId } });

        return applicationInstall;
    }

    private getUrl(applicationInstall: ApplicationInstall): string {
        const prefix = applicationInstall.getSettings()[AUTHORIZATION_FORM][PREFIX_SITE];
        if (prefix) {
            return BASE_URL.replace('replace_me', prefix);
        }
        throw new Error('Missing site prefix');
    }

    private async getOrRefreshToken(applicationInstall: ApplicationInstall, dto: AProcessDto): Promise<string> {
        let appInstall = applicationInstall;
        const expires = appInstall.getSettings()?.[AUTHORIZATION_FORM]?.[EXPIRES];
        if (!expires || expires > new Date()) {
            appInstall = await this.setSettings(appInstall, dto);
            await (await this.dbClient.getApplicationRepository()).upsert(appInstall);
        }

        return appInstall.getSettings()?.[AUTHORIZATION_FORM]?.[TOKEN];
    }

    private async getToken(
        applicationInstall: ApplicationInstall,
        processDto: AProcessDto,
    ): Promise<{ token: string; siteId: string }> {
        const headers = new Headers({
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        });
        const form = applicationInstall.getSettings()?.[AUTHORIZATION_FORM];
        checkParams(form, [TOKEN_NAME, TOKEN_SECRET, PREFIX_SITE]);
        const data = {
            credentials: {
                personalAccessTokenName: form[TOKEN_NAME],
                personalAccessTokenSecret: form[TOKEN_SECRET],
                site: {
                    contentUrl: form[CONTENT_URL],
                },
            },
        };

        const request = new RequestDto(
            `${this.getUrl(applicationInstall)}auth/signin`,
            HttpMethods.POST,
            processDto,
            JSON.stringify(data),
            headers,
        );

        const resp = await this.sender.send(request);
        const credentials = (resp.getJsonBody() as {
            credentials: { token: string; site: { id: string } }; })?.credentials;
        if (!credentials) {
            throw new Error(`Token was not received. Response body: [${resp.getBody()}]`);
        }

        return { token: credentials.token, siteId: credentials.site.id };
    }

}
