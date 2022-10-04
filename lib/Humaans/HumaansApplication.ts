import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'humaans';
export const APPLICATION_TOKEN = 'application_token';

export default class HumaansApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Humaans';
    }

    public getDescription(): string {
        return 'Onboard, manage and grow your employees. Fast workflows, beautiful people directory, time off tracking, reports and analytics';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk5Ljg4IDE0LjI1Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZlNWU1ZTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDcuNiw0OS42MmE0LjMsNC4zLDAsMCwwLTYtMy42NGMtLjg0LjMzLTEuNCwxLjM3LTIuMTEsMS4zOVMzOC4yNCw0Ni4yNiwzNy4zOCw0NmE0Ljc2LDQuNzYsMCwwLDAtNC45NCwxLjFjLjI1LTEuMzUtLjQ2LTEuMzctMS4yNy0xLjMyYTcuNDIsNy40MiwwLDAsMS0xLjQ5LDBjLTEtLjEzLTEuMTkuMzItMS4xNywxLjIxLDAsMi4zNywwLDQuNzQsMCw3LjEsMCwzLDAsMywyLjk1LDIuOTIuNzUsMCwxLS4yMSwxLTEsMC0xLjcsMC0zLjQsMC01LjExYTEuODQsMS44NCwwLDEsMSwzLjY4LDBjMCwxLDAsMi4wOCwwLDMuMTIsMCwzLjE0LDAsMy4xMiwzLjEyLDMsLjY5LDAsLjg0LS4zLjgzLS45MSwwLTEuNjIsMC0zLjI0LDAtNC44NiwwLTEuNDQuNjUtMi4xNywxLjgyLTIuMTZzMS44LjczLDEuODEsMi4xNywwLDMuMTYsMCw0Ljc0YzAsLjQzLS4xMSwxLjA1LjYsMSwxLjEtLjEzLDIuMjguNDQsMy4yOS0uMzYuMDctLjA1LDAtLjI0LDAtLjM2QzQ3LjY1LDU0LDQ3Ljc2LDUxLjgyLDQ3LjYsNDkuNjJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4wNiAtNDIuODgpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTEuNzksNDIuOTJjLTMtLjExLTMtLjEzLTMsMi45MywwLDIuMzYsMCwyLjM2LTIuMzMsMi4zNlM0LDQ4LjIxLDQsNDUuODJjMC0zLjA2LDAtMy0zLjA1LTIuOS0uNjQsMC0uODguMjItLjg4Ljg3cTAsNi4xNiwwLDEyLjMzYzAsLjY1LjI2LjgzLjg5Ljg2LDMuMDUuMTUsMywuMTcsMy0yLjl2LS43NWMwLTIsMC0yLDItMiwyLjcyLDAsMi43MiwwLDIuNzIsMi43MiwwLDMuMTUsMCwzLjEyLDMuMTIsMywuNjgsMCwuODMtLjI5LjgzLS45LDAtMiwwLTQuMDcsMC02LjExczAtNC4wNywwLTYuMUMxMi43MSw0My4yLDEyLjUyLDQzLDExLjc5LDQyLjkyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDYgLTQyLjg4KSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTYxLjEzLDQ4LjIzYzAtMi40NiwwLTIuNDUtMi40OC0yLjQ3LS44MiwwLTEuNjYtLjE0LTEuNTEsMS4xNy0zLjQ1LTIuNy02Ljc5LS42NC03LjYsMmE3LjM3LDcuMzcsMCwwLDAsLjI5LDUuNDZBNC40Nyw0LjQ3LDAsMCwwLDU1LjA5LDU3YTguNjcsOC42NywwLDAsMCwyLjItMS4yNWMtLjM5LDEuMzEuMywxLjI5LDEsMS4yNmExMi43OCwxMi43OCwwLDAsMSwxLjc1LDBjLjguMDgsMS4wOC0uMiwxLjA2LTFDNjEuMDksNTMuMzcsNjEuMTIsNTAuOCw2MS4xMyw0OC4yM1ptLTYsNS40N2EyLjM2LDIuMzYsMCwwLDEsMC00LjY2LDIuMzUsMi4zNSwwLDAsMSwwLDQuNjZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4wNiAtNDIuODgpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzQuNjQsNDguNDRjMC0yLjcxLDAtMi42OC0yLjc3LTIuNjktLjg1LDAtMS4yMi4yNS0xLjA3LDEuMzItMy41NS0zLTcuNTctLjY1LTgsMywwLC4zMy0uMTIuNjYtLjEyLDEsMCwyLjIuNDIsNC4yOCwyLjUyLDUuNDcsMS44OCwxLjA2LDMuNzQuODIsNS41OC0uOTEtLjI4LDEuNDQuNDYsMS40OCwxLjMyLDEuNGE2Ljg0LDYuODQsMCwwLDEsMS41LDBjLjg1LjEsMS0uMjksMS0xLjA3Qzc0LjYxLDUzLjQyLDc0LjY0LDUwLjkzLDc0LjY0LDQ4LjQ0Wk02OC44MSw1My43YTIuMTQsMi4xNCwwLDAsMS0yLjE0LTIuMjcsMi4wNywyLjA3LDAsMSwxLDIuMTQsMi4yN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjA2IC00Mi44OCkiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yNi4zNyw0OC42NWMwLTMsMC0yLjk0LTMtMi45LS43NiwwLTEsLjIxLTEsMSwuMDUsMS42MiwwLDMuMjQsMCw0Ljg2LDAsMS40Ni0uNjQsMi4xOC0xLjgyLDIuMnMtMS44Ny0uNjktMS44OS0yLjI0LDAtMy4yNCwwLTQuODZjMC0uMzEuMTMtLjgzLS4yNy0uODZhMjksMjksMCwwLDAtMy4zNiwwYy0uMjYsMC0uMjguMzgtLjI3LjYyYTU4LDU4LDAsMCwwLC4xNSw3LjFBMy44NCwzLjg0LDAsMCwwLDE5LDU3YTQuNDksNC40OSwwLDAsMCwzLjUxLTEuNjZjLS4zMiwxLjUxLjI5LDEuNzEsMS4yNSwxLjZhNS4yNCw1LjI0LDAsMCwxLDEuMzcsMGMuOTUuMTIsMS4zLS4yLDEuMjctMS4yMkMyNi4zMSw1My40LDI2LjM3LDUxLDI2LjM3LDQ4LjY1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDYgLTQyLjg4KSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTg4LjMsNDkuNDlhNCw0LDAsMCwwLTQuMjUtMy43OSw0LjU4LDQuNTgsMCwwLDAtMy4xMSwxLjRjLS4yMy0xLjMzLS4yMy0xLjMzLTEuNTQtMS4zM2ExNC44MSwxNC44MSwwLDAsMS0xLjQ5LDBjLS44Mi0uMDktMS4wOC4yMi0xLjA2LDEsLjA1LDIuNDUsMCw0LjksMCw3LjM1LDAsMi44NywwLDIuODMsMi44NiwyLjg0LjkxLDAsMS4xMi0uMywxLjA5LTEuMTQtLjA2LTEuNjYsMC0zLjMyLDAtNUExLjc4LDEuNzgsMCwwLDEsODMuMTIsNDljMS4wOS4yNiwxLjM3LDEuMTIsMS4zOSwyLjA5LDAsMS43LDAsMy40MSwwLDUuMTEsMCwuNTkuMjMuOS44Ljc3LDEtLjI0LDIuMTkuNjIsMy0uNTEsMC0uMDUsMC0uMTYsMC0uMjRDODguMzYsNTQsODguNDMsNTEuNzIsODguMyw0OS40OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjA2IC00Mi44OCkiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik05OS45Myw1My40MmEyLjg5LDIuODksMCwwLDAtMi4wNy0yLjY5Yy0uOS0uMzItMS44NC0uNS0yLjc1LS43OC0uNDMtLjEyLS45My0uMTktMS4wNi0uNzNhLjUyLjUyLDAsMCwxLC4yOS0uNjNjLjQ4LS4yMSwxLjEzLS4zLDEuNDEuMDkuNzgsMS4xLDEuODYuODQsMi45Ljg0LDEuMywwLDEuNDMtLjIyLjg2LTEuNDItMS0yLTMuNDktMy02LjE2LTIuMjdhMy42MSwzLjYxLDAsMCwwLTMsMy4zOGMwLDEuNTYuOSwyLjU0LDIuODgsMy4wOC40LjExLjgxLjE5LDEuMjEuMjlzLjguMjIsMS4xOS4zNS43MS4zMy42Mi44LS40OC41NC0uODcuNTYtMSwuMDUtMS4xNS0uMzJjLS41Ni0xLTEuNDctLjcxLTIuMjItLjc2aC0uN2MtMS40MiwwLTEuNTkuMy0uODgsMS41NmE0LjU3LDQuNTcsMCwwLDAsLjYuNzksNi41NSw2LjU1LDAsMCwwLDcuMjEuODRBMy4wNiwzLjA2LDAsMCwwLDk5LjkzLDUzLjQyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDYgLTQyLjg4KSIvPjwvc3ZnPg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, APPLICATION_TOKEN, 'Application token', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[APPLICATION_TOKEN];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const token = settings[AUTHORIZATION_FORM][APPLICATION_TOKEN];
        const url = `https://app.humaans.io/api${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
