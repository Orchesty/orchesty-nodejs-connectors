import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit, Headers } from 'node-fetch';
import { APP_ID, BASE_URL } from './HubSpotApplication';

export default class HubSpotApplicationBasic extends ABasicApplication {

    public getName(): string {
        return 'hub-spot-basic';
    }

    public getPublicName(): string {
        return 'HubSpot - Basic authorization';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk1LjE4IDk5LjY0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmN2E1OTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzUuNDksMzNWMjEuMDhhOS4xMyw5LjEzLDAsMCwwLDUuMjctOC4yM3YtLjI4YTkuMTQsOS4xNCwwLDAsMC05LjE0LTkuMTNoLS4yN2E5LjE0LDkuMTQsMCwwLDAtOS4xNCw5LjEzdi4yOGE5LjEzLDkuMTMsMCwwLDAsNS4yNyw4LjIzVjMzYTI1LjkxLDI1LjkxLDAsMCwwLTEyLjMsNS40MUwyMi42MywxM0E5LjczLDkuNzMsMCwwLDAsMjMsMTAuNDUsMTAuMywxMC4zLDAsMSwwLDEyLjY5LDIwLjczaDBhMTAuMjYsMTAuMjYsMCwwLDAsNS4wNy0xLjM4TDQ5LjgxLDQ0LjI4YTI2LDI2LDAsMCwwLC4zOSwyOS4yNGwtOS43NCw5Ljc1YTguNTgsOC41OCwwLDEsMCw1LjYzLDUuNjNsOS42NC05LjY1QTI2LDI2LDAsMSwwLDc1LjQ5LDMzbS00LDM5YTEzLjM0LDEzLjM0LDAsMSwxLS43MS0yNi42N2guNzFhMTMuMzQsMTMuMzQsMCwwLDEsMCwyNi42NyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIuNDEgLTAuMTQpIi8+PC9zdmc+';
    }

    public getDescription(): string {
        return 'Marketing, sales, and customer service, with a completely free CRM at its core';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): RequestDto {
        const headers = new Headers({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM]?.[TOKEN]}`,
        });

        return new RequestDto(url ?? BASE_URL, method, dto, data, headers);
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Token', null, true))
            .addField(new Field(FieldType.TEXT, APP_ID, 'Application Id', null, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        return super.isAuthorized(applicationInstall)
            && authorizationForm?.[TOKEN]
            && authorizationForm?.[APP_ID];
    }

}
