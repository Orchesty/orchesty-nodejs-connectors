import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import {
    ABasicApplication,
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit, Headers } from 'node-fetch';

export const BASE_URL = 'https://api.twilio.com/2010-04-01';

export default class TwilioApplication extends ABasicApplication {

    public getDescription(): string {
        return 'Cloud communication company that enables users to use standard web languages to build voice, VoIP, and SMS apps via a web API';
    }

    public getName(): string {
        return 'twilio';
    }

    public getPublicName(): string {
        return 'Twilio';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNDRjI3MkQ7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01MCw4Ni44Yy0yMC4zLDAtMzYuOC0xNi41LTM2LjgtMzYuOGMwLTIwLjMsMTYuNS0zNi44LDM2LjgtMzYuOGMyMC4zLDAsMzYuOCwxNi41LDM2LjgsMzYuOAoJCUM4Ni44LDcwLjMsNzAuMyw4Ni44LDUwLDg2LjhMNTAsODYuOHogTTUwLDBDMjIuNCwwLDAsMjIuNCwwLDUwYzAsMjcuNiwyMi40LDUwLDUwLDUwYzI3LjYsMCw1MC0yMi40LDUwLTUwQzEwMCwyMi40LDc3LjYsMCw1MCwwCgkJTDUwLDB6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTIuMSwzNy42YzAtNS43LDQuNy0xMC40LDEwLjQtMTAuNHMxMC40LDQuNywxMC40LDEwLjRjMCw1LjctNC43LDEwLjQtMTAuNCwxMC40UzUyLjEsNDMuMyw1Mi4xLDM3LjYKCQkgTTUyLjEsNjIuNGMwLTUuNyw0LjctMTAuNCwxMC40LTEwLjRzMTAuNCw0LjcsMTAuNCwxMC40YzAsNS43LTQuNywxMC40LTEwLjQsMTAuNFM1Mi4xLDY4LjIsNTIuMSw2Mi40IE0yNy4yLDYyLjQKCQljMC01LjcsNC43LTEwLjQsMTAuNC0xMC40YzUuNywwLDEwLjQsNC43LDEwLjQsMTAuNGMwLDUuNy00LjcsMTAuNC0xMC40LDEwLjRDMzEuOCw3Mi44LDI3LjIsNjguMiwyNy4yLDYyLjQgTTI3LjIsMzcuNgoJCWMwLTUuNyw0LjctMTAuNCwxMC40LTEwLjRjNS43LDAsMTAuNCw0LjcsMTAuNCwxMC40YzAsNS43LTQuNywxMC40LTEwLjQsMTAuNEMzMS44LDQ3LjksMjcuMiw0My4zLDI3LjIsMzcuNiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        const userName = applicationInstall.getSettings()[AUTHORIZATION_FORM][USER];
        const password = applicationInstall.getSettings()[AUTHORIZATION_FORM][PASSWORD];

        const headers = new Headers({
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${userName}:${password}`)}`,
        });

        return new RequestDto(url ?? BASE_URL, method, dto, data, headers);
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER, 'ACCOUNT SID', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'AUTH TOKEN', undefined, true));

        return new FormStack().addForm(form);
    }

}
