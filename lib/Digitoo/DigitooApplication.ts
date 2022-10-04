import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import {
    ABasicApplication,
    TOKEN,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'digitoo';

const BASE_URL = 'https://api.digitoo.cz/';

export default class DigitooApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Digitoo';
    }

    public getDescription(): string {
        return 'Cloud-based application that automates and digitalizes the accounting process without the need of manual data entry';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMyQjY2RTc7fQo8L3N0eWxlPgo8ZyBpZD0iYXJ0Ij4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03My42LDQwLjNjLTQuNiwwLTguMywzLjctOC4zLDguM3MzLjcsOC4zLDguMyw4LjNjNC42LDAsOC4zLTMuNyw4LjMtOC4zUzc4LjIsNDAuMyw3My42LDQwLjN6IE03My42LDUyLjcKCQljLTIuMiwwLTMuOS0xLjktMy45LTQuMnMxLjgtNC4yLDMuOS00LjJjMi4yLDAsMy45LDEuOSwzLjksNC4yQzc3LjYsNTAuOCw3NS44LDUyLjcsNzMuNiw1Mi43TDczLjYsNTIuN3oiLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05MS43LDQwLjNjLTQuNiwwLTguMywzLjctOC4zLDguM3MzLjcsOC4zLDguMyw4LjNjNC42LDAsOC4zLTMuNyw4LjMtOC4zUzk2LjIsNDAuMyw5MS43LDQwLjN6IE05MS43LDUyLjcKCQljLTIuMiwwLTMuOS0xLjktMy45LTQuMnMxLjgtNC4yLDMuOS00LjJjMi4yLDAsMy45LDEuOSwzLjksNC4yQzk1LjYsNTAuOCw5My44LDUyLjcsOTEuNyw1Mi43TDkxLjcsNTIuN3oiLz4KCTxyZWN0IHg9IjE5LjciIHk9IjQxLjIiIGNsYXNzPSJzdDAiIHdpZHRoPSI0LjMiIGhlaWdodD0iMTQuNyIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIxLjgsMzQuNGMtMS41LDAtMi41LDEtMi41LDIuNGMwLDEuNCwxLDIuNCwyLjUsMi40czIuNS0xLDIuNS0yLjRDMjQuMywzNS40LDIzLjMsMzQuNCwyMS44LDM0LjR6Ii8+Cgk8cmVjdCB4PSI0Ni45IiB5PSI0MS4yIiBjbGFzcz0ic3QwIiB3aWR0aD0iNC4zIiBoZWlnaHQ9IjE0LjciLz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00OS4xLDM0LjRjLTEuNSwwLTIuNSwxLTIuNSwyLjRjMCwxLjQsMSwyLjQsMi41LDIuNHMyLjUtMSwyLjUtMi41QzUxLjYsMzUuNCw1MC42LDM0LjQsNDkuMSwzNC40eiIvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYwLjMsNTAuOHYtNi4yaDMuM3YtMy4zaC0zLjN2LTMuN2gtNC4xbDAsMy43aC0yLjN2My4zSDU2djYuN2MwLDMuMSwxLjksNS4zLDQuOCw1LjNjMSwwLDItMC4yLDMtMC41di0zLjUKCQljLTAuNSwwLjEtMSwwLjItMS41LDAuMkM2MS4xLDUyLjksNjAuMyw1Miw2MC4zLDUwLjh6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDAuNCw0Mi40Yy0zLjQtMy04LjYtMi44LTExLjcsMC42Yy0zLDMuNC0yLjgsOC42LDAuNiwxMS43YzIuNiwyLjMsNi40LDIuOCw5LjUsMS4xdjEuOGwwLDAKCQljMCwyLTEuNiwzLjctMy43LDMuN2wwLDBoLTAuMWMtMiwwLTMuNi0xLjctMy42LTMuN2wwLDB2LTAuMUgyN2MwLDQuNSwzLjYsOC4xLDguMSw4LjFjMCwwLDAsMCwwLDB2MGwwLDB2MGM0LjQsMCw3LjktMy41LDguMS03LjgKCQloMFY0MS40QzQyLjIsNDEuNCw0MS4yLDQxLjcsNDAuNCw0Mi40eiBNMzQuOSw1Mi43Yy0yLjIsMC0zLjktMS45LTMuOS00LjJzMS44LTQuMiwzLjktNC4yczMuOSwxLjksMy45LDQuMgoJCUMzOC44LDUwLjgsMzcuMSw1Mi43LDM0LjksNTIuN0wzNC45LDUyLjd6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNiwzNC42aC00LjN2Ni42Yy00LTIuMi05LTAuNy0xMS4yLDMuM3MtMC43LDksMy4zLDExLjJzOSwwLjcsMTEuMi0zLjNjMC42LTEuMiwxLTIuNSwxLTMuOWwwLDBWMzQuNnoKCQkgTTguMyw1Mi43Yy0yLjIsMC0zLjktMS45LTMuOS00LjJjMC0yLjMsMS44LTQuMiwzLjktNC4yczMuOSwxLjksMy45LDQuMlMxMC41LDUyLjcsOC4zLDUyLjd6Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> | RequestDto {
        const token = applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[TOKEN];
        if (!token) {
            throw new Error(`Application [${this.getPublicName()}] doesn't have token!`);
        }
        const request = new RequestDto(
            `${BASE_URL}${url}`,
            method,
            dto,
        );
        request.setHeaders(
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
            },
        );

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Admin API access token', undefined, true));

        return new FormStack().addForm(form);
    }

}
