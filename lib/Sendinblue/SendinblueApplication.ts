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

export const NAME = 'sendinblue';
export const API_KEY = 'api_key';

export default class SendinblueApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Sendinblue';
    }

    public getDescription(): string {
        return 'Cloud-based email marketing tool suited for organizations of all sizes. It offers marketing automation, email campaigns, transactional emails and SMS messages functionalities within a suite';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDkyLjg5IDk5LjYzIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzAwOTJmZjt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODcuODYsNzEuNzZhMTkuNzksMTkuNzksMCwwLDEtMTEuNjMsOS4xMiwyNywyNywwLDAsMCwxLjA3LTcuNDFBMjYuNiwyNi42LDAsMCwwLDU3LjEzLDQ3LjY1YTE5LjU3LDE5LjU3LDAsMCwxLDIzLjUyLTIuOTIsMTkuODcsMTkuODcsMCwwLDEsNy4yMSwyN20tMzcsMjEuNUExOS43NCwxOS43NCwwLDAsMSwzNy4xOCw4Ny43YTI2LjM3LDI2LjM3LDAsMCwwLDYuOS0yLjc5QTI2LjcsMjYuNywwLDAsMCw1Ni4yNCw1NC40NWExOS44LDE5LjgsMCwwLDEtNS40LDM4LjgxbS0zNy0yMS41YTIwLDIwLDAsMCwxLTItMTQuNjYsMjYuMzUsMjYuMzUsMCwwLDAsMzguMTYsMEExOS44NSwxOS44NSwwLDAsMSw0MC42OSw3OWExOS40LDE5LjQsMCwwLDEtOS44LDIuNjUsMTkuNjgsMTkuNjgsMCwwLDEtMTcuMDgtOS44OW0wLTQzYTE5Ljc1LDE5Ljc1LDAsMCwxLDExLjYzLTkuMTJBMjYuNTUsMjYuNTUsMCwwLDAsNDQuNTIsNTIuODgsMTkuNzIsMTkuNzIsMCwwLDEsMTMuODEsMjguNzdtMzctMjEuNWExOS43MSwxOS43MSwwLDAsMSwxMy42NSw1LjU2QTI2LjU5LDI2LjU5LDAsMCwwLDQ1LjQyLDQ2LjA4LDE5LjgsMTkuOCwwLDAsMSw1MC44NCw3LjI3bTM3LDIxLjVhMTkuOTQsMTkuOTQsMCwwLDEsMiwxNC42NywyNi42MSwyNi42MSwwLDAsMC01Ljg0LTQuNjIsMjYuMywyNi4zLDAsMCwwLTMyLjMyLDQuNjRBMTkuODIsMTkuODIsMCwwLDEsNjEsMjEuNTNhMTkuNjEsMTkuNjEsMCwwLDEsMjYuODgsNy4yNG01Ljg3LTMuNDFhMjYuMzUsMjYuMzUsMCwwLDAtMjEtMTMuMjMsMjYuMzYsMjYuMzYsMCwwLDAtNDMuNzgsMEEyNi42MSwyNi42MSwwLDAsMCw1LjI5LDQ1LjU1LDI3LjI5LDI3LjI5LDAsMCwwLDcsNTAuMjdhMjYuODIsMjYuODIsMCwwLDAsLjksMjQuOSwyNi4zOSwyNi4zOSwwLDAsMCwyMSwxMy4yMiwyNi4zNywyNi4zNywwLDAsMCw0My44LDAsMjYuNiwyNi42LDAsMCwwLDIxLjktMzguMTMsMjYuODYsMjYuODYsMCwwLDAtLjg5LTI0LjkyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNC4zOCAtMC40NSkiLz48L3N2Zz4=';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://api.sendinblue.com/v3/${_url}`;
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'api-key': applicationInstall.getSettings()[AUTHORIZATION_FORM][API_KEY],
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, API_KEY, 'API key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[API_KEY];
    }

}
