import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import OAuth2Dto from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/Dto/OAuth2Dto';
import ScopeSeparatorEnum from '@orchesty/nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const SUBDOMAIN = 'subdomain';
export const NAME = 'zendesk';
export default class ZendeskApplication extends AOAuth2Application {

    public getDescription(): string {
        return 'Customer support software that helps companies manage customer problems through a ticketing system';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Zendesk';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMzM2M0Q7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00Ni4yLDMyLjJ2NTUuNEgwLjNMNDYuMiwzMi4yeiBNNDYuMiwxMi4zYzAsMTIuNy0xMC4zLDIzLTIzLDIzcy0yMy0xMC4zLTIzLTIzTDQ2LjIsMTIuM3ogTTUzLjgsODcuNwoJCWMwLTEyLjcsMTAuMy0yMywyMy0yM3MyMywxMC4zLDIzLDIzSDUzLjh6IE01My44LDY3LjhWMTIuM2g0NS45TDUzLjgsNjcuOHoiLz4KPC9nPgo8L3N2Zz4K';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): Promise<RequestDto> | RequestDto {
        const subdomain = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][SUBDOMAIN];
        const url = `https://${subdomain}.zendesk.com/api/v2${_url}`;

        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['read', 'write'];
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, SUBDOMAIN, 'Subdomain', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[SUBDOMAIN]
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET];
    }

    public getAuthUrlWithSubdomain(applicationInstall: ApplicationInstall): string {
        return `https://${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][SUBDOMAIN]}.zendesk.com/oauth/authorizations/new`;
    }

    public getAuthUrl(): string {
        throw new Error(`Dont use [${this.getAuthUrl.name}] use [${this.getAuthUrlWithSubdomain.bind(this).name}] instead.`);
    }

    public getTokenUrlWithSubdomain(applicationInstall: ApplicationInstall): string {
        return `https://${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][SUBDOMAIN]}.zendesk.com/oauth/tokens`;
    }

    public getTokenUrl(): string {
        throw new Error(`Dont use [${this.getAuthUrl.name}] use [${this.getTokenUrlWithSubdomain.bind(this).name}] instead.`);
    }

    public createDto(applicationInstall: ApplicationInstall, redirectUrl?: string): OAuth2Dto {
        const dto = new OAuth2Dto(
            applicationInstall,
            this.getAuthUrlWithSubdomain(applicationInstall),
            this.getTokenUrlWithSubdomain(applicationInstall),
        );
        dto.setCustomAppDependencies(applicationInstall.getUser(), applicationInstall.getName());
        if (redirectUrl) {
            dto.setRedirectUrl(redirectUrl);
        }

        return dto;
    }

    protected getScopesSeparator(): string {
        return ScopeSeparatorEnum.SPACE;
    }

}
