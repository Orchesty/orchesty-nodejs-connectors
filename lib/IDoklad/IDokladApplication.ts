import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { BodyInit, Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';

export const BASE_URL = 'https://api.idoklad.cz/v3';

export default class IDokladApplication extends AOAuth2Application {
  public getName = (): string => 'i-doklad';

  public getPublicName = (): string => 'iDoklad';

  public getDescription = (): string => 'iDoklad Application';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iT3V0bGluZXNfLV9GdWxsX0NvbG9yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KCSB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1MHB4IiBoZWlnaHQ9IjE1MHB4IiB2aWV3Qm94PSIwIDAgMTUwIDE1MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTUwIDE1MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8ZyBpZD0iU3Byb2NrZXQiPg0KCTxnPg0KCQk8ZGVmcz4NCgkJCTxyZWN0IGlkPSJTVkdJRF8xXyIgeD0iMy4xODIiIHk9IjAiIHdpZHRoPSIxNDMuNjM2IiBoZWlnaHQ9IjE1MCIvPg0KCQk8L2RlZnM+DQoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPg0KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMV8iICBvdmVyZmxvdz0idmlzaWJsZSIvPg0KCQk8L2NsaXBQYXRoPg0KCQk8ZyBjbGlwLXBhdGg9InVybCgjU1ZHSURfMl8pIj4NCgkJCTxnPg0KCQkJCTxkZWZzPg0KCQkJCQk8cmVjdCBpZD0iU1ZHSURfM18iIHg9IjMuMTgyIiB5PSIwIiB3aWR0aD0iMTQzLjYzNiIgaGVpZ2h0PSIxNTAiLz4NCgkJCQk8L2RlZnM+DQoJCQkJPGNsaXBQYXRoIGlkPSJTVkdJRF80XyI+DQoJCQkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzNfIiAgb3ZlcmZsb3c9InZpc2libGUiLz4NCgkJCQk8L2NsaXBQYXRoPg0KCQkJCTxnIGNsaXAtcGF0aD0idXJsKCNTVkdJRF80XykiPg0KCQkJCQk8cGF0aCBmaWxsPSIjRkY3QTU5IiBkPSJNMTEzLjMwMSw0OS45MDhWMzIuMjMxYzQuNzc2LTIuMjMxLDcuODM3LTcuMDE1LDcuODYtMTIuMjg2di0wLjQxMw0KCQkJCQkJYy0wLjAyLTcuNTEzLTYuMTA1LTEzLjU5OC0xMy42MTgtMTMuNjE4aC0wLjQxM2MtNy41MTMsMC4wMi0xMy41OTgsNi4xMDUtMTMuNjE4LDEzLjYxOHYwLjQxMw0KCQkJCQkJYzAuMDIzLDUuMjcxLDMuMDg1LDEwLjA1Niw3Ljg2LDEyLjI4NnYxNy43MTRjLTYuNzI3LDEuMDI5LTEzLjA2MiwzLjgxNi0xOC4zNjUsOC4wODFsLTQ4LjYxMy0zNy44Ng0KCQkJCQkJYzIuMjEtOC4yNzYtMi43MDYtMTYuNzc2LTEwLjk4Mi0xOC45ODdTNi42MzYsMy44ODUsNC40MjUsMTIuMTYxczIuNzA2LDE2Ljc3NiwxMC45ODIsMTguOTg3DQoJCQkJCQljMy45NTcsMS4wNTcsOC4xNzEsMC41MDYsMTEuNzIzLTEuNTMzbDQ3Ljc5NiwzNy4yMDhjLTguODExLDEzLjI5Mi04LjU3NCwzMC42MjYsMC41OTcsNDMuNjczbC0xNC41NDUsMTQuNTQ1DQoJCQkJCQljLTEuMTY4LTAuMzcyLTIuMzg0LTAuNTctMy42MDktMC41ODhjLTYuOTczLDAtMTIuNjI2LDUuNjUzLTEyLjYyNiwxMi42MjZzNS42NTMsMTIuNjI2LDEyLjYyNiwxMi42MjYNCgkJCQkJCXMxMi42MjYtNS42NTMsMTIuNjI2LTEyLjYyNmwwLDBjLTAuMDE3LTEuMjI1LTAuMjE1LTIuNDQxLTAuNTg4LTMuNjA5bDE0LjM4OS0xNC4zODljMTcuMDI4LDEzLjAwNiw0MS4zNzYsOS43NDYsNTQuMzgyLTcuMjgyDQoJCQkJCQljMTMuMDA2LTE3LjAyOCw5Ljc0Ni00MS4zNzYtNy4yODItNTQuMzgyYy01LjE1NC0zLjkzNy0xMS4yMTQtNi41MTktMTcuNjI0LTcuNTEgTTEwNy4zMTQsMTA4LjE0NQ0KCQkJCQkJYy0xMC45OTUtMC4wMjUtMTkuODg4LTguOTU5LTE5Ljg2Mi0xOS45NTRzOC45NTktMTkuODg4LDE5Ljk1NC0xOS44NjJjMTAuOTgxLDAuMDI1LDE5Ljg2Nyw4LjkzNywxOS44NjIsMTkuOTE3DQoJCQkJCQljMCwxMC45OTUtOC45MTMsMTkuOTA4LTE5LjkwOCwxOS45MDgiLz4NCgkJCQk8L2c+DQoJCQk8L2c+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> {
    const headers = new Headers({
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    });

    return new RequestDto(url ?? BASE_URL, method, data, headers);
  }

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', true));

  public getAuthUrl = (): string => 'https://identity.idoklad.cz/server/connect/authorize';

  public getTokenUrl = (): string => 'https://identity.idoklad.cz/server/connect/token';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['idoklad_api', 'offline_access'];
}
