import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { CLIENT_ID } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'mall';

export default class MallApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Mall.cz';
    }

    public getDescription(): string {
        return 'Largest Czech online marketplace, where you can find thousands of e-shops in one place and shop there for a single postage fee';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk5LjczIDk5LjczIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2NiMDAwMDt9LmNscy0ye2ZpbGw6I2ZlZmVmZTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNLjE1LDk5Ljg1cTAtNDkuNDEsMC05OC44Qy4xNC4zLjMuMTQsMS4wNS4xNFE1MCwuMTcsOTksLjE0Yy43NSwwLC45MS4xNi45MS45MXEwLDQ4Ljk1LDAsOTcuOWMwLC43NS0uMTYuOTEtLjkxLjkxUTQ5LjU1LDk5LjgzLjE1LDk5Ljg1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMTQgLTAuMTQpIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNjYuODgsNDUuMzVjLTEuNjEsNS4xNy0zLjE4LDEwLjE5LTQuNzQsMTUuMjFzLTMuMDcsOS45My00LjY0LDE0Ljg5YTguMjcsOC4yNywwLDAsMS0yLjkzLDQuNjFjLTQuNDMsMy4wNy0xMC4xOSwxLTExLjkxLTQuNC0yLjI1LTctNC4zOS0xNC02LjU4LTIxLTEtMy4wNi0xLjkxLTYuMTItMy05LjE4cS0uNDksMy4yNC0xLDYuNWMtMS4xMyw3LjM3LTIuMjMsMTQuNzUtMy40LDIyLjExYTkuMTMsOS4xMywwLDAsMS0yLjUyLDUuNSw3Ljc2LDcuNzYsMCwwLDEtNy45NSwxLjEyLDYuNjEsNi42MSwwLDAsMS0zLjY1LTYuNTNjLjQyLTUsMS40NS05LjksMi4yOC0xNC44MywxLjEzLTYuNywyLjM0LTEzLjM4LDMuNTItMjAuMDhDMjEsMzUuMTYsMjEuNjYsMzEuMDcsMjIuNTIsMjdBOS4xMiw5LjEyLDAsMCwxLDM2LDIwLjdhOC40Myw4LjQzLDAsMCwxLDMuNDUsMy43NEE1NS44LDU1LjgsMCwwLDEsNDMsMzMuODhsNi43OCwyMWMuMDUuMTUuMTIuMjkuMjcuNjUuOS0yLjc2LDEuNzItNS4zMiwyLjU2LTcuODdxMy4wOS05LjQ5LDYuMTktMTlhMjUuNzcsMjUuNzcsMCwwLDEsMS44Ni00LjI4YzIuMDctMy43OCw0LjgyLTUuMTYsOS41OC00LjU2LDQsLjUxLDYuNTksMy4yMyw3LjQzLDcuNzJDNzguODgsMzQsODAsNDAuNDcsODEuMDksNDYuOTRjMS4wOSw2LjIsMi4xOSwxMi40LDMuMjUsMTguNi40NywyLjcyLjkyLDUuNDMsMS4yLDguMTcuMzYsMy41My0xLjY0LDYuNjctNC44Miw3LjM3cy03LjA2LS4yNS04LjUyLTQuMmE0MS43NSw0MS43NSwwLDAsMS0xLjYzLTguMjdDNjkuMzksNjEsNjguMjYsNTMuNCw2Ny4xMSw0NS44QTMuNzIsMy43MiwwLDAsMCw2Ni44OCw0NS4zNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjE0IC0wLjE0KSIvPjwvc3ZnPg==';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const clientId = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CLIENT_ID];
        const url = this.getUri(`https://mpapi.mallgroup.com/v1/${_url}`);
        url.searchParams.append('client_id', clientId);

        const request = new RequestDto(url.toString(), method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID];
    }

}
