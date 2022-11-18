import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { EXPIRES, OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import ScopeSeparatorEnum from '@orchesty/nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { decode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BodyInit } from 'node-fetch';

export const NAME = 'xero';
export const XERO_TENANT_ID = 'Xero-Tenant-Id';
export const XERO_CONNECTION_ID = 'xero-connection_id';
export default class XeroApplication extends AOAuth2Application {

    public constructor(provider: OAuth2Provider, private readonly curlSender: CurlSender) {
        super(provider);
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Xero';
    }

    public getDescription(): string {
        return 'Global cloud-based easy-to-use accounting software that connects people with the right numbers anytime, anywhere, on any device';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIKCSBpZD0ic3ZnNDQ0MyIgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4wIHIxNTI5OSIgc29kaXBvZGk6ZG9jbmFtZT0ieGVyby5zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIKCSBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzFBQjRENzt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxkZWZzPgoJCgkJPGlua3NjYXBlOnBlcnNwZWN0aXZlICBpZD0icGVyc3BlY3RpdmU4NyIgaW5rc2NhcGU6cGVyc3AzZC1vcmlnaW49IjM3Mi4wNDcyMyA6IDM1MC43ODczNiA6IDEiIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDYgOiAxIiBpbmtzY2FwZTp2cF95PSIwIDogOTk5Ljk5OTk0IDogMCIgaW5rc2NhcGU6dnBfej0iNzQ0LjA5NDQ5IDogNTI2LjE4MTA2IDogMSIgc29kaXBvZGk6dHlwZT0iaW5rc2NhcGU6cGVyc3AzZCI+CgkJPC9pbmtzY2FwZTpwZXJzcGVjdGl2ZT4KPC9kZWZzPgo8c29kaXBvZGk6bmFtZWR2aWV3ICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgYm9yZGVyb3BhY2l0eT0iMS4wIiBmaXQtbWFyZ2luLWJvdHRvbT0iMCIgZml0LW1hcmdpbi1sZWZ0PSIwIiBmaXQtbWFyZ2luLXJpZ2h0PSIwIiBmaXQtbWFyZ2luLXRvcD0iMCIgaWQ9ImJhc2UiIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIgaW5rc2NhcGU6Y3g9IjM5MS45MDk5OSIgaW5rc2NhcGU6Y3k9IjM5MS45MDk5OSIgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIiBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIiBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3NDQiIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgaW5rc2NhcGU6d2luZG93LXg9Ii00IiBpbmtzY2FwZTp3aW5kb3cteT0iLTQiIGlua3NjYXBlOnpvb209IjAuNjgwMDAzMDgiIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIgc2hvd2dyaWQ9ImZhbHNlIiB1bml0cz0icHgiPgoJPC9zb2RpcG9kaTpuYW1lZHZpZXc+CjxnIGlkPSJnMTQiPgoJPHBhdGggaWQ9InBhdGgyMCIgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgY2xhc3M9InN0MCIgZD0iTTUwLDk5LjljMjcuNiwwLDQ5LjktMjIuNCw0OS45LTQ5LjlDOTkuOSwyMi40LDc3LjYsMCw1MCwwCgkJUzAuMSwyMi40LDAuMSw1MEMwLjEsNzcuNSwyMi40LDk5LjksNTAsOTkuOSIvPgoJPHBhdGggaWQ9InBhdGgyMiIgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgY2xhc3M9InN0MSIgZD0iTTI0LDQ5LjhsOC41LTguNWMwLjMtMC4zLDAuNC0wLjcsMC40LTEuMQoJCWMwLTAuOC0wLjctMS41LTEuNS0xLjVjLTAuNCwwLTAuOCwwLjItMS4xLDAuNWMwLDAtOC41LDguNS04LjUsOC41bC04LjYtOC41Yy0wLjMtMC4zLTAuNy0wLjQtMS4xLTAuNGMtMC44LDAtMS41LDAuNy0xLjUsMS41CgkJYzAsMC40LDAuMiwwLjgsMC41LDEuMWw4LjUsOC41bC04LjUsOC41Yy0wLjMsMC4zLTAuNSwwLjctMC41LDEuMWMwLDAuOCwwLjcsMS41LDEuNSwxLjVjMC40LDAsMC44LTAuMiwxLjEtMC40bDguNS04LjVsOC41LDguNQoJCWMwLjMsMC4zLDAuNywwLjUsMS4xLDAuNWMwLjgsMCwxLjUtMC43LDEuNS0xLjVjMC0wLjQtMC4yLTAuOC0wLjQtMS4xTDI0LDQ5Ljh6Ii8+Cgk8cGF0aCBpZD0icGF0aDI0IiBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiBjbGFzcz0ic3QxIiBkPSJNNzQuNiw0OS44YzAsMS41LDEuMiwyLjgsMi44LDIuOGMxLjUsMCwyLjgtMS4yLDIuOC0yLjgKCQljMC0xLjUtMS4yLTIuOC0yLjgtMi44Qzc1LjksNDcsNzQuNiw0OC4zLDc0LjYsNDkuOCIvPgoJPHBhdGggaWQ9InBhdGgyNiIgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgY2xhc3M9InN0MSIgZD0iTTY5LjQsNDkuOGMwLTQuNCwzLjYtOCw4LThjNC40LDAsOCwzLjYsOCw4YzAsNC40LTMuNiw4LTgsOAoJCUM3Myw1Ny44LDY5LjQsNTQuMiw2OS40LDQ5LjggTTY2LjIsNDkuOGMwLDYuMiw1LDExLjIsMTEuMiwxMS4yYzYuMiwwLDExLjItNSwxMS4yLTExLjJjMC02LjItNS0xMS4yLTExLjItMTEuMgoJCUM3MS4yLDM4LjYsNjYuMiw0My42LDY2LjIsNDkuOCIvPgoJPHBhdGggaWQ9InBhdGgyOCIgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgY2xhc3M9InN0MSIgZD0iTTY1LjQsMzguOGwtMC41LDBjLTEuNCwwLTIuOCwwLjQtMy45LDEuMwoJCWMtMC4xLTAuNy0wLjgtMS4yLTEuNS0xLjJjLTAuOCwwLTEuNSwwLjctMS41LDEuNWMwLDAsMCwxOC45LDAsMTguOWMwLDAuOCwwLjcsMS41LDEuNSwxLjVjMC44LDAsMS41LTAuNywxLjUtMS41CgkJYzAsMCwwLTExLjYsMC0xMS42YzAtMy45LDAuNC01LjQsMy43LTUuOGMwLjMsMCwwLjYsMCwwLjYsMGMwLjksMCwxLjUtMC43LDEuNS0xLjVDNjYuOSwzOS41LDY2LjMsMzguOCw2NS40LDM4LjgiLz4KCTxwYXRoIGlkPSJwYXRoMzAiIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIGNsYXNzPSJzdDEiIGQ9Ik0zNi4xLDQ4YzAsMCwwLTAuMSwwLTAuMWMwLjktMy41LDQuMS02LjEsNy44LTYuMQoJCWMzLjgsMCw3LDIuNyw3LjksNi4ySDM2LjF6IE01NC45LDQ3LjdjLTAuNy0zLjEtMi40LTUuNy01LTcuM2MtMy44LTIuNC04LjgtMi4zLTEyLjUsMC4zYy0zLDIuMS00LjcsNS42LTQuNyw5LjIKCQljMCwwLjksMC4xLDEuOCwwLjMsMi43YzEuMSw0LjQsNC45LDcuOCw5LjUsOC40YzEuNCwwLjIsMi43LDAuMSw0LTAuM2MxLjItMC4zLDIuMy0wLjgsMy4zLTEuNGMxLjEtMC43LDItMS42LDIuOS0yLjcKCQljMCwwLDAsMCwwLjEtMC4xYzAuNi0wLjgsMC41LTEuOC0wLjItMi4zYy0wLjYtMC40LTEuNS0wLjYtMi4zLDAuM2MtMC4yLDAuMi0wLjMsMC41LTAuNSwwLjdjLTAuNiwwLjctMS4zLDEuMy0yLjIsMS44CgkJYy0xLjEsMC42LTIuNCwwLjktMy44LDAuOWMtNC40LDAtNi44LTMuMS03LjctNS40Yy0wLjEtMC40LTAuMy0wLjgtMC4zLTEuM2MwLTAuMSwwLTAuMiwwLTAuMmMwLjksMCwxNS45LDAsMTUuOSwwCgkJQzU0LjEsNTEsNTUuMyw0OS40LDU0LjksNDcuNyIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getAuthUrl(): string {
        return 'https://login.xero.com/identity/connect/authorize';
    }

    public getTokenUrl(): string {
        return 'https://identity.xero.com/connect/token';
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: BodyInit,
    ): Promise<RequestDto> {
        const url = uri?.startsWith('http') ? uri : `https://api.xero.com/api.xro/2.0/${uri}`;
        const request = new RequestDto(url ?? '', method, dto);
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        const id = authorizationForm[XERO_TENANT_ID];

        const nowDate = new Date().getTime();
        const expiresDate = new Date(
            authorizationForm?.[TOKEN]?.[EXPIRES],
        ).getTime();

        if (expiresDate < nowDate - 5 * 1000) {
            await this.refreshAuthorization(applicationInstall);
            const settings = applicationInstall.getSettings();
            if (settings) {
                await this.saveApplicationForms(applicationInstall, settings);
            }
        }

        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [XERO_TENANT_ID]: id,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
        });

        if (data) {
            if (typeof data === 'string' || data instanceof FormData) {
                request.setBody(data);
            } else {
                request.setJsonBody(data);
            }
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET]
            && authorizationForm?.[XERO_TENANT_ID]
            && authorizationForm?.[XERO_CONNECTION_ID];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [
            'accounting.contacts',
            'accounting.settings',
            'email',
            'profile',
            'openid',
            'accounting.transactions',
            'offline_access',
        ];
    }

    public async setAuthorizationToken(
        applicationInstall: ApplicationInstall,
        token: Record<string, string>,
    ): Promise<void> {
        await super.setAuthorizationToken(applicationInstall, token);

        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        if (!authorizationForm[XERO_TENANT_ID] || !authorizationForm[XERO_CONNECTION_ID]) {
            try {
                const parsedJWT = JSON.parse(
                    decode(authorizationForm[TOKEN].accessToken.split('.')[1]),
                ) as unknown as { authentication_event_id: string };

                const requestDto = await this.getRequestDto(
                    new ProcessDto(),
                    applicationInstall,
                    HttpMethods.GET,
                    `https://api.xero.com/connections?authEventId=${parsedJWT.authentication_event_id}`,
                );
                const resp = await this.curlSender.send<[{ tenantId: string; id: string }]>(requestDto, [200]);

                const respData = resp.getJsonBody();

                if (!respData.length) {
                    throw Error(`Response returned none connection for specific authEventId=[${parsedJWT.authentication_event_id}]`);
                }

                if (respData.length > 1) {
                    throw Error(`Response returned more then one connection for specific authEventId=[${parsedJWT.authentication_event_id}]`);
                }

                applicationInstall.addSettings(
                    {
                        [CoreFormsEnum.AUTHORIZATION_FORM]: {
                            [XERO_TENANT_ID]: respData[0].tenantId,
                            [XERO_CONNECTION_ID]: respData[0].id,
                        },
                    },
                );
            } catch (e) {
                if (e instanceof Error) {
                    logger.error(e.message, {}, true);
                } else {
                    throw e;
                }
            }
        }
    }

    protected getScopesSeparator(): string {
        return ScopeSeparatorEnum.SPACE;
    }

    protected getProviderCustomOptions(): Record<string, unknown> {
        return {
            options: {
                authorizationMethod: 'header',
            },
        };
    }

}
