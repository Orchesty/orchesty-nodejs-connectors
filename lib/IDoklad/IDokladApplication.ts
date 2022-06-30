import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { BodyInit, Headers } from 'node-fetch';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';

export const BASE_URL = 'https://api.idoklad.cz/v3';

export default class IDokladApplication extends AOAuth2Application {
  public getName = (): string => 'i-doklad';

  public getPublicName = (): string => 'iDoklad';

  public getDescription = (): string => 'iDoklad is a web service for managing and issuing invoices.';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IlZyc3R2YV8yIj4NCgk8ZyBpZD0iVnJzdHZhXzEtMiI+DQoJCTxnIGlkPSJnVlBwVXUudGlmIj4NCgkJCTxwYXRoIGZpbGw9IiM0MzkzQ0MiIGQ9Ik0xMDYuNjcyLDE0OS43OUg4MS42MjhjLTIuMDUxLTEuMTMyLTIuNzQyLTIuOTQtMi43MzQtNS4xOWMwLTIwLjAzOCwwLTQwLjA2OCwwLTYwLjEwNg0KCQkJCWMwLTMuNzI3LDEuNDctNS4yNzgsNC45OTEtNS4yODVjOS4yODQsMCwxOC41NiwwLjA4MSwyNy44NDQsMC4xMzJjLTEuODg5LDguMDg2LTAuNzM1LDE2LjM4NC0xLjA3MywyNC41NzMNCgkJCQljLTAuMDY2LDEuOTI2LDAuMjIxLDMuOTE4LTEuMDg4LDUuNjAxYzAsMTEuNjczLTAuMDIsMjMuMzQ2LTAuMDU5LDM1LjAxOEMxMDkuNTM5LDE0Ni44MjEsMTA5LjMzMywxNDguOTYsMTA2LjY3MiwxNDkuNzl6Ii8+DQoJCQk8cGF0aCBmaWxsPSIjRkNDODJDIiBkPSJNNDMuNTAxLDBoMjQuMjU3YzIuMzYsMC45MTEsMy4xNTMsMi42MDksMy4xMzksNS4xNDVjLTAuMDc0LDIwLjEwNCwwLDQwLjIxNS0wLjA1MSw2MC4zMjYNCgkJCQljMCw0LjEyNC0xLjQwNCw1LjYwMS01LjQwMyw1LjYwOGMtMjAuMDA4LDAuMDM0LTQwLjAxMiwwLjAzNC02MC4wMSwwYy0wLjgzOCwwLTEuNzI3LDAuMTYyLTIuNDMzLTAuNQ0KCQkJCWMxLjQ3LTEuNTM2LDMuMzU5LTEuMjEzLDUuMTQ1LTEuMjJjOC4wNDItMC4wNTksMTYuMDc2LDAsMjQuMTE3LDBjNi43NjMsMCw3LjE0NS0wLjQxOSw3LjE1OS03LjM1MWMwLTUuNTk0LDAtMTEuMTk1LDAtMTYuNzg5DQoJCQkJYzAtMS43MDUtMC4wNTEtMy40MzMsMS4xMS00Ljg4MWMwLTExLjU0OCwwLjAzNy0yMy4wODgtMC4wNDQtMzQuNjM2QzQwLjUxNiwzLjE4Myw0MS4wNjgsMS4xNzYsNDMuNTAxLDB6Ii8+DQoJCQk8cGF0aCBmaWxsPSIjODJCRjY5IiBkPSJNMTQ2LjI3LDBjMS45NzksMC4yMzcsMy41MzcsMS43OTksMy43NzEsMy43NzhjLTAuMDc4LDkuNTMxLTAuMTYyLDE5LjA2Ny0wLjI1LDI4LjYwOQ0KCQkJCWMtOC41MDUtMS45MjYtMTcuMTM0LTAuODAxLTI1LjcyNy0xLjA4MWMtMS40NTUsMC4wOC0yLjkxNC0wLjAyMS00LjM0NC0wLjMwMWMtMS4yNzktMS4wMzYtMi44MDEtMC42OTEtNC4yMzQtMC43MzUNCgkJCQljLTEwLjI5MSwwLTIwLjUzLDAtMzAuNzkyLDBjLTQuNDg0LDAtNS44MjktMS4zNjctNS44OC01Ljg4YzAtNi4yMjYsMC0xMi40NTIsMC0xOC42NzhjMC0yLjY5LDAuNjg0LTQuODE1LDMuNTE0LTUuNjgyTDE0Ni4yNywwDQoJCQkJeiIvPg0KCQkJPHBhdGggZmlsbD0iI0VGN0QzOCIgZD0iTTIuMzgyLDE0OS43ODNjLTEuMTI3LTAuNjMyLTEuOTUxLTEuNjkyLTIuMjg2LTIuOTRjMC4wODgtOS44MDEsMC4xNzItMTkuNjAyLDAuMjUtMjkuNDAyDQoJCQkJYzguMDg2LDEuOTMzLDE2LjM0LDAuNzM1LDI0LjUxNCwxLjA1MWMxLjkxMSwwLjA4MSwzLjg5Ni0wLjIyOCw1LjU3MiwxLjA4MWwzNC4wNywwLjA0NGM1LjMzNywwLDYuMzQ0LDEuMDI5LDYuMzU4LDYuNDYxDQoJCQkJYzAsNi4yMTksMCwxMi40NDUsMCwxOC42NzFjMCwyLjMxNS0wLjI3OSw0LjQxLTMuMDU4LDUuMDY1TDIuMzgyLDE0OS43ODN6Ii8+DQoJCQk8cGF0aCBmaWxsPSIjNjVBRTY3IiBkPSJNMTE5Ljc1NiwzMS4wMDVjMC41MjItMC4yNjUsMS4wMzYtMC43MzUsMS41NTgtMC43MzVjNy45OTctMC4wNTksMTUuOTk1LTAuMDUxLDI0LTAuMDQ0DQoJCQkJYzEuODMsMCwzLjEwMiwxLjIxMyw0LjQ4NCwyLjIwNWMwLjA3NCwxMS43MDIsMC4xNTQsMjMuNDM0LDAuMjQzLDM1LjE5NWMtMC43ODcsMi42NjEtMi43NTYsMy40NTUtNS4zMjIsMy40NDcNCgkJCQljLTYuNjE2LDAtMTMuMTU4LDAtMTkuNzI5LDBjLTMuODc0LDAtNS4yMjYtMS40Ny01LjIzNC01LjM1MUMxMTkuNzE5LDU0LjEzLDExOS43NDksNDIuNTY3LDExOS43NTYsMzEuMDA1eiIvPg0KCQkJPHBhdGggZmlsbD0iI0Y3QUQzMCIgZD0iTTQwLjUxNiw0MC4zNTVjMCw4LjUzNCwwLjA1OSwxNy4wNjgsMCwyNS42MDljMCwzLjg4MS0xLjE3Niw1LjAyOC01LjA3Miw1LjA1DQoJCQkJQzI0LjYxLDcxLjA3MywxMy43NzUsNzEuMDgsMi45NCw3MS4xMUMxLjI1LDcwLjgzLDAuMzksNjkuNzIsMCw2OC4xMTFWNDQuMTA0YzAuNjc2LTMuMDA2LDIuNzY0LTMuNjc1LDUuNDc2LTMuNjc1DQoJCQkJQzE3LjIyMiw0MC40OCwyOC44ODgsNDAuNDI4LDQwLjUxNiw0MC4zNTV6Ii8+DQoJCQk8cGF0aCBmaWxsPSIjRUM2ODM2IiBkPSJNMzAuNDMxLDExOS41ODdjLTguMzQzLDAtMTYuNjkzLDAtMjUuMDQzLDAuMDc0Yy0yLjA4OCwwLTMuNzkzLTAuNDc4LTUuMDQzLTIuMjA1DQoJCQkJYy0wLjA3OC0xMS43NjEtMC4xNjQtMjMuNTIyLTAuMjU3LTM1LjI4M2MwLjY4NC0yLjIwNSwyLjI1Ny0yLjk5OSw0LjQ2Mi0yLjk5MmM3LjA3MSwwLDE0LjE0My0wLjA5NiwyMS4yMTQsMA0KCQkJCWMzLjQwMywwLjAzNyw0LjU3MiwxLjU2Niw0LjU4Nyw1LjYzMUMzMC40MDIsOTYuMzk2LDMwLjQwOSwxMDcuOTg4LDMwLjQzMSwxMTkuNTg3eiIvPg0KCQkJPHBhdGggZmlsbD0iIzM0NzhCOSIgZD0iTTEwOS42MTIsMTA5LjUyNGMwLTcuODcyLDAuMDY2LTE1Ljc0NS0wLjA5Ni0yMy42MTdjLTAuMDUxLTIuNTczLDAuNDM0LTQuNzM0LDIuMjU3LTYuNTU3DQoJCQkJYzExLjIzOS0wLjAzNywyMi40ODUtMC4wNDQsMzMuNzI1LTAuMTRjMi4zMDgsMCwzLjYxNiwxLjEzOSw0LjU1LDMuMDIxdjI0LjI1N2MtMS4wNjYsMi41MjktMy4wOTUsMy4wNDMtNS42NDUsMy4wMjgNCgkJCQlDMTMyLjc4OSwxMDkuNDI4LDEyMS4xODksMTA5LjUyNCwxMDkuNjEyLDEwOS41MjR6Ii8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==';

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
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    });

    return new RequestDto(url ?? BASE_URL, method, dto, data, headers);
  }

  public getFormStack = (): FormStack => {
    const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
      .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
      .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', true));

    return new FormStack().addForm(form);
  };

  public getAuthUrl = (): string => 'https://identity.idoklad.cz/server/connect/authorize';

  public getTokenUrl = (): string => 'https://identity.idoklad.cz/server/connect/token';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => ['idoklad_api', 'offline_access'];
}
