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
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMC4wOSA5OS45NSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZDdjN2M7fS5jbHMtMntmaWxsOiNmZWZlZmU7fS5jbHMtM3tmaWxsOiNmZDdiN2I7fS5jbHMtNHtmaWxsOiNmZDcxNzE7fS5jbHMtNXtmaWxsOiNmZDc4Nzg7fS5jbHMtNntmaWxsOiNmZDZlNmU7fS5jbHMtN3tmaWxsOiNmZDZmNmY7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTAsNTBRMCwyNS40MiwwLC44MkMwLC4xNi4xNCwwLC44MSwwUTUwLjA2LjA2LDk5LjMsMGMuNjcsMCwuOC4xMy44Ljc5cTAsNDkuMTksMCw5OC4zNmMwLC42Ni0uMTMuOC0uOC43OXEtNDkuMjQsMC05OC40OSwwYy0uNjcsMC0uOC0uMTMtLjgtLjc5US4wNiw3NC41OCwwLDUwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDEgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjQuNjgsMjEuNzFjMy42NCwwLDcuMjgtLjA2LDEwLjkyLS4wNWEzNC4yOSwzNC4yOSwwLDAsMSw0Ljg2LjA5Yy4yMi4zMi4xMS42OS4xMSwxcTAsOS40MiwwLDE4LjgzYzAsMS4wNiwwLDEuMDYsMSwxLjA2LDUuNiwwLDExLjIxLDAsMTYuODEsMCwuNzUsMCwxLS4yLDEtMSwwLTYuMzQsMC0xMi42OCwwLTE5LDAtLjMxLS4yMi0uNjMsMC0uOTNhMi4yNSwyLjI1LDAsMCwxLDEuMDYtLjEySDc0LjIxYy4zNiwwLC43OS0uMTUsMS4wNy4yNmEyLjIzLDIuMjMsMCwwLDEsLjA4LDFWNzYuNzRhMi4yMywyLjIzLDAsMCwxLS4wOCwxYy0uMjIuMzUtLjU3LjI1LS44OC4yNS00LjY2LDAtOS4zMiwwLTE0LDAtLjc5LDAtLjg5LS4yOC0uODktMSwwLTYuODMsMC0xMy42NiwwLTIwLjQ5LDAtLjkzLS4yMy0xLjIxLTEuMTktMS4yLTUuNjMsMC0xMS4yNiwwLTE2LjksMC0uODYsMC0xLjA5LjI0LTEuMDgsMS4xLDAsNi43MywwLDEzLjQ2LDAsMjAuMTlDNDAuNDMsNzgsNDAuNDMsNzgsMzksNzhsLTE0LjM1LDBjLS4yNS0uMjgtLjEzLS42Mi0uMTMtLjk0cTAtMjcuMTUsMC01NC4zMUMyNC41NiwyMi4zNCwyNC40NSwyMiwyNC42OCwyMS43MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAxIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTU5LjQ4LDIxLjc3YzAsMS41My4wNywzLjA2LjA3LDQuNTgsMCw1LjEsMCwxMC4yLDAsMTUuMzEsMCwxLS4yOSwxLjE2LTEuMjEsMS4xNi01LjY2LDAtMTEuMzIsMC0xNywwLS41NywwLTEsMC0xLS43OCwwLTYuNzYsMC0xMy41MSwwLTIwLjI3di0uMjRoMGEyLDIsMCwwLDEsLjIsMS4zMnEwLDkuMjEsMCwxOC40MmMwLDEuMzQsMCwxLjM0LDEuMzUsMS4zNCw1LjM0LDAsMTAuNjcsMCwxNiwwLC45NCwwLDEuMjItLjI4LDEuMjItMS4yMiwwLTYuMjQsMC0xMi40NywwLTE4LjcxQzU5LjI1LDIyLjM4LDU5LDIyLDU5LjQ4LDIxLjc3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDEgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMjQuNjgsMjEuNzFxMCwyOC4wOSwwLDU2LjE5Yy0uMzEtLjMyLS4yMy0uNzMtLjIzLTEuMTF2LTU0QzI0LjQ2LDIyLjQ0LDI0LjM4LDIyLDI0LjY4LDIxLjcxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDEgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImNscy01IiBkPSJNNzUuMjgsNzcuN2MwLS4yOSwwLS41OCwwLS44N3EwLTI3LDAtNTRjMC0uMjksMC0uNTgsMC0uODdBMS44NSwxLjg1LDAsMCwxLDc1LjQ2LDIzVjc2LjU3QTEuODUsMS44NSwwLDAsMSw3NS4yOCw3Ny43WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDEgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNNDAuNDcsMjEuNTFIMjV2LS4xOWg0LjU3YzMuMjUsMCw2LjUxLDAsOS43NiwwYTEuNzEsMS43MSwwLDAsMSwxLjEzLjE4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDEgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImNscy03IiBkPSJNMjUsNzguMTVoMTUuMXYuMUgyNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjAxIC0wLjAzKSIvPjxlbGxpcHNlIGNsYXNzPSJjbHMtNiIgY3g9IjY3LjQzIiBjeT0iMjEuMzciIHJ4PSIxMC41NCIgcnk9IjAuMDYiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik03NC45LDc4LjI2SDYwdi0uMDlINzQuODZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4wMSAtMC4wMykiLz48L3N2Zz4=';
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
