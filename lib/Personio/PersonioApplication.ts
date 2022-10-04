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
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDkzLjU1IDk5LjI1Ij48cGF0aCBkPSJNNDEuMjYsNTcuODRjLTIsLjgzLTMuOCwxLjU2LTUuNTgsMi4yNmExOS42NywxOS42NywwLDAsMS00LjkzLDEuMzMsNC43NSw0Ljc1LDAsMCwxLTQtMUEzLjMsMy4zLDAsMCwxLDI2LDU2LjQ3YTMuMDgsMy4wOCwwLDAsMSwzLjYtMS42NCw0LDQsMCwwLDAsMi4yOC0uMThBODkuNzQsODkuNzQsMCwwLDAsNDMsNDkuNzRhMS45LDEuOSwwLDAsMCwxLTEuMzlRNDcuODEsMzQuNzEsNTEuNywyMS4xYTQuNzMsNC43MywwLDAsMSwxLTIuMjQsMy4yNSwzLjI1LDAsMCwxLDMuODItLjYxQTMuMDgsMy4wOCwwLDAsMSw1OC4xLDIyYy0xLDMuNTEtMiw3LTMsMTAuNUw1MS42OCw0NC43YTEuOTIsMS45MiwwLDAsMCwxLjMtLjUxQTE3OC4xMiwxNzguMTIsMCwwLDAsNzguNzUsMjYuMWE1NC41NCw1NC41NCwwLDAsMCw5LTkuNTFBMTQuNDIsMTQuNDIsMCwwLDAsOTAsMTIuMzEsMy4yOSwzLjI5LDAsMCwwLDg4LjE5LDhhOSw5LDAsMCwwLTMuODUtMUE0MS41LDQxLjUsMCwwLDAsNjkuNDksOS4xNCwxNTAuMzUsMTUwLjM1LDAsMCwwLDE4LjQyLDM1LjY3YTM2LjU4LDM2LjU4LDAsMCwwLTYuODYsNywyMi40LDIyLjQsMCwwLDAtMS4zOSwyLjIzYy0uNDguODUtLjgsMS41MS43NiwxLjU3YTMuMDksMy4wOSwwLDAsMSwyLjg0LDMuMzIsMy4xOCwzLjE4LDAsMCwxLTMuMDcsMyw5LjE1LDkuMTUsMCwwLDEtMy40MS0uNDMsNS44MSw1LjgxLDAsMCwxLTQtNy40NWMxLTMuODIsMy4zOC02LjgzLDYuMDUtOS42LDUuOC02LDEyLjYzLTEwLjc0LDE5Ljc0LTE1QTE2MC4wNywxNjAuMDcsMCwwLDEsNjYuNCwzLjMzQzcyLjIsMS42LDc4LjEuMzMsODQuMjIuNjFhMTYuOSwxNi45LDAsMCwxLDYuNTYsMS41QTkuNjMsOS42MywwLDAsMSw5Ni4xMiwxNC4yYy0xLjI5LDQuMzItNCw3Ljc0LTcsMTFDODIsMzIuNzEsNzMuNjEsMzguNjYsNjUsNDQuMzJjLTQuODUsMy4yLTkuODQsNi4xNi0xNC45NCw5YTIuMzEsMi4zMSwwLDAsMC0xLjI2LDEuNUM0Ni40OSw2My4yNiw0NCw3MS43LDQxLjksODAuMjVjLS41MSwyLjA4LTIuMDYsMy4yNy0zLjg0LDIuODctMi0uNDItMy0yLjA2LTIuNDItNC4yNiwxLjE4LTQuNjksMi40Ni05LjM1LDMuNzEtMTRDNDAsNjIuNTgsNDAuNTgsNjAuMzMsNDEuMjYsNTcuODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMy4wOCAtMC41NykiLz48cGF0aCBkPSJNNDkuOTEsOTkuNzlxLTE5LjA5LDAtMzguMTksMGMtMS4xNywwLTEuNjctLjIyLTEuNTQtMS41YTIzLjIyLDIzLjIyLDAsMCwwLDAtMy43M2MwLS45Mi4xOS0xLjQxLDEuMi0xLjI2YTMuMzcsMy4zNywwLDAsMCwuNTUsMHEzNy45MiwwLDc1LjgyLDBjMS4zNiwwLDEuOTMuMjYsMS43NSwxLjcxYTEzLDEzLDAsMCwwLDAsMy4xOGMuMTcsMS40MS0uNDIsMS42My0xLjY5LDEuNjNDNzUuMTgsOTkuNzcsNjIuNTQsOTkuNzksNDkuOTEsOTkuNzlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMy4wOCAtMC41NykiLz48cGF0aCBkPSJNNDUuNTIsNzguNTZBNC42Nyw0LjY3LDAsMCwxLDUwLDczLjYzYTQuMjgsNC4yOCwwLDAsMSw0LjE1LDQuNTYsNSw1LDAsMCwxLTQuNTksNUM0Ny4yLDgzLjE5LDQ1LjUsODEuMjUsNDUuNTIsNzguNTZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMy4wOCAtMC41NykiLz48cGF0aCBkPSJNODguNzQsOTRjMCwxLjE2LDAsMi4zMSwwLDMuNDZTODguNCw5OSw4Ny4zMSw5OC45MmMtLjMyLDAtLjY0LDAtMSwwaC03M2MtMi4zNywwLTIuMzgsMC0yLjM4LTIuMzQsMC0uODcsMC0xLjc1LDAtMi42M2EyLjcsMi43LDAsMCwxLDEuNDktLjE0cTM3LjQxLDAsNzQuODEsMEM4Ny43NSw5My44MSw4OC4yOCw5My42NSw4OC43NCw5NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zLjA4IC0wLjU3KSIvPjxwYXRoIGQ9Ik04OC43NCw5NGMtNC42NiwwLTkuMzIsMC0xNCwwSDExYy4xOC0uNTQuNjQtLjI2Ljk0LS4yNnEzNy43OSwwLDc1LjU2LDBDODcuOSw5My42OCw4OC40MSw5My40OCw4OC43NCw5NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zLjA4IC0wLjU3KSIvPjwvc3ZnPg==';
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
