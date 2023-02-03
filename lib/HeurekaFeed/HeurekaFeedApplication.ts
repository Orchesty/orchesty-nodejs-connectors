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

export const NAME = 'heureka-feed';
export const SETTINGS = 'settings-form';
export const PRODUCT_FEED_URL = 'product-feed';
export const AVAILABILITY_FEED_URL = 'availability-feed';

export default class HeurekaFeedApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Heureka feed';
    }

    public getDescription(): string {
        return 'Heureka feed description';
    }

    public getFormStack(): FormStack {
        const form = new Form(SETTINGS, 'Feed settings')
            .addField(new Field(FieldType.URL, PRODUCT_FEED_URL, 'Product feed url', undefined, true))
            .addField(new Field(FieldType.URL, AVAILABILITY_FEED_URL, 'Availability feed url', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const productFeed = applicationInstall.getSettings()[SETTINGS][PRODUCT_FEED_URL];
        const availabilityFeed = applicationInstall.getSettings()[SETTINGS][AVAILABILITY_FEED_URL];

        return productFeed && availabilityFeed;
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
