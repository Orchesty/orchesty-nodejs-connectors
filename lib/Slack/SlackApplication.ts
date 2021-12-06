import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { TOKEN } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ACCESS_TOKEN } from 'pipes-nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { BodyInit } from 'node-fetch';

const BASE_URL = 'https://slack.com/api/';

export default class SlackApplication extends AOAuth2Application {
  public getAuthUrl = (): string => 'https://slack.com/oauth/v2/authorize';

  public getTokenUrl = (): string => 'https://slack.com/api/oauth.v2.access';

  public getDescription = (): string => 'Slack application';

  public getName = (): string => 'slack';

  public getPublicName = (): string => 'Slack';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMzNkM1RjAiIGQ9Ik01NS4wNSwwYy04LjI3LDAuMDA2LTE0Ljk2Miw2LjcxNy0xNC45NTYsMTQuOTg3DQoJCWMtMC4wMDYsOC4yNyw2LjY5MywxNC45ODEsMTQuOTYyLDE0Ljk4N2gxNC45NjJWMTQuOTkzQzcwLjAyNSw2LjcyMyw2My4zMjYsMC4wMTIsNTUuMDUsMEM1NS4wNTYsMCw1NS4wNTYsMCw1NS4wNSwwDQoJCSBNNTUuMDUsMzkuOTczSDE1LjE2M0M2Ljg5MywzOS45NzksMC4xOTUsNDYuNjksMC4yMDEsNTQuOTZjLTAuMDEyLDguMjcsNi42ODcsMTQuOTgxLDE0Ljk1NiwxNC45OTNINTUuMDUNCgkJYzguMjctMC4wMDYsMTQuOTY4LTYuNzE3LDE0Ljk2Mi0xNC45ODdDNzAuMDE5LDQ2LjY5LDYzLjMyLDM5Ljk3OSw1NS4wNSwzOS45NzNMNTUuMDUsMzkuOTczeiIvPg0KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMkVCNjdEIiBkPSJNMTQ5Ljc5OSw1NC45NmMwLjAwNi04LjI3LTYuNjkzLTE0Ljk4MS0xNC45NjItMTQuOTg3DQoJCWMtOC4yNywwLjAwNi0xNC45NjgsNi43MTctMTQuOTYyLDE0Ljk4N3YxNC45OTNoMTQuOTYyQzE0My4xMDcsNjkuOTQ2LDE0OS44MDUsNjMuMjM1LDE0OS43OTksNTQuOTZ6IE0xMDkuOTA2LDU0Ljk2VjE0Ljk4Nw0KCQlDMTA5LjkxMiw2LjcyMywxMDMuMjE5LDAuMDEyLDk0Ljk1LDBjLTguMjcsMC4wMDYtMTQuOTY4LDYuNzE3LTE0Ljk2MiwxNC45ODdWNTQuOTZjLTAuMDEyLDguMjcsNi42ODcsMTQuOTgxLDE0Ljk1NiwxNC45OTMNCgkJQzEwMy4yMTMsNjkuOTQ2LDEwOS45MTIsNjMuMjM1LDEwOS45MDYsNTQuOTZ6Ii8+DQoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNFQ0IyMkUiIGQ9Ik05NC45NDQsMTQ5Ljg5OGM4LjI3LTAuMDA2LDE0Ljk2OC02LjcxNywxNC45NjItMTQuOTg3DQoJCWMwLjAwNi04LjI3LTYuNjkzLTE0Ljk4MS0xNC45NjItMTQuOTg3SDc5Ljk4MXYxNC45ODdDNzkuOTc1LDE0My4xNzUsODYuNjc0LDE0OS44ODYsOTQuOTQ0LDE0OS44OTh6IE05NC45NDQsMTA5LjkxOWgzOS44OTMNCgkJYzguMjctMC4wMDYsMTQuOTY4LTYuNzE3LDE0Ljk2Mi0xNC45ODdjMC4wMTItOC4yNy02LjY4Ny0xNC45ODEtMTQuOTU2LTE0Ljk5M0g5NC45NWMtOC4yNywwLjAwNi0xNC45NjgsNi43MTctMTQuOTYyLDE0Ljk4Nw0KCQlDNzkuOTgxLDEwMy4yMDIsODYuNjc0LDEwOS45MTMsOTQuOTQ0LDEwOS45MTlMOTQuOTQ0LDEwOS45MTl6Ii8+DQoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNFMDFFNUEiIGQ9Ik0wLjIwMSw5NC45MzJjLTAuMDA2LDguMjcsNi42OTMsMTQuOTgxLDE0Ljk2MiwxNC45ODcNCgkJYzguMjctMC4wMDYsMTQuOTY4LTYuNzE3LDE0Ljk2Mi0xNC45ODdWNzkuOTQ2SDE1LjE2M0M2Ljg5Myw3OS45NTIsMC4xOTUsODYuNjYzLDAuMjAxLDk0LjkzMnogTTQwLjA5NCw5NC45MzJ2MzkuOTczDQoJCWMtMC4wMTIsOC4yNyw2LjY4NywxNC45ODEsMTQuOTU2LDE0Ljk5M2M4LjI3LTAuMDA2LDE0Ljk2OC02LjcxNywxNC45NjItMTQuOTg3Vjk0Ljk0NWMwLjAxMi04LjI3LTYuNjg3LTE0Ljk4MS0xNC45NTYtMTQuOTkzDQoJCUM0Ni43ODEsNzkuOTUyLDQwLjA4OCw4Ni42NjMsNDAuMDk0LDk0LjkzMkM0MC4wOTQsOTQuOTMyLDQwLjA5NCw5NC45MzksNDAuMDk0LDk0LjkzMiIvPg0KPC9nPg0KPC9zdmc+DQo=';

  public getRequestDto = (
    _dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    if (!this.isAuthorized(applicationInstall)) {
      throw new Error(`Application [${this.getPublicName()}] is not authorized!`);
    }

    const token = applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][TOKEN][ACCESS_TOKEN];
    return new RequestDto(
      new URL(url ?? BASE_URL, BASE_URL).toString(),
      method,
      data,
      {
        [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
        [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
      },
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => [
    'app_mentions:read',
    'chat:write',
    'chat:write.public',
  ];

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));
}
