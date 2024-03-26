import {
    GROUP_TIME,
    GROUP_VALUE,
    TIME,
    USE_LIMIT,
    VALUE,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Webhook from '@orchesty/nodejs-sdk/dist/lib/Application/Database/Webhook';
import WebhookRepository from '@orchesty/nodejs-sdk/dist/lib/Application/Database/WebhookRepository';
import OAuth2Dto from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/Dto/OAuth2Dto';
import { ACCESS_TOKEN, OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import ScopeSeparatorEnum from '@orchesty/nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CacheService, { ICacheCallback } from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import logger from '@orchesty/nodejs-sdk/dist/lib/Logger/Logger';
import DatabaseClient from '@orchesty/nodejs-sdk/dist/lib/Storage/Database/Client';
import TopologyRunner from '@orchesty/nodejs-sdk/dist/lib/Topology/TopologyRunner';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { defaultRanges } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods, parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import ABaseShoptet, { BASE_URL } from './ABaseShoptet';

export const NAME = 'shoptet';
export const ESHOP_ID = 'eshopId';
export const PIN = 'pin';
export const APPLINTH_EVENT_INSTALL = 'applinth_enduser_app_install';
export const APPLINTH_EVENT_UNINSTALL = 'applinth_enduser_app_uninstall';

export default abstract class PluginShoptetApplication extends ABaseShoptet {

    protected abstract shoptetHost: string;

    protected abstract shoptetClientId: string;

    protected abstract shoptetClientSecret: string;

    protected abstract shoptetOAuth2RedirectUrl: string;

    protected abstract defaultAppName: string;

    protected authorizationHeader = 'Shoptet-Access-Token';

    protected shoptetLocker = 'locker_shoptet';

    protected isInstallable = false;

    public constructor(
        private readonly db: DatabaseClient,
        private readonly cache: CacheService,
        private readonly sender: CurlSender,
        private readonly oauth2Provider: OAuth2Provider,
        private readonly topologyRunner: TopologyRunner,
    ) {
        super();
    }

    public getName(): string {
        return 'shoptet';
    }

    public getDescription(): string {
        return 'Czech largest e-commerce platform provider. It offers complete technical solutions for online shop owners';
    }

    public getPublicName(): string {
        return 'Shoptet';
    }

    public getLogo(): string | null {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNBN0M2MjU7fQoJLnN0MXtmaWxsOiM2RDk2M0M7fQoJLnN0MntmaWxsOiNGNkEwMkQ7fQoJLnN0M3tmaWxsOiMyQ0FFRTU7fQoJLnN0NHtmaWxsOiNBNkM2MjQ7fQo8L3N0eWxlPgo8ZyBpZD0iZVQ3d3J4LnRpZiI+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ5LjcsNjguNGMwLTAuNC0wLjEtMC42LTAuMS0wLjhjLTAuMS0wLjcsMC40LTEuNi0xLTEuNmMtMS4zLDAtMC45LDAuOS0wLjksMS42YzAsNS44LDAsMTEuNSwwLDE3LjMKCQkJCWMwLDAuNy0wLjIsMS41LDEsMS41YzEuMywwLDAuOS0wLjksMC45LTEuNWMwLTIsMC0zLjksMC02LjFjNC4zLDMuNCw4LjcsMy4zLDExLjYsMGMyLjgtMy4zLDIuNi04LjEtMC41LTExCgkJCQlDNTcuNiw2NC44LDUzLjIsNjUsNDkuNyw2OC40eiBNNTUuMiw3OS40Yy0zLjMsMC01LjgtMi41LTUuNy01LjljMC0zLjQsMi41LTUuOSw1LjgtNS45YzMuMywwLDUuOSwyLjcsNS45LDYKCQkJCUM2MS4xLDc2LjksNTguNCw3OS41LDU1LjIsNzkuNHoiLz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTgyLjMsNjUuOGMtMy4zLTAuNi02LjIsMC44LTgsMy43Yy0yLjIsMy42LTEsOC42LDIuNiwxMC43YzMuNiwyLjIsOC41LDEuMSwxMC43LTIuNAoJCQkJYzAuMy0wLjUsMC44LTAuOS0wLjEtMS40Yy0wLjYtMC4zLTEuMi0wLjUtMS42LDAuM2MtMC4xLDAuMy0wLjQsMC41LTAuNiwwLjhjLTEuNywxLjgtMy45LDIuNC02LjIsMS43Yy0yLjItMC43LTMuMy0yLjMtMy44LTQuNQoJCQkJYy0wLjItMC44LDAtMSwwLjgtMWMxLjksMCwzLjgsMCw1LjgsMGMxLjcsMCwzLjQtMC4xLDUuMSwwYzEuNSwwLjEsMS43LTAuNSwxLjUtMS43Qzg3LjksNjguNyw4NS42LDY2LjQsODIuMyw2NS44eiBNODUuNiw3MgoJCQkJYy0zLjMsMC02LjYsMC05LjksMGMwLjUtMi42LDIuMy00LjIsNC45LTQuNGMyLjQtMC4yLDQuOCwxLjMsNS42LDMuNEM4Ni40LDcxLjcsODYuNCw3Miw4NS42LDcyeiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzcuNCw2NS43Yy00LjQsMC03LjgsMy40LTcuOCw3LjljMCw0LjQsMy4zLDcuNyw3LjgsNy43YzQuNSwwLDcuOC0zLjMsNy44LTcuOAoJCQkJQzQ1LjEsNjkuMSw0MS43LDY1LjcsMzcuNCw2NS43eiBNMzcuNCw3OS40Yy0zLjMsMC01LjgtMi42LTUuNy01LjljMC4xLTMuMiwyLjctNS45LDUuOC01LjhjMy4yLDAsNS44LDIuOCw1LjcsNgoJCQkJQzQzLjEsNzcsNDAuNiw3OS40LDM3LjQsNzkuNHoiLz4KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI3LjIsNzAuNGMtMC40LTMuMy0zLjMtNS4yLTYuNi00LjZjLTEuNiwwLjMtMi45LDEuMi00LjMsMi43YzAtMi41LDAtNC43LDAtN2MwLTAuNywwLjEtMS4yLTAuOS0xLjIKCQkJCWMtMC45LDAtMSwwLjQtMSwxLjFjMCw2LjEsMCwxMi4zLDAsMTguNGMwLDEsMC40LDEuMSwxLjIsMS4xYzEsMCwwLjctMC43LDAuNy0xLjJjMC4xLTIuNy0wLjMtNS40LDAuMy04LjEKCQkJCWMwLjYtMi42LDIuOS00LjMsNS41LTQuMWMyLjEsMC4yLDMuMiwxLjcsMy4zLDQuN2MwLDEsMCwyLDAsM2MwLDEuNiwwLDMuMiwwLDQuOGMwLDAuNywwLjMsMC45LDEsMC45YzAuNiwwLDEuMSwwLDEuMS0wLjkKCQkJCUMyNy4zLDc2LjgsMjcuNiw3My42LDI3LjIsNzAuNHoiLz4KCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwLjEsNzMuNGMtMS4xLTAuOC0yLjUtMS4zLTMuNS0yLjJjLTAuOC0wLjctMS4yLTEuNi0wLjYtMi41YzAuNi0xLDEuNS0xLjMsMi42LTFjMC43LDAuMiwxLjMsMC41LDEuOCwxCgkJCQljMC41LDAuNSwwLjksMC4xLDEuMi0wLjNjMC4zLTAuMywwLjYtMC41LDAuMi0xQzEwLjYsNjYsOCw2NS4zLDYuMyw2NmMtMS43LDAuNy0yLjYsMi4yLTIuNCw0LjJjMC4yLDEuNiwxLjIsMi41LDIuNSwzLjMKCQkJCWMwLjksMC42LDIsMS4xLDIuOSwxLjdjMC44LDAuNSwxLjIsMS40LDAuOSwyLjNjLTAuMywxLjEtMS4xLDEuNi0yLjIsMS44Yy0xLjEsMC4yLTIuMS0wLjMtMi45LTFjLTAuNS0wLjUtMC44LTAuNC0xLjMsMC4xCgkJCQljLTAuNCwwLjUtMC43LDAuOSwwLDEuNGMxLjEsMC45LDIuMywxLjUsMy42LDEuNGMyLjQsMCw0LTEuMSw0LjYtM0MxMi41LDc2LjMsMTEuOSw3NC43LDEwLjEsNzMuNHoiLz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcxLjEsNjZjLTEuNiwwLjMtMi4xLTAuNC0xLjktMS45YzAuMS0wLjgsMC0xLjcsMC0yLjVjMC4xLTAuOS0wLjMtMS4xLTEuMS0xYy0wLjctMC4xLTEsMC4xLTEsMC44CgkJCQljMCwxLjEtMC4xLDIuMSwwLDMuMmMwLjEsMS0wLjIsMS42LTEuNCwxLjRjLTAuNi0wLjEtMS4yLTAuMS0xLjIsMC45YzAsMSwwLjYsMSwxLjMsMC45YzEuMi0wLjIsMS40LDAuNCwxLjQsMS40CgkJCQljLTAuMSwzLjUsMCw3LDAsMTAuNGMwLDAuNi0wLjEsMS4yLDAuOSwxLjJjMC45LDAsMS4yLTAuMywxLjItMS4yYzAtMy40LDAtNi45LDAtMTAuM2MwLTEuMywwLjQtMS44LDEuNy0xLjYKCQkJCWMwLjUsMCwxLjIsMC40LDEuNC0wLjVDNzIuNCw2Ni4zLDcyLjEsNjUuOSw3MS4xLDY2eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOTYuOSw2NmMtMC43LDAtMS43LDAuNC0yLjEtMC4zYy0wLjMtMC42LTAuMS0xLjUtMC4xLTIuM2MwLTAuNiwwLTEuMywwLTEuOWMwLjEtMC44LTAuMy0wLjktMS0xCgkJCQljLTAuOCwwLTEsMC4zLTEsMWMwLDEtMC4xLDIsMCwzYzAuMSwxLjEtMC4yLDEuNi0xLjQsMS40Yy0wLjYtMC4xLTEuMy0wLjEtMS4zLDAuOWMwLDEsMC43LDEsMS4zLDAuOWMxLjItMC4xLDEuNCwwLjQsMS40LDEuNAoJCQkJYy0wLjEsMy41LDAsNywwLDEwLjVjMCwwLjctMC4xLDEuMywxLDEuMmMwLjksMC4yLDEtMC4zLDEtMS4xYzAtMy4xLDAtNi4yLDAtOS4zYzAtMi4zLDAtMi4zLDIuMi0yLjZjMC42LTAuMSwwLjgtMC4zLDAuOC0wLjkKCQkJCUM5Ny43LDY2LjQsOTcuNSw2Ni4xLDk2LjksNjZ6Ii8+CgkJPC9nPgoJPC9nPgoJPHJlY3QgeD0iNDAuOCIgeT0iMTIuOSIgY2xhc3M9InN0MiIgd2lkdGg9IjIxLjciIGhlaWdodD0iMjEuNyIvPgoJPHJlY3QgeD0iNTIuNSIgeT0iMzUuOCIgY2xhc3M9InN0MyIgd2lkdGg9IjIxLjciIGhlaWdodD0iMjEuNyIvPgoJPHJlY3QgeD0iMjkuNSIgeT0iMzUuOCIgY2xhc3M9InN0NCIgd2lkdGg9IjIxLjciIGhlaWdodD0iMjEuNyIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods | string,
        url?: string,
        data?: string,
    ): Promise<RequestDto> {
        const headers = {
            [this.authorizationHeader]: await this.getApiToken(applicationInstall, dto),
            [CommonHeaders.CONTENT_TYPE]: 'application/vnd.shoptet.v1.0',
        };

        return new RequestDto(
            url?.toLowerCase().includes('http') ? url : `${BASE_URL}/${url}`,
            parseHttpMethod(method),
            dto,
            data,
            headers,
        );
    }

    public async getApiToken(
        applicationInstall: ApplicationInstall,
        processDto: AProcessDto,
    ): Promise<string> {
        try {
            const cacheKey = `${
                this.getName()
            }ApiKey_${applicationInstall.getUser()}`;
            const lockKey = `${this.shoptetLocker}_${applicationInstall.getUser()}`;
            const settings = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM] ?? {};
            const accessToken = settings[TOKEN];
            const headers = {
                [CommonHeaders.AUTHORIZATION]: `Bearer ${accessToken}`,
            };
            const requestDto = new RequestDto(
                `${this.shoptetHost}/action/ApiOAuthServer/getAccessToken`,
                HttpMethods.GET,
                processDto,
                undefined,
                headers,
            );
            return await this.cache.entryWithLock(
                cacheKey,
                lockKey,
                requestDto,
                (dto): ICacheCallback<string> => {
                    const dtoBody = dto.getJsonBody() as {
                        /* eslint-disable @typescript-eslint/naming-convention */
                        expires_in: number;
                        access_token: string;
                        /* eslint-enable @typescript-eslint/naming-convention */
                    };
                    let expire = dtoBody.expires_in;
                    if (expire > 30) {
                        expire -= 30;
                    }
                    return {
                        expire,
                        dataToStore: dtoBody.access_token,
                    };
                },
                defaultRanges,
            );
        } catch (e) {
            if (e instanceof Error) {
                logger.error(e.message || 'Unknown error in ShoptetApplication.', processDto);
            }
            throw e;
        }
    }

    public async syncInstall(request: Request): Promise<unknown> {
        const { code } = JSON.parse(String(request.body));
        const newAppInstall = new ApplicationInstall().setName(this.getName()).setSettings({
            [CoreFormsEnum.AUTHORIZATION_FORM]: {
                [CLIENT_ID]: this.shoptetClientId,
                [CLIENT_SECRET]: this.shoptetClientSecret,
            },
        });

        const token = await this.getAccessToken(newAppInstall, code);
        const { eshopId } = token.others;

        const appInstallRepo = this.db.getApplicationRepository();
        let appInstall;
        try {
            appInstall = await this.getApplicationInstall(eshopId);
        } catch (e) {
            // Ignore not installed applications
        }
        const settings = {
            [CoreFormsEnum.AUTHORIZATION_FORM]: {
                [TOKEN]: token[ACCESS_TOKEN],
            },
            [CoreFormsEnum.LIMITER_FORM]: {
                [USE_LIMIT]: true,
                [VALUE]: '3',
                [TIME]: '1',
                [GROUP_VALUE]: '50',
                [GROUP_TIME]: '1',
            },
        };

        if (appInstall) {
            appInstall.addSettings(settings);
            await appInstallRepo.update(appInstall);
        } else {
            newAppInstall
                .addSettings(settings)
                .addNonEncryptedSettings({ [ESHOP_ID]: eshopId.toString() });
            await appInstallRepo.insert(newAppInstall);
        }

        return { [ESHOP_ID]: eshopId };
    }

    public async syncWebhook(request: Request): Promise<unknown> {
        const { event, eshopId } = JSON.parse(String(request.body));

        const appInstall = await this.getApplicationInstall(eshopId);
        const user = appInstall.getUser();
        const appInstallRepo = this.db.getApplicationRepository();
        const whRepo = this.db.getRepository(Webhook) as WebhookRepository;
        switch (event) {
            case 'addon:uninstall':
                await this.sendInstallUninstallWebhook(APPLINTH_EVENT_UNINSTALL, user);
                await whRepo.removeMany({ apps: [this.getName()], users: [user] });
                await appInstallRepo.remove(appInstall);
                break;
            case 'addon:suspend':
                appInstall.setEnabled(false);
                await appInstallRepo.update(appInstall);
                break;
            case 'addon:approve':
                appInstall.setEnabled(true);
                await appInstallRepo.update(appInstall);
                break;
            default:
                throw new Error(`This event[${event}] is not allowed`);
        }

        return {};
    }

    public async syncForm(request: Request): Promise<unknown> {
        const { eshopId } = JSON.parse(String(request.body));

        const appInstall = await this.getApplicationInstall(eshopId);

        return { [PIN]: appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PIN] ?? '' };
    }

    public async syncSaveForm(request: Request): Promise<unknown> {
        const { eshopId, pin } = JSON.parse(String(request.body));

        const appInstallRepo = this.db.getApplicationRepository();
        const defaultApp = await appInstallRepo.findOne(
            { names: [this.defaultAppName], enabled: null, nonEncrypted: { [PIN]: pin } },
        );

        if (!defaultApp) {
            throw new Error(`${this.defaultAppName} application with this pin has not been found.`);
        }

        const appInstall = await this.getApplicationInstall(eshopId);

        if (appInstall.getUser() !== defaultApp.getUser()) {
            await this.sendInstallUninstallWebhook(APPLINTH_EVENT_INSTALL, defaultApp.getUser());
        }

        appInstall.setUser(defaultApp.getUser());
        await appInstallRepo.update(appInstall);
        await this.saveApplicationForms(appInstall, { [CoreFormsEnum.AUTHORIZATION_FORM]: { [PIN]: pin } });
        await appInstallRepo.update(appInstall);

        return { [PIN]: appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PIN] ?? '' };
    }

    protected async sendInstallUninstallWebhook(event: string, user: string): Promise<unknown> {
        if (!user) {
            return Promise.resolve();
        }

        const requestDto = new RequestDto(
            `${orchestyOptions.backend}/api/usage-stats/emit-event`,
            HttpMethods.POST,
            ProcessDto.createForFormRequest(NAME, user, crypto.randomUUID()),
            JSON.stringify({
                event,
                aid: this.getName(),
                euid: user,
            }),
        );

        return this.sender.send(requestDto);
    }

    protected async getApplicationInstall(eshopId: number): Promise<ApplicationInstall> {
        const appInstallRepo = this.db.getApplicationRepository();

        const appInstall = await appInstallRepo.findOne(
            { names: [this.getName()], enabled: null, nonEncrypted: { [ESHOP_ID]: eshopId.toString() } },
        );
        if (appInstall) {
            return appInstall;
        }
        throw new Error(`Application with this eshopId[eshopId=${eshopId}] does not exist`);
    }

    protected async getAccessToken(appInstall: ApplicationInstall, code: string): Promise<IAccessToken> {
        const oauthUrl = `${this.shoptetHost}/action/ApiOAuthServer/token`;
        const oAuth2Dto = new OAuth2Dto(appInstall, oauthUrl, oauthUrl);
        oAuth2Dto.setRedirectUrl(this.shoptetOAuth2RedirectUrl);

        return await this.oauth2Provider.getAccessToken(
            oAuth2Dto,
            code,
            ['api'],
            ScopeSeparatorEnum.COMMA,
            {
                options: {
                    authorizationMethod: 'body',
                },
            },
        ) as IAccessToken;
    }

    protected async startTopology(
        topology: string,
        node: string,
        user: string,
        data?: Record<string, unknown>,
    ): Promise<void> {
        await this.topologyRunner.runByName(
            data ?? {},
            topology,
            node,
            ProcessDto.createForFormRequest(NAME, user, crypto.randomUUID()),
            user,
        );
    }

}

export interface IAccessToken {
    [ACCESS_TOKEN]: string;
    others: {
        scope: string;
        eshopId: number;
        eshopUrl: string;
        contactEmail: string;
    };
}
