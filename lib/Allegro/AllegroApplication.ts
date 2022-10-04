import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { Headers } from 'node-fetch';

export const NAME = 'allegro';
export const ENVIRONMENT = 'Environment';

export default class AllegroApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Allegro';
    }

    public getDescription(): string {
        return 'Polish online e-commerce platform, offering products in all key categories';
    }

    public getAuthUrl(): string {
        return 'https://allegro.pl/auth/oauth/authorize';
    }

    public getTokenUrl(): string {
        return 'https://allegro.pl/auth/oauth/token';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRjVBMDA7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTguMSw0My4xYy0zLjEtNC04LjgtNC43LTEyLjgtMS42Yy0wLjYsMC41LTEuMSwxLTEuNiwxLjZjLTEuMSwxLjYtMS43LDMuNi0xLjcsNS42YzAsMiwwLjYsMy45LDEuNyw1LjYKCWMzLjEsNCw4LjgsNC43LDEyLjgsMS42YzAuNi0wLjUsMS4xLTEsMS42LTEuNmMxLjEtMS42LDEuNy0zLjYsMS43LTUuNkM5OS45LDQ2LjYsOTkuMyw0NC43LDk4LjEsNDMuMXogTTk1LjMsNTAuNwoJYy0wLjcsMi0yLjIsMy41LTQuMywzLjVjLTIuMSwwLTMuNy0xLjYtNC4zLTMuNWMtMC41LTEuNC0wLjUtMi44LDAtNC4yYzAuNy0yLDIuMi0zLjUsNC4zLTMuNXMzLjcsMS42LDQuMywzLjUKCUM5NS43LDQ3LjksOTUuNyw0OS4zLDk1LjMsNTAuN0w5NS4zLDUwLjd6IE0yOS44LDU3LjJjMCwwLjMtMC4yLDAuNS0wLjUsMC41aDBoLTNjLTAuMywwLTAuNS0wLjItMC41LTAuNWwwLDBWMzIuNwoJYzAtMC4zLDAuMi0wLjUsMC41LTAuNWwwLDBoM2MwLjMsMCwwLjUsMC4yLDAuNSwwLjVjMCwwLDAsMCwwLDBWNTcuMnogTTIyLjgsNTcuMmMwLDAuMy0wLjIsMC41LTAuNSwwLjVoMGgtMwoJYy0wLjMsMC0wLjUtMC4yLTAuNS0wLjVsMCwwVjMyLjdjMC0wLjMsMC4yLTAuNSwwLjUtMC41aDNjMC4zLDAsMC41LDAuMiwwLjUsMC41YzAsMCwwLDAsMCwwTDIyLjgsNTcuMkwyMi44LDU3LjJ6IE04MS40LDQwLjZ2Mi4xCgljMCwwLjMtMC4yLDAuNi0wLjUsMC42Yy0wLjEsMC0wLjIsMC0wLjIsMGMtMy40LTAuNy01LjUsMC44LTUuNSwzLjl2MTAuMWMwLDAuMy0wLjIsMC41LTAuNSwwLjVoLTNjLTAuMywwLTAuNS0wLjItMC41LTAuNVY0Ni45CgljMC0yLDAuOC0zLjksMi4yLTUuMmMxLjUtMS40LDMuNC0yLjIsNS41LTIuMmMwLjcsMCwxLjQsMC4xLDIuMSwwLjJDODEuMywzOS44LDgxLjQsNDAsODEuNCw0MC42TDgxLjQsNDAuNnogTTY4LjYsNDguNgoJYzAtMi0wLjYtMy45LTEuNy01LjZjLTMuMS00LTguOC00LjctMTIuOC0xLjZjLTAuNiwwLjUtMS4xLDEtMS42LDEuNmMtMi4zLDMuMy0yLjMsNy44LDAsMTEuMWMxLjcsMi4zLDQuNCwzLjYsNy4yLDMuNQoJYzEuOCwwLDMuNi0wLjUsNS4xLTEuNXYyLjJjMCwzLTIuNiwzLjUtNC4zLDMuNmMtMS4xLDAtMi4zLDAtMy40LTAuMmMtMC41LTAuMS0wLjgsMC0wLjgsMC41djIuNmMwLDAuMiwwLjIsMC40LDAuNSwwLjQKCWMwLDAsMCwwLDAsMGMzLjksMC4zLDYuNSwwLjMsOC40LTAuOWMxLjQtMC44LDIuNC0yLjEsMi45LTMuNmMwLjMtMS4yLDAuNS0yLjQsMC41LTMuNkw2OC42LDQ4LjZMNjguNiw0OC42eiBNNTkuNyw1NC4yCgljLTIuMSwwLTMuNy0xLjYtNC4zLTMuNWMtMC41LTEuNC0wLjUtMi44LDAtNC4yYzAuNy0yLDIuMi0zLjUsNC4zLTMuNWM0LjgsMCw1LDQuOSw1LDUuNlM2NC41LDU0LjIsNTkuNyw1NC4yeiBNMTYsNDYuOAoJYzAtMi40LTAuNS00LjItMS43LTUuNHMtMy40LTEuOS01LjYtMS45Yy0yLjEsMC00LjIsMC42LTYuMSwxLjZjLTAuMSwwLjEtMC4yLDAuMi0wLjIsMC4zbDAuMiwyLjZjMCwwLjMsMC4zLDAuNCwwLjUsMC40CgljMC4xLDAsMC4yLTAuMSwwLjItMC4xYzIuNi0xLjYsNS43LTEuOSw3LjMtMS4xYzAuOSwwLjUsMS40LDEuNSwxLjQsMi41djAuNEg3LjhjLTEuOSwwLTcuNiwwLjctNy42LDZ2MC4xCgljLTAuMSwxLjYsMC42LDMuMiwxLjksNC4yYzEuNCwxLDMsMS40LDQuNiwxLjNoOC44YzAuMywwLDAuNS0wLjIsMC41LTAuNWwwLDBMMTYsNDYuOEwxNiw0Ni44eiBNMTIuMiw1NC41SDcKCWMtMC43LDAtMS4zLTAuMi0xLjgtMC42Yy0wLjYtMC40LTAuOS0xLTAuOS0xLjdjMC0wLjksMC42LTIuOCwzLjgtMi44aDQuMVY1NC41eiBNNDAuOCwzOS41Yy01LjMsMC03LjYsMy42LTguNCw2LjYKCWMtMC4yLDAuOC0wLjMsMS42LTAuMywyLjVjMCwyLDAuNiwzLjksMS43LDUuNmMxLjcsMi4yLDQuNCwzLjUsNy4yLDMuNWMyLjksMC4xLDQuOC0wLjQsNi4zLTEuMmMwLjMtMC4yLDAuNC0wLjUsMC4zLTAuOXYtMi4zCgljMC0wLjUtMC4zLTAuNy0wLjctMC40Yy0xLjcsMS4xLTMuOCwxLjYtNS44LDEuNGMtMi40LDAtNC40LTEuOC00LjYtNC4yaDExLjhjMC4zLDAsMC41LTAuMiwwLjUtMC41QzQ5LDQ2LjMsNDguMSwzOS41LDQwLjgsMzkuNXoKCSBNMzYuNSw0Ni44YzAuMS0yLjIsMi0zLjksNC4yLTMuOGMwLDAsMCwwLDAuMSwwYzItMC4xLDMuNywxLjQsMy44LDMuM2MwLDAuMiwwLDAuMywwLDAuNUgzNi41eiIvPgo8L3N2Zz4K';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): Promise<RequestDto> | RequestDto {
        const environment = applicationInstall.getSettings()[AUTHORIZATION_FORM][ENVIRONMENT];
        const url = `https://api.${environment}/${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders(new Headers({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
        }));

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true))
            .addField(new Field(FieldType.TEXT, ENVIRONMENT, 'Environment', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET] && authorizationForm?.[ENVIRONMENT];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [
            'allegro:api:sale:offers:read',
            'allegro:api:sale:offers:write',
        ];
    }

}
