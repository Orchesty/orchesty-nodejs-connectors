import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { STORE_HASH } from '../Bigcommerce/BigcommerceApplication';

export default class AllegroApplication extends AOAuth2Application {
  public getName(): string {
    return 'allegro';
  }

  public getPublicName(): string {
    return 'Allegro';
  }

  public getDescription(): string {
    return 'Allegro description';
  }

  public getAuthUrl = (): string => 'https://allegro.pl/auth/oauth/authorize';

  public getTokenUrl = (): string => 'https://allegro.pl/auth/oauth/token';

  public getFormStack(): FormStack {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings');

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
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
    };

    if (data) {
      request.setJsonBody(data);
    }

    return request;
  }

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
      .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true))
      .addField(new Field(FieldType.TEXT, STORE_HASH, 'Store hash', null, true));

    return new FormStack()
      .addForm(form);
  };

  // public getScopes = (applicationInstall: ApplicationInstall): string[] => ['store_v2_products'];
}
