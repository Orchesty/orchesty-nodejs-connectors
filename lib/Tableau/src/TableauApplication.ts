import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { EXPIRES } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';

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

    public constructor(private readonly sender: CurlSender, private readonly dbClient: DatabaseClient) {
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
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFODc2MkQ7fQoJLnN0MXtmaWxsOiNDNzIwMzc7fQoJLnN0MntmaWxsOiM1Qjg3OUI7fQoJLnN0M3tmaWxsOiM1QzY2OTI7fQoJLnN0NHtmaWxsOiNFQjkxMjk7fQoJLnN0NXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMxRjQ1N0U7fQoJLnN0NntmaWxsOiM3MTk5QTY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00Ny4yLDY3LjVoNS41VjUyLjRoMTMuOHYtNS40SDUyLjdWMzJoLTUuNXYxNS4xSDMzLjZ2NS40aDEzLjZWNjcuNXoiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMS44LDg5LjNoNC42Vjc1LjloMTIuM3YtNC4ySDI2LjVWNTguMWgtNC42djEzLjZIOS42djQuMmgxMi4zTDIxLjgsODkuM3oiLz4KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik03My40LDQwLjloNC42VjI3LjRoMTIuNHYtNEg3OC4xVjkuOGgtNC42djEzLjZINjEuMXY0aDEyLjNWNDAuOXoiLz4KCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik00OCw5OS45aDR2LTkuNmg4LjV2LTMuNUg1MnYtOS42aC00djkuNmgtOC4zdjMuNUg0OFY5OS45eiIvPgoJPHBhdGggY2xhc3M9InN0NCIgZD0iTTIyLDQwLjloNC4zVjI3LjNoMTIuNHYtMy45SDI2LjNWOS44SDIydjEzLjZIOS42djMuOUgyMlY0MC45eiIvPgoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTg3LjUsNjFoNHYtOS40aDguNXYtMy43aC04LjV2LTkuNGgtNHY5LjRoLTguM3YzLjdoOC4zVjYxeiIvPgoJPHBhdGggY2xhc3M9InN0NSIgZD0iTTczLjQsODkuM2g0LjZWNzUuOWgxMi40di00LjJINzguMVY1OC4xaC00LjZ2MTMuNkg2MS4xdjQuMmgxMi4zVjg5LjN6Ii8+Cgk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJNNTkuOCwxMi4yVjkuM2gtOC4zVjAuMWgtM3Y5LjJoLTguM3YyLjloOC4zdjkuMmgzdi05LjJINTkuOHogTTguMiw2MC4zaDN2LTkuMmg4LjN2LTIuOWgtOC4zdi05LjFoLTN2OS4xSDAKCQl2M2w4LjMtMC4yVjYwLjN6Ii8+CjwvZz4KPC9zdmc+Cg==';
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
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
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
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[TOKEN] && authorizationForm?.[TOKEN_NAME] && authorizationForm?.[CONTENT_URL];
    }

    public async setSettings(applicationInstall: ApplicationInstall, dto: AProcessDto): Promise<ApplicationInstall> {
        const { siteId, token } = await this.getToken(applicationInstall, dto);
        const date = new Date();
        date.setDate(date.getDate() + MAX_EXPIRE);
        applicationInstall.setExpires(date);
        applicationInstall.addSettings({ [CoreFormsEnum.AUTHORIZATION_FORM]: { [TOKEN]: token } });
        applicationInstall.addSettings({ [CoreFormsEnum.AUTHORIZATION_FORM]: { [SITE_ID]: siteId } });

        return applicationInstall;
    }

    private getUrl(applicationInstall: ApplicationInstall): string {
        const prefix = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PREFIX_SITE];
        if (prefix) {
            return BASE_URL.replace('replace_me', prefix);
        }
        throw new Error('Missing site prefix');
    }

    private async getOrRefreshToken(applicationInstall: ApplicationInstall, dto: AProcessDto): Promise<string> {
        let appInstall = applicationInstall;
        const expires = appInstall.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[EXPIRES];
        if (!expires || new Date(expires) < new Date()) {
            appInstall = await this.setSettings(appInstall, dto);
            await this.dbClient.getApplicationRepository().update(appInstall);
        }

        return appInstall.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM]?.[TOKEN];
    }

    private async getToken(
        applicationInstall: ApplicationInstall,
        processDto: AProcessDto,
    ): Promise<{ token: string; siteId: string }> {
        const form = applicationInstall.getSettings()?.[CoreFormsEnum.AUTHORIZATION_FORM];
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
            {
                [CommonHeaders.ACCEPT]: JSON_TYPE,
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            },
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
