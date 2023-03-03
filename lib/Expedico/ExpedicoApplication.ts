import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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

export const NAME = 'expedico';

// TODO upravit
const BASE_URL = 'https://dev.expedico.eu/api/v2/';

export default class ExpedicoApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Expedico';
    }

    public getDescription(): string {
        return 'Single point for your ecommerce parcel delivery, returns handling and fulfillment services in Europe.';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER, 'ApiKey', undefined, true))
            .addField(new Field(FieldType.PASSWORD, PASSWORD, 'Password', undefined, true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(`${BASE_URL}${url}`, method, dto);
        const user = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][USER];
        const password = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PASSWORD];

        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${encode(`${user}:${password}`)}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getLogo(): string | null {
        return 'data:image/png;base64,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';
    }

}
