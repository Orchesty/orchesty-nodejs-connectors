import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
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
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEwMyIgdmlld0JveD0iMCAwIDE2MCAxMDMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik05Mi42MjMgNzIuNDEyYy0zLjYwMiA4LjIzLTcuNTEgMTQuNTA1LTEyLjk1OCAxOS42NjYtNi4wNiA1Ljc4NC0xMy4yNjQgOC44NTQtMjEuNTIyIDkuNTY2LTYuODA4LjU3OC0xMy40NC0uMjIyLTE5Ljk4NC0yLjE4LTYuNjc4LTEuOTU4LTEyLjc0LTUuMDI4LTE4LjAxLTkuNy00LjM0OC0zLjkxNS03LjY4Ni04LjU4Ny0xMC4yNzgtMTMuODM3LTMuOTk3LTguMDUzLTYuNjc2LTE2LjUwNy03LjkwNi0yNS40NS0uNzktNS43ODQtLjgzNC0xMS41MjQuNjYtMTcuMTc1IDEuNDA1LTUuNDI4IDQuMjYtOS45NjYgOC4yMTMtMTMuODM3IDMuOTA4LTMuODI3IDguNDMyLTYuNzYzIDEzLjI2My05LjIxQzMxLjUyNiA2LjU2MiAzOS4zIDMuODAzIDQ3LjQ3IDIuMzM1IDUzLjMxMiAxLjI2NyA1OS4xNTQgMSA2NS4wNCAyLjJjNS41MzMgMS4xNTggMTAuMjc3IDMuNzgzIDE0LjQwNiA3LjY1NCA0LjQ4IDQuMTgzIDcuODE4IDkuMjEgMTAuNTQgMTQuNjgzIDMuMTIgNi4zMTggNS4zMTYgMTIuOTQ4IDYuMzI2IDE5Ljk3OC45NjYgNi45ODUuNTI3IDEzLjg4LTEuMzYgMjAuNjktLjg4IDIuOTM2LTEuODkgNS43NC0yLjMzIDcuMjA3eiIgc3Ryb2tlPSIjMjYyNjI3Ii8+CiAgICAgICAgPHBhdGggZD0iTTUwIDQzLjIzOHYtMi42MjZoMTMuNjZ2Mi42MjZoLTUuNDQ2djE0Ljk1SDU1LjQ5di0xNC45NUg1MHptMzYuNTg4IDE1LjEyN2MtMS40NSAwLTIuNzI0LS43MTItMy4zNC0xLjZ2Ni40OTVoLTIuNTlWNDUuNTA3aDIuNTl2MS40NjhjLjQ4NS0uODQ1IDEuODktMS42NDYgMy4zODMtMS42NDYgMy42NDcgMCA1LjU4IDIuNCA1LjU4IDYuNDk1IDAgNC4wNS0xLjk3NyA2LjU0LTUuNjIyIDYuNTR6bTIuODk4LTYuNTRjMC0xLjI5LS4zMDctMi4zMTQtLjg3OC0zLjA3LS42MTUtLjc1Ny0xLjM2Mi0xLjE1Ny0yLjI4NC0xLjE1Ny0uOTIyIDAtMS43MTMuMzU2LTIuMjg0IDEuMTU3LS42MTUuNzU2LS44NzggMS43OC0uODc4IDMuMDcgMCAxLjI5LjMwNyAyLjMxMy44NzggMy4wNy42MTUuNzU2IDEuMzYyIDEuMTEyIDIuMjg0IDEuMTEyLjkyMiAwIDEuNzEzLS4zNTYgMi4yODQtMS4xMTIuNTctLjc1Ny44NzgtMS43OC44NzgtMy4wN3pNMTA2IDUyLjU4aC04LjgyN2MwIDIuMDAzIDEuMTQyIDMuNDcyIDMuMDc1IDMuNDcyIDEuNDA1IDAgMi42MzUtLjggMy4yNS0yLjEzNmwyLjE5Ni44OWMtMS4yNzQgMi40OS0yLjcyMyAzLjU2LTUuNDkgMy41Ni00LjEzIDAtNS43OTgtMy41MTYtNS43OTgtNi40OTcgMC0zLjAyNiAxLjcxMy02LjQ5NyA1Ljc5OC02LjQ5NyAzLjk5NyAwIDUuNzUzIDMuMjkzIDUuNzUzIDYuMDk2djEuMTFIMTA2em0tOC43ODMtMi4xOGg2LjA2Yy0uMjE4LTEuNTU2LTEuMjczLTIuNzU4LTMuMDMtMi43NTgtMS42MjUgMC0yLjcyMyAxLjExMy0zLjAzIDIuNzZ6bTEwLjg5My0yLjU4di0yLjMxM2gxLjYyNXYtLjY2OGMwLTIuOTgyIDEuNTgtNC40NSA0LjE3Mi00LjQ1LjgzNSAwIDEuNDk0LjEzMyAyLjA2NS40NDVsLS41MjcgMi4yMjVjLS40NC0uMjIzLS45MjMtLjM1Ni0xLjQ1LS4zNTYtMS4wOTggMC0xLjY3LjY2Ny0xLjY3IDIuMDAydi44NDVoMi43Njh2Mi4zMTVoLTIuNzY3djEwLjMyMmgtMi41OVY0Ny44NjVoLTEuNjI2di0uMDQ1em04LjYxIDQuMDA1YzAtMS44MjQuNTI2LTMuMzgyIDEuNjY4LTQuNjI4IDEuMDk4LTEuMjQ1IDIuNjM1LTEuODY4IDQuNDgtMS44NjggMS44NDQgMCAzLjMzOC42MjIgNC40MzYgMS44NjcgMS4wOTggMS4yNDYgMS42NyAyLjgwNCAxLjY3IDQuNjI4IDAgMS44MjQtLjU3MiAzLjM4LTEuNjcgNC42MjctMS4wOTggMS4yNDYtMi41OTIgMS44Ny00LjQzNiAxLjg3LTEuODQ1IDAtMy4zODItLjYyNC00LjQ4LTEuODctMS4wOTgtMS4yLTEuNjctMi43NTgtMS42Ny00LjYyN3ptMi43MjIgMGMwIDEuMTU3LjMwNyAyLjEzNS44NzggMi45OC42MTUuODQ2IDEuNDUgMS4yNDcgMi41MDQgMS4yNDdzMS44ODgtLjQgMi41MDMtMS4yNDZjLjYxNS0uODQ2LjkyMy0xLjgyNC45MjMtMi45OCAwLTEuMTU4LS4zMDgtMi4xMzctLjkyMy0yLjkzOC0uNjE1LS44NDUtMS40NS0xLjI0Ni0yLjUwMy0xLjI0Ni0xLjA1NCAwLTEuODkuNDQ1LTIuNTA0IDEuMjQ2LS41Ny44NDYtLjg3OCAxLjgyNC0uODc4IDIuOTM3em0xNC41ODIgNi4zMThoLTIuNTlWNDUuNTA3aDIuNTl2Mi4wOWMuODM1LTEuNDY3IDIuMjg0LTIuMzEzIDMuNjktMi4zMTMuNTcgMCAxLjA5OC4wOSAxLjU4LjMxMmwtLjQzOCAyLjQwMmMtLjM5Ni0uMjY3LS44OC0uMzU2LTEuNDUtLjM1Ni0uOTIyIDAtMS43MTMuNDktMi4zNzIgMS41MTMtLjY2IDEuMDI0LTEuMDEgMi40NDctMS4wMSA0LjMxNnY0LjY3M3ptNy45MDYtMTIuNjM2aDIuNTkydjIuMTM1YzEuMDEtMS41NTcgMi4yNC0yLjM1OCAzLjc3Ny0yLjM1OCAxLjY2OCAwIDMuMDczIDEuMDI0IDMuNDI1IDIuNjI1Ljg3OC0xLjY5IDIuMjg0LTIuNjI2IDMuODY1LTIuNjI2IDIuMjQgMCAzLjU1OCAxLjUxMyAzLjU1OCAzLjc4MnY5LjAzMmgtMi41OTJ2LTguNDUzYzAtMS4zMzUtLjcwMi0yLjA0Ny0xLjg0NC0yLjA0Ny0xLjYyNiAwLTIuOSAyLjEzNi0yLjkgNS40NzN2NS4wNzNoLTIuNTlWNDkuNjljMC0xLjMzNi0uNzAzLTIuMDQ4LTEuODQ1LTIuMDQ4LTEuNjcgMC0yLjkgMi4xMzYtMi45IDUuNzR2NC44MDVoLTIuNTl2LTEyLjY4aC4wNDN6bS02My42NDQgMEg3NS4zbC00LjI2IDkuMjU0LTMuOTk4LTkuMjUzSDY0LjFsNS40NDYgMTIuNTktMi4zNzIgNS4xNjNoMi45ODZsOC4xMjYtMTcuNzUzeiIgZmlsbD0iIzI2MjYyNyIgZmlsbC1ydWxlPSJub256ZXJvIi8+CiAgICA8L2c+Cjwvc3ZnPg==';
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
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack()
            .addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET];
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
