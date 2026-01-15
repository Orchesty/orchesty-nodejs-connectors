import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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

export const NAME = 'recruitee';
export const API_TOKEN = 'api token';
export const YOUR_COMPANY = 'your_company';

export default class RecruiteeApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Recruitee';
    }

    public getDescription(): string {
        return 'An applicant tracking system for handling applications for jobs. It includes a careers site editing system for employer branding, a plugin for sourcing recruitment etc.';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzE5OTlFMzt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05OS42LDU5LjdjMCw2LjEtMi41LDExLjktNywxNmMtMC4zLDAuMy0wLjcsMC4zLTEsMGMtMS43LTEuNi0zLjYtMi44LTUuNy0zLjdjLTEuMy0wLjUtMy4zLTAuOC0zLjMtMi42CgljMC0wLjQsMC4xLTAuNywwLjMtMS4xYzAsMCwwLTAuMSwwLjEtMC4xYzEuNy0yLjUsMi44LTUuNCwzLjMtOC40djBjMC4xLTAuOCwwLjItMS42LDAuMi0yLjR2MGMtMC4yLTQuNS00LTgtOC41LTcuOAoJYy00LjMsMC4yLTcuNywzLjYtNy44LDcuOGwwLDBjMCwwLjgsMC4xLDEuNiwwLjIsMi40djBjMC41LDMsMS42LDUuOSwzLjMsOC40YzAsMCwwLDAuMSwwLjEsMC4xYzAuMiwwLjMsMC4zLDAuNywwLjMsMS4xCgljMCwxLjctMS45LDItMy4xLDIuNWMtMC40LDAuMi0wLjYsMC42LTAuNCwxYzAsMC4xLDAuMSwwLjIsMC4xLDAuMmMwLjUsMC42LDEsMS4yLDEuNSwxLjhjMS40LDEuOSwyLjYsMy45LDMuNiw2bDAsMAoJYzAsMCwwLDAuMSwwLDAuMWwwLDAuMWMwLDAsMCwwLjEsMCwwLjJjMCwwLjQtMC4yLDAuNy0wLjYsMC43YzAsMC0wLjEsMC0wLjIsMGMtMC4yLDAtMC40LTAuMS0wLjUtMC4yQzcwLDc3LjMsNjUuMiw3My42LDU5LDcxLjgKCWMtMC4xLDAtMC4zLTAuMS0wLjQtMC4yYy0wLjEsMC0wLjItMC4xLTAuMi0wLjJjLTEuNC0xLTEuNy0yLjgtMC45LTQuM2MxLjEtMi4xLDIuNS00LjEsMy40LTYuNGMyLjQtNS44LDMuOC0xMy0wLjEtMTguNQoJYy00LjItNS45LTEyLjMtNy4zLTE4LjItMy4xYy0wLjEsMC0wLjEsMC4xLTAuMiwwLjJjLTEuMSwwLjgtMi4xLDEuOS0yLjksM2MtMy45LDUuNS0yLjUsMTIuNy0wLjEsMTguNWMwLjksMi4zLDIuMyw0LjIsMy40LDYuNAoJYzAuOCwxLjUsMC41LDMuMy0wLjksNC4zbC0wLjIsMC4yYy0wLjEsMC4xLTAuMywwLjEtMC40LDAuMmMtNi4yLDEuOC0xMS4xLDUuNS0xNS40LDEwLjJjLTAuMSwwLjEtMC4zLDAuMi0wLjUsMC4yYzAsMC0wLjEsMC0wLjIsMAoJYy0wLjMtMC4xLTAuNi0wLjQtMC42LTAuN2MwLDAsMC0wLjEsMC0wLjJjMCwwLDAsMCwwLTAuMWMwLDAsMC0wLjEsMC0wLjFsMCwwYzEtMi4xLDIuMi00LjIsMy42LTZjMC41LTAuNiwxLTEuMiwxLjUtMS44CgljMC4zLTAuMywwLjItMC44LDAtMWMtMC4xLDAtMC4xLTAuMS0wLjItMC4xYy0xLjItMC41LTMuMS0wLjctMy4xLTIuNWMwLTAuNCwwLjEtMC43LDAuMy0xLjFjMCwwLDAtMC4xLDAuMS0wLjEKCWMxLjctMi41LDIuOC01LjQsMy4zLTguNHYwYzAuMS0wLjgsMC4yLTEuNiwwLjItMi40djBjLTAuMi00LjUtMy45LTgtOC40LTcuOGMtNC4zLDAuMi03LjcsMy42LTcuOCw3LjhsMCwwYzAsMC44LDAuMSwxLjYsMC4yLDIuNAoJdjBjMC41LDMsMS42LDUuOSwzLjMsOC40YzAsMCwwLDAuMSwwLjEsMC4xYzAuMiwwLjMsMC4zLDAuNywwLjMsMS4xYzAsMS44LTIuMSwyLjEtMy4zLDIuNmMtMi4xLDAuOS00LDIuMS01LjcsMy43CgljLTAuMywwLjMtMC43LDAuMy0xLDBDLTEuMyw2Ny43LTEuOSw1NCw2LDQ1LjJjMy41LTMuOSw4LjMtNi40LDEzLjYtN2MwLjMsMCwwLjUtMC4yLDAuNi0wLjVDMjcuMywyMSw0Ni40LDEzLjMsNjIuOCwyMC41CgljNy42LDMuMywxMy43LDkuNSwxNi45LDE3LjJjMC4xLDAuMiwwLjMsMC40LDAuNiwwLjVDOTEuMywzOS4zLDk5LjYsNDguNiw5OS42LDU5LjciLz4KPC9zdmc+Cg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, API_TOKEN, 'api token', undefined, true))
            .addField(new Field(FieldType.TEXT, YOUR_COMPANY, 'your company', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[API_TOKEN] && authorizationForm?.[YOUR_COMPANY];
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`https://${_url}`, method, dto);
        const apiToken = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][API_TOKEN];
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${apiToken}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
