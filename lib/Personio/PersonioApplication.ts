import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'personio';

export default class PersonioApplication extends ABasicApplication {

    public constructor(private readonly sender: CurlSender) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Personio';
    }

    public getDescription(): string {
        return 'Software that automates and simplifies your HR tasks within a single software so that you have enough time for important HR topics';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIGQ9Ik0xNC41LDUxLjFjLTEuMiw0LjItMi4yLDcuOC0yLjIsOC4zYy0wLjEsMC41LTAuNSwwLjktMSwwLjljMCwwLTAuMSwwLTAuMSwwYy0wLjUtMC4xLTAuOS0wLjYtMC45LTEuMQoJYzAtMC40LDAuOC0zLjMsMS44LTYuOGMtMS40LDAuNi0yLjUsMS4xLTMuMiwxLjFjLTAuMSwwLTAuMiwwLTAuMywwYy0wLjcsMC0xLTAuMy0xLjItMC42Yy0wLjMtMC41LTAuMS0xLjEsMC40LTEuNAoJYzAuMy0wLjIsMC42LTAuMiwwLjksMGMwLjYtMC4xLDIuMS0wLjcsNC4xLTEuOGMxLTMuNiwyLjEtNy4yLDIuNi05LjFjMC4yLTAuNSwwLjctMC44LDEuMy0wLjdjMC41LDAuMiwwLjgsMC43LDAuNywxLjIKCWMtMC42LDIuMi0xLjMsNC43LTIsNy4yYzAuOS0wLjUsMS44LTEuMSwyLjctMS43YzUtMy4zLDguNS02LjQsOS4xLTguM2MwLjMtMC43LDAuMS0xLjEtMC4zLTEuNGMtMC45LTAuNy0zLjYtMC44LTguNSwxCgljLTcuNCwyLjctMTUuMyw4LTE2LDEwLjdjMC4xLDAsMC4yLDAsMC4yLDBjMC42LDAsMSwwLjQsMS4xLDAuOWMwLDAuNi0wLjQsMS0wLjksMS4xYzAsMCwwLDAtMC4xLDBjLTAuMiwwLTEuMywwLTItMC43CgljLTAuNC0wLjUtMC41LTEuMS0wLjQtMS42YzAuNS0yLjMsMy43LTQuOSw2LjMtNi43YzMuNS0yLjMsNy4yLTQuMiwxMS01LjZjMy41LTEuMyw4LjItMi41LDEwLjUtMC43YzEsMC44LDEuNCwyLDEuMSwzLjMKCWMtMC41LDEuNy0yLjUsNC43LTkuNSw5LjNDMTcuOSw0OS4yLDE2LjEsNTAuMiwxNC41LDUxLjF6IE04Miw0OS44Yy0wLjgsMi4xLTIuNiw3LjItMC4zLDguMmMwLjUsMC4yLDAuNywwLjksMC41LDEuMwoJYy0wLjIsMC41LTAuOCwwLjctMS4zLDAuNUM3OCw1OC41LDc4LjMsNTUsNzkuMSw1MmMtMy4yLDMuOC01LjIsNS43LTYuOCw1LjdsMCwwYy0wLjUsMC0xLTAuMi0xLjItMC42Yy0wLjktMS4yLTAuMy0zLjUsMS40LTguOAoJYzAuMS0wLjIsMC4xLTAuNCwwLjItMC42Yy0wLjEsMC4yLTAuMywwLjQtMC41LDAuN2MtMSwxLjUtMi4xLDMuMy0zLDVjLTAuNywxLjEtMS4yLDIuMS0xLjcsMi45Yy0wLjUsMC43LTEuMiwxLjgtMi4yLDEuNAoJYy0wLjMtMC4xLTAuNi0wLjQtMC43LTAuN2MtMC4yLTAuNC0wLjUtMS4xLDAuOC02LjFjMC4yLTAuOSwwLjQtMS43LDAuNy0yLjVjLTEuNywxLjUtMy4yLDIuNC00LjQsMi45Yy0wLjEsMC44LTAuNCwxLjctMC44LDIuNAoJYy0xLjgsMy42LTQuMSw1LjQtNi4zLDQuOWMtMC44LTAuMi0xLjUtMC44LTEuOC0xLjdjLTAuOC0yLjIsMC42LTUuNywzLjYtOS40YzAuMy0wLjMsMC43LTAuNSwxLjEtMC4zYzAuMi0wLjIsMC40LTAuMywwLjctMC41CgljMC44LTAuNSwxLjUtMC42LDItMC4zYzAuNywwLjMsMS4xLDEuMSwxLjMsMS42YzAuMSwwLjMsMC4yLDAuNywwLjMsMWMxLjMtMC43LDIuOS0xLjgsNC44LTMuOWMwLjQtMC40LDEuMi0xLjMsMi0wLjcKCWMwLjgsMC41LDAuNCwxLjUsMC4zLDJjLTAuMywwLjctMS4zLDQuMy0xLjksN2MwLjItMC4zLDAuNC0wLjcsMC42LTFjMi44LTQuOSw0LjgtOC4xLDYuOC04LjJjMC40LDAsMC43LDAuMSwwLjksMC40CgljMC41LDAuNiwwLjMsMS4yLTAuNyw0LjRjLTAuNSwxLjYtMS43LDUuMy0xLjcsNi42YzAuNC0wLjIsMS4xLTAuNywyLjItMS45YzEuMi0xLjMsMi42LTIuOSwzLjYtNC4yYzEuNy0yLDIuMS0yLjQsMi41LTIuNgoJYzAuNC0wLjEsMC44LDAsMS4xLDAuMkM4Mi43LDQ3LjcsODIuNSw0OC4zLDgyLDQ5LjhMODIsNDkuOHogTTU5LjQsNTEuOGMtMC4zLDAtMC42LDAtMC45LDBjLTEtMC4xLTEuOC0wLjQtMi4yLTAuOQoJYy0xLjcsMi43LTEuOSw0LjYtMS42LDUuM2MwLjEsMC4zLDAuMywwLjQsMC4zLDAuNGMxLjIsMC4zLDIuNy0xLjIsNC0zLjhDNTkuMSw1Mi41LDU5LjIsNTIuMSw1OS40LDUxLjh6IE01OS42LDQ5LjcKCWMwLTAuNS0wLjEtMS0wLjQtMS41Yy0wLjUsMC4yLTEuMywwLjktMS41LDEuNGMwLjMsMC4xLDAuNiwwLjIsMSwwLjJDNTkuMSw0OS44LDU5LjQsNDkuOCw1OS42LDQ5Ljd6IE05OS42LDQ2LjYKCWMtMi43LDMtNSw0LjItNi45LDQuNmMtMC4yLDAuNS0wLjQsMS0wLjYsMS41Yy0yLjIsNC4yLTQuMyw1LjMtNS44LDUuM2MtMC4yLDAtMC41LDAtMC43LTAuMWMtMC44LTAuMi0xLjUtMC44LTEuOC0xLjYKCWMtMC44LTIuMywwLjYtNiwzLjgtMTAuMWMwLjMtMC4zLDAuNy0wLjUsMS4xLTAuM2MwLjgtMC43LDEuOS0xLjMsMi44LTAuOWMwLjUsMC4yLDEsMC44LDEuMiwxLjZjMC4yLDAuOCwwLjQsMS42LDAuMywyLjMKCWMxLjMtMC41LDMtMS42LDUtMy43YzAuNC0wLjQsMS0wLjQsMS40LDBDOTkuOSw0NS41LDk5LjksNDYuMSw5OS42LDQ2LjZMOTkuNiw0Ni42eiBNOTAuNSw1MS4zYy0xLjQtMC4yLTIuNS0wLjgtMy0xLjQKCWMtMC42LDAuOS0xLjEsMS45LTEuNSwyLjljLTAuNCwxLjItMC42LDIuMy0wLjQsMi45YzAuMSwwLjMsMC4yLDAuMywwLjMsMC4zYzEuMiwwLjMsMi44LTEuMyw0LjMtNC4yCglDOTAuNCw1MS42LDkwLjUsNTEuNCw5MC41LDUxLjN6IE05MC44LDQ3Yy0wLjYsMC4yLTEuNSwxLjItMS42LDEuNmMwLjIsMC4yLDAuOCwwLjYsMS44LDAuN2gwLjFDOTEuMiw0OC4yLDkxLDQ3LjMsOTAuOCw0N3oKCSBNODUuNiw0MS42YzAuMi0wLjktMC4yLTEuOC0xLTJjLTAuOC0wLjItMS43LDAuNC0xLjksMS4zczAuMiwxLjgsMSwyUzg1LjQsNDIuNSw4NS42LDQxLjZ6IE01Mi42LDQ1LjVjLTAuNC0wLjItMS4xLTAuMi0xLjUtMC4xCgljLTIsMC4zLTQuMiwxLjctNSwyLjVjMC4zLDAuMSwwLjcsMC4zLDAuOSwwLjRjMS41LDAuNSwzLjQsMS4yLDQuMiwzYzAuNSwxLjEsMC40LDIuNC0wLjEsMy45Yy0xLjgsNC41LTUuMyw1LjYtNy4yLDUuNgoJYy0wLjMsMC0wLjcsMC0xLTAuMWMtMS4yLTAuNC0yLTEuMS0yLjUtMi4xYy0xLjEtMi42LDAuNy02LjMsMS02LjdjMC4zLTAuNSwwLjktMC43LDEuNC0wLjRzMC43LDAuOSwwLjQsMS40CgljLTAuNSwwLjktMS41LDMuNS0wLjksNWMwLjIsMC41LDAuNiwwLjgsMS4yLDFjMC4yLDAuMSwxLjIsMC4xLDIuNC0wLjRjMS0wLjUsMi40LTEuNSwzLjMtMy44YzAuNC0xLDAuNC0xLjcsMC4yLTIuMwoJYy0wLjUtMS0xLjktMS41LTMuMS0xLjljLTEuMS0wLjQtMi0wLjctMi40LTEuNWMtMC4yLTAuNC0wLjItMC44LDAtMS4yYy0yLjksMC41LTUuMiwyLjMtNi45LDUuNWMtMC42LDEuMi0xLjIsMi41LTEuNSwzLjgKCWMtMC4zLDEuMi0wLjUsMi4xLTAuNSwyLjFjLTAuMSwwLjUtMC41LDAuOC0xLDAuOGMtMC4xLDAtMC4xLDAtMC4yLDBjLTAuNS0wLjEtMC45LTAuNi0wLjgtMS4xYzAuMS0wLjgsMC4zLTEuNiwwLjUtMi4zCgljMC41LTIuMiwxLTQuNCwxLjMtNmMtMi4xLDIuOC03LjIsOS4yLTEwLjgsOS4yYy0xLDAtMS45LTAuNS0yLjUtMS40Yy0wLjEtMC4xLTAuMS0wLjItMC4yLTAuM2MtMC42LDAuMi0xLjEsMC40LTEuNywwLjUKCWMtMS42LDAuMi0zLTAuMS00LjEtMWMtMC40LTAuNC0wLjUtMS0wLjEtMS40YzAuMy0wLjQsMS0wLjUsMS40LTAuMWMwLjgsMC42LDEuOCwwLjYsMi41LDAuNWMwLjYtMC4xLDEuMS0wLjIsMS42LTAuNQoJYzAtMi4zLDEtNC45LDEuNS01LjhjMS4zLTIuOCwzLjQtNiw1LjctNi40YzEuMS0wLjIsMiwwLjIsMi41LDFjMS4xLDEuOC0wLjQsNC42LTEuOCw2LjdjLTEuNywyLjQtMy42LDQuNC01LjcsNS42CgljMCwwLDAsMC4xLDAuMSwwLjFjMC4zLDAuNCwwLjUsMC40LDAuOCwwLjRjMC42LDAsMi4zLTAuNCw1LjktNC40YzEuNS0xLjYsMi45LTMuNCw0LjItNS4ybDAuMi0wLjNjMC43LTEuMSwxLjItMS45LDIuMS0xLjgKCWMwLjUsMC4xLDAuOSwwLjQsMSwwLjljMC4xLDAuMywwLjIsMC41LTAuMywyLjhjMi4yLTIuNiw1LjEtMy45LDguNC00bDAsMGMwLjEsMCwwLjMsMCwwLjQsMC4xYzEuNC0xLDMuMi0xLjgsNC44LTIKCWMyLTAuMywzLDAuNCwzLjUsMWMwLjUsMC42LDAuNywxLjgtMS41LDMuOWMtMC40LDAuNC0xLDAuNC0xLjQsMGMtMC40LTAuNC0wLjQtMSwwLTEuNGMwLDAsMCwwLDAuMS0wLjEKCUM1MS45LDQ2LjQsNTIuMyw0Niw1Mi42LDQ1LjV6IE0yMy4yLDU0LjRjMS40LTEuMSwyLjktMi42LDQuMS00LjRjMi0yLjksMi00LjMsMS44LTQuNWMwLTAuMS0wLjItMC4xLTAuMy0wLjFjLTAuMSwwLTAuMSwwLTAuMiwwCgljLTEuMywwLjItMy4xLDIuOC00LjIsNS4yQzIzLjksNTEuOSwyMy41LDUzLjEsMjMuMiw1NC40eiBNOTcuMiw2My40SDIuNHYyaDk0LjhMOTcuMiw2My40eiIvPgo8L3N2Zz4K';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, ' client id', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'client secret', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET];
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        const request = new RequestDto(`https://api.personio.de/v1/company/${_url}`, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: await this.getAuthorizationCode(applicationInstall, dto),
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    private async getAuthorizationCode(appInstall: ApplicationInstall, dto: AProcessDto): Promise<string> {
        const clientId = appInstall.getSettings()[AUTHORIZATION_FORM][CLIENT_ID];
        const clientSecret = appInstall.getSettings()[AUTHORIZATION_FORM][CLIENT_SECRET];
        const req = new RequestDto(
            `https://api.personio.de/v1/auth?client_id=${clientId}&client_secret=${clientSecret}`,
            HttpMethods.GET,
            dto,
        );

        const resp = await this.sender.send<ITokenResponse>(req);

        return resp.getJsonBody().data.token;
    }

}

interface ITokenResponse {
    success: boolean;
    data: {
        token: string;
    };
}
