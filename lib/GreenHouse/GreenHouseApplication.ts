import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const USERNAME = 'username';
export const PASSWORD = 'password';
export const NAME = 'green-house';

export default class GreenHouseApplication extends ABasicApplication {

    public getName(): string {
        return 'green-house';
    }

    public getPublicName(): string {
        return 'Greenhouse';
    }

    public getDescription(): string {
        return 'Leading hiring software for growing companies';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMC4wMiA5OS45OSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiMyNGEzN2U7fS5jbHMtMntmaWxsOiNmZWZlZmU7fS5jbHMtM3tmaWxsOiMyNGEzN2Y7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTAsOTkuODhRMCw1MC40LDAsLjkyQzAsLjE3LjE1LDAsLjksMHE0OS40OSwwLDk5LDBBMi4yMSwyLjIxLDAsMCwxLDEwMCwxLjFxMCw0OC44MywwLDk3LjY1YzAsMS4zNy4xNSwxLjIzLTEuMjIsMS4yM0gxLjA4QTIuMDksMi4wOSwwLDAsMSwwLDk5Ljg4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMiAwKSIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTUwLDc5LjkxYTE0LjExLDE0LjExLDAsMCwxLTUuNjctMjcuMTMsMjcuNDgsMjcuNDgsMCwwLDAsMi41My0xLjE0LDEuNzUsMS43NSwwLDAsMCwuMjktMywxNS41NCwxNS41NCwwLDAsMC0yLjM1LTEuNDljLTUuMi0zLjEyLTctOS00LjMxLTE0LjE5YTEwLjYsMTAuNiwwLDAsMSwxMC42NS01LjQ1LDcsNywwLDAsMCwyLjM3LDAsMS42NywxLjY3LDAsMCwwLDEuNC0yLjA2Yy0uMDctLjQ2LS4xNy0uOTItLjIyLTEuMzhhMy40MiwzLjQyLDAsMCwxLDIuNjEtMy43MiwzLjQ2LDMuNDYsMCwwLDEsNCwxLjkxQTMuMjksMy4yOSwwLDAsMSw2MCwyNi41N2ExMC4xMywxMC4xMywwLDAsMS0xLjUyLjczYy0xLjU1LjY2LTEuODUsMS41LTEsMywuNDQuNzQsMSwxLjQzLDEuNDEsMi4xN2ExMC4zNCwxMC4zNCwwLDAsMS0zLDE0Yy0uOTEuNjItMS44NywxLjE1LTIuNzksMS43NGEyLjE0LDIuMTQsMCwwLDAtMS4yNywyYy4wNiwxLC43NywxLjQxLDEuNTUsMS43NSwyLC44OSw0LjEzLDEuNjUsNS44LDMuMiw0LjMsNCw1LjksOC44OCw0LjI3LDE0LjU0cy01LjYyLDktMTEuNDIsMTBBMTEsMTEsMCwwLDEsNTAsNzkuOTFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIDApIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNTkuMzUsNjUuODNjLS4wNyw1LjY3LTQuMjQsOS45Mi05LjY3LDkuODdhOS42Miw5LjYyLDAsMCwxLTkuMzQtMTBjLjA2LTUuNjMsNC4yMi05LjkyLDkuNTctOS44NUE5LjU3LDkuNTcsMCwwLDEsNTkuMzUsNjUuODNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIDApIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNDkuODQsNDQuMThhNi4zMiw2LjMyLDAsMCwxLTYuMjYtNi4yOCw2LjI2LDYuMjYsMCwxLDEsMTIuNTItLjFBNi4zMSw2LjMxLDAsMCwxLDQ5Ljg0LDQ0LjE4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMiAwKSIvPjwvc3ZnPg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USERNAME, ' username', undefined, true))
            .addField(new Field(FieldType.PASSWORD, PASSWORD, ' password', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[USERNAME] && authorizationForm?.[PASSWORD];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://harvest.greenhouse.io/v1/${_url}`, method, dto);
        const username = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][USERNAME];
        const password = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PASSWORD];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: encode(`${username}:${password}`),
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
