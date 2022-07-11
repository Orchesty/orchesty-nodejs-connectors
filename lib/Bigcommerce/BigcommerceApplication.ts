import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { BodyInit, Headers } from 'node-fetch';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';

export const BASE_URL = 'https://api.bigcommerce.com/stores';
export const HASH_FORM = 'hash_form';
export const STORE_HASH = 'store_hash';
export const NAME = 'bigcommerce';

export default class BigcommerceApplication extends AOAuth2Application {
  public getName = (): string => NAME;

  public getPublicName = (): string => 'Bigcommerce';

  // eslint-disable-next-line max-len
  public getDescription = (): string => 'BigCommerce is an e-commerce platform that provides an all-encompassing solution for a business online store. If you\'re trying to sell physical goods online, you\'ll want to check out Bigcommerce.';

  public getAuthUrl = (): string => 'https://login.bigcommerce.com/oauth2/authorize';

  public getTokenUrl = (): string => 'https://login.bigcommerce.com/oauth2/token';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGFhZ18xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI0ODkuMiAyNDg3LjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0ODkuMiAyNDg3LjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMzNDMxM0Y7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMzExLjUsMTQxNi4yaDMxNGM4OS4zLDAsMTQ1LjgtNDkuMSwxNDUuOC0xMjhjMC03NC40LTU2LjUtMTI4LTE0NS44LTEyOGgtMzE0Yy0xMC40LDAtMTkuMyw4LjktMTkuMywxNy45DQoJCXYyMjAuMkMxMjkzLjYsMTQwOC43LDEzMDEsMTQxNi4yLDEzMTEuNSwxNDE2LjJ6IE0xMzExLjUsMTkyMy42aDMyNC40Yzk5LjcsMCwxNTkuMi01MC42LDE1OS4yLTEzOS45DQoJCWMwLTc3LjQtNTYuNS0xMzkuOS0xNTkuMi0xMzkuOWgtMzI0LjRjLTEwLjQsMC0xOS4zLDguOS0xOS4zLDE3Ljl2MjQyLjZDMTI5My42LDE5MTYuMiwxMzAxLDE5MjMuNiwxMzExLjUsMTkyMy42eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNDYwLjMsNS41bC05MjguNiw5MjUuNmgxNTEuOGMyMzYuNiwwLDM3Ni41LDE0OC44LDM3Ni41LDMxMWMwLDEyOC04Ni4zLDIyMS43LTE3OC42LDI2My40DQoJCWMtMTQuOSw2LTE0LjksMjYuOCwxLjUsMzIuN2MxMDcuMSw0MS43LDE4MywxNTMuMywxODMsMjg0LjJjMCwxODQuNS0xMjMuNSwzMzEuOC0zNjMuMSwzMzEuOGgtNjU3LjdjLTEwLjQsMC0xOS4zLTguOS0xOS4zLTE3LjkNCgkJdi03MDAuOUw2LjQsMjQ1MC40Yy0xMy40LDEzLjQtNC41LDM3LjIsMTQuOSwzNy4yaDI0NTAuOWM4LjksMCwxNi40LTcuNCwxNi40LTE2LjRWMTguOUMyNDkzLDIuNSwyNDcyLjItNi40LDI0NjAuMyw1LjV6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==';

  public getRequestDto(
    dto: AProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> {
    const headers = new Headers({
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `OAuth ${this.getAccessToken(applicationInstall)}`,
    });
    if (url) {
      return new RequestDto(url, method, dto, data, headers);
    }
    throw Error('Url is empty');
  }

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
      .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

    const hashForm = new Form(HASH_FORM, 'Store Hash')
      .addField(new Field(FieldType.TEXT, STORE_HASH, 'Store hash', null, true));

    return new FormStack()
      .addForm(form)
      .addForm(hashForm);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['store_v2_products'];
}
