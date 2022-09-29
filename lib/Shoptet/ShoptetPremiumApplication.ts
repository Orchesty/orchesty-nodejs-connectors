import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods, parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ABaseShoptet, { BASE_URL } from './ABaseShoptet';

export const NAME = 'shoptet-premium';

export default class ShoptetPremiumApplication extends ABaseShoptet {

    protected authorizationHeader = 'Shoptet-Private-API-Token';

    public getDescription(): string {
        return 'Platform for team communication: everything in one place, instantly searchable, available wherever you go';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Shoptet Premium';
    }

    public getLogo(): string | null {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAABxCAYAAAAJSffTAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAtdEVYdENyZWF0aW9uIFRpbWUAV2VkIDE2IE1hciAyMDIyIDA5OjQwOjUxIEFNIENFVNcuY5YAAAFVSURBVHic7d1BCoMwAEVBI73/ldMTFCQV1OfMXhCf2Qgfx5xzbjzefvUNcA4hI4SMEDJCyAghI4SMEDJCyAghI4SM+Fx9A7/MObd9f+d7tvL5+51PKkjICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMuK2a6wxxtIq6UxXLMLGGEvXOZERQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkxJgH1qSr48t/XT10fRInMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIw49Lc6Y5r7cyIjhIwQMkLICCEjhIwQMkLIiC943hriZDYXygAAAABJRU5ErkJggg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Shoptet private API token', undefined, true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods | string,
        url?: string,
        data?: string,
    ): RequestDto {
        const headers = {
            [this.authorizationHeader]: applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[TOKEN],
            [CommonHeaders.CONTENT_TYPE]: 'application/vnd.shoptet.v1.0',
        };

        return new RequestDto(
            `${BASE_URL}/${url}`,
            parseHttpMethod(method),
            dto,
            data,
            headers,
        );
    }

}
