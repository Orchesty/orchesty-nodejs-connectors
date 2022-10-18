import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import ScopeSeparatorEnum from '@orchesty/nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'typeform';
export default class TypeformApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Typeform';
    }

    public getDescription(): string {
        return 'Software that makes collecting and sharing information comfortable and conversational. Web based platform you can use to create anything from surveys to apps, without needing to write a single line of code';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk5LjY1IDEwMC4xNiI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM0OTQ5NGE7fS5jbHMtMntmaWxsOiM4ZjhmOGY7fS5jbHMtM3tmaWxsOiNmZWZlZmU7fS5jbHMtNHtmaWxsOiMyNjI2Mjc7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik01NS4wNS0uNDJjMS4zLjY2LDIuNzQuNTMsNC4xMS44MUM2Ni43NywxLjkyLDcyLjk0LDYsNzguMzcsMTEuMjksOTAuMzUsMjMsOTcuNTEsMzcuMTMsOTkuMjksNTMuODdjMCwuMzQtLjE3LjgxLjM3LDF2MS42NmEuNzYuNzYsMCwwLDAsMCwxdjQuNjZhMi41NywyLjU3LDAsMCwwLDAsMnYyLjY2Yy0uNjcsMS4wNi0uNTMsMi4zLS43NywzLjQ1Qzk1Ljc1LDg1LjM4LDg2LjgsOTUsNzEuNjQsOTguMTNjLTEzLjI5LDIuNzItMjYuNzEsMi4yNy0zOS4xNC0zLjQ3QzE2LjIxLDg3LjE0LDUuMjQsNzQuNTQsMSw1Ni44Yy0yLjQ1LTEwLjMxLS41MS0yMCw2LjE5LTI4LjM4QTEyNy43MiwxMjcuNzIsMCwwLDEsMjguNjUsNy4xMywzMy43NCwzMy43NCwwLDAsMSw0NS40NS4wNWMuNDItLjA2LDEsLjE5LDEuMjgtLjQ3aDIuMzNhMTQuOTMsMTQuOTMsMCwwLDAsNSwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDEgMC40MikiLz48cGF0aCBkPSJNNTQuMDUtLjQyYTcuNzUsNy43NSwwLDAsMS01LDBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4wMSAwLjQyKSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTk5LjY2LDY0LjE3YTEuNTEsMS41MSwwLDAsMSwwLTJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4wMSAwLjQyKSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTk5LjY2LDU3LjUxYy0uNDEtLjMzLS41MS0uNjcsMC0xWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDEgMC40MikiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik01OC45Myw5OC40Yy05LjY3LS4yMy0xOC42LS45MS0yNi42Ny01QzE2LjcsODUuNSw2LDczLjQzLDIsNTYuMUEzMC43NSwzMC43NSwwLDAsMSw4LjMxLDI4Ljg4LDEzOS45MiwxMzkuOTIsMCwwLDEsMjguNzQsOC40NUM0MS4yNC0xLjc4LDYyLTIuMjIsNzUuMjUsOS45MmMxNCwxMi44MSwyMiwyOC4zOCwyMy4xNSw0Ny40MS4zNyw2LjI2LDAsMTIuNDUtMi4xMywxOC4zNy00LjUzLDEyLjQ0LTEzLjY2LDE5LjM5LTI2LjUsMjEuNzVBNjcuMzMsNjcuMzMsMCwwLDEsNTguOTMsOTguNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAxIDAuNDIpIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNNDguMjgsNTYuMzdjMC00LjU1LDAtOS4xLDAtMTMuNjQsMC0xLjItLjM1LTEuNTEtMS41LTEuNDctMi43Ny4wNy01LjU0LDAtOC4zMiwwLTEsMC0xLjQ0LS4xNC0xLjQ0LTEuMzIsMC00LDAtNCwzLjkyLTQsNy41NSwwLDE1LjA5LDAsMjIuNjQsMCwxLjE3LDAsMS40OC4zMiwxLjQ3LDEuNDgsMCwzLjg2LDAsMy44Ni0zLjg2LDMuODYtMiwwLTQsLjA3LTYsMC0xLjE1LS4wNi0xLjM2LjM1LTEuMzYsMS40MSwwLDksMCwxOC4wOS4wNiwyNy4xMywwLDEuNC0uMzcsMS43Ni0xLjc0LDEuNzMtMy45MS0uMDktMy45MSwwLTMuOTEtNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAxIDAuNDIpIi8+PC9zdmc+';
    }

    public getAuthUrl(): string {
        return 'https://api.typeform.com/oauth/authorize';
    }

    public getTokenUrl(): string {
        return 'https://api.typeform.com/oauth/token';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://api.typeform.com/${_url}`;
        const request = new RequestDto(url ?? '', method, dto);
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

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack()
            .addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[CLIENT_ID]
            && authorizationForm?.[CLIENT_SECRET];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [
            'forms:write',
            'workspaces:write',
        ];
    }

    protected _getScopesSeparator(): string {
        return ScopeSeparatorEnum.SPACE;
    }

}
