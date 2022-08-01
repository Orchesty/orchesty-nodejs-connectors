import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods, { parseHttpMethod } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ABaseShoptet, { BASE_URL } from './ABaseShoptet';

export const NAME = 'shoptet-premium';

export default class ShoptetPremiumApplication extends ABaseShoptet {
  protected _authorizationHeader = 'Shoptet-Private-API-Token';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Shoptet Premium allows you to leverage Shoptet’s core and infrastructure while building a customized frontend solution and customizing add-ons, services and integrations.';

  public getName = (): string => NAME;

  public getPublicName = (): string => 'Shoptet Premium';

  public getLogo = (): string | null => 'data:image/png;base64,'
    // eslint-disable-next-line max-len
    + 'iVBORw0KGgoAAAANSUhEUgAAAHIAAABxCAYAAAAJSffTAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAtdEVYdENyZWF0aW9uIFRpbWUAV2VkIDE2IE1hciAyMDIyIDA5OjQwOjUxIEFNIENFVNcuY5YAAAFVSURBVHic7d1BCoMwAEVBI73/ldMTFCQV1OfMXhCf2Qgfx5xzbjzefvUNcA4hI4SMEDJCyAghI4SMEDJCyAghI4SM+Fx9A7/MObd9f+d7tvL5+51PKkjICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMuK2a6wxxtIq6UxXLMLGGEvXOZERQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkhJARQkYIGSFkxJgH1qSr48t/XT10fRInMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIwQMkLICCEjhIw49Lc6Y5r7cyIjhIwQMkLICCEjhIwQMkLIiC943hriZDYXygAAAABJRU5ErkJggg==';

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, TOKEN, 'Shoptet private API token', undefined, true));

    return new FormStack().addForm(form);
  };

  public getRequestDto = (
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: string | HttpMethods,
    url?: string,
    data?: string,
  ): RequestDto => {
    const headers = {
      [this._authorizationHeader]: applicationInstall.getSettings()?.[AUTHORIZATION_FORM]?.[TOKEN],
      [CommonHeaders.CONTENT_TYPE]: 'application/vnd.shoptet.v1.0',
    };

    return new RequestDto(
      `${BASE_URL}/${url}`,
      parseHttpMethod(method),
      dto,
      data,
      headers,
    );
  };
}
