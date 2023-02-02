import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'heureka';

export const PRODUCT_FEED_URL = 'product-feed';
export const AVAILABILITY_FEED_URL = 'availability-feed';

export default class HeurekaApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Heureka';
    }

    public getDescription(): string {
        return 'Heureka description';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, PRODUCT_FEED_URL, 'Product feed url', undefined, true))
            .addField(new Field(FieldType.TEXT, AVAILABILITY_FEED_URL, 'Availability feed url', undefined, true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: 'application/xml',
            [CommonHeaders.ACCEPT]: 'application/xml',
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
