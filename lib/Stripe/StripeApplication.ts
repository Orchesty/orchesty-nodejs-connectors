import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import { AUTHORIZATION_SETTINGS, FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { ACCESS_TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import { BodyInit } from 'node-fetch';

const BASE_URL = 'https://api.stripe.com';
const API_KEY = 'api_key';

export default class StripeApplication extends ABasicApplication {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Stripe is a developer-friendly way to accept payments online and in mobile apps. Stripe\'s suite of APIs powers commerce for thousands of companies of all sizes, processing billions of dollars for businesses each year.';

  public getName = (): string => 'stripe';

  public getPublicName = (): string => 'Stripe';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMzIzMjVEO30KPC9zdHlsZT4KPGcgaWQ9ImczMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU0IC0zNikiPgoJPHBhdGggaWQ9InBhdGgxOCIgY2xhc3M9InN0MCIgZD0iTTIwNCwxMTJjMC0xMC43LTUuMi0xOS4xLTE1LTE5LjFjLTkuOSwwLTE1LjksOC40LTE1LjksMTljMCwxMi41LDcuMSwxOC45LDE3LjIsMTguOQoJCWM1LDAsOC43LTEuMSwxMS41LTIuN3YtOC4zYy0yLjgsMS40LTYuMSwyLjMtMTAuMiwyLjNjLTQsMC03LjYtMS40LTguMS02LjNoMjAuNEMyMDMuOSwxMTUuMiwyMDQsMTEzLDIwNCwxMTJ6IE0xODMuNCwxMDguMQoJCWMwLTQuNywyLjktNi43LDUuNS02LjdjMi41LDAsNS4yLDIsNS4yLDYuN0gxODMuNHoiLz4KCTxwYXRoIGlkPSJwYXRoMjAiIGNsYXNzPSJzdDAiIGQ9Ik0xNTcsOTNjLTQuMSwwLTYuNywxLjktOC4yLDMuMmwtMC41LTIuNmgtOS4ydjQ4LjZsMTAuNC0yLjJsMC0xMS44YzEuNSwxLjEsMy43LDIuNiw3LjQsMi42CgkJYzcuNSwwLDE0LjItNiwxNC4yLTE5LjJDMTcxLjEsOTkuNSwxNjQuMyw5MywxNTcsOTNMMTU3LDkzeiBNMTU0LjUsMTIxLjdjLTIuNSwwLTMuOS0wLjktNC45LTJsMC0xNS41YzEuMS0xLjIsMi42LTIsNS0yCgkJYzMuOCwwLDYuNCw0LjIsNi40LDkuN0MxNjAuOSwxMTcuNSwxNTguMywxMjEuNywxNTQuNSwxMjEuN3oiLz4KCTxwYXRoIGlkPSJwb2x5Z29uMjIiIGNsYXNzPSJzdDAiIGQ9Ik0xMzUuMiw3OS44TDEyNC44LDgydjguNWwxMC41LTIuMlY3OS44eiIvPgoJPHBhdGggaWQ9InJlY3QyNCIgY2xhc3M9InN0MCIgZD0iTTEyNC44LDkzLjdoMTAuNXYzNi41aC0xMC41VjkzLjd6Ii8+Cgk8cGF0aCBpZD0icGF0aDI2IiBjbGFzcz0ic3QwIiBkPSJNMTEzLjUsOTYuN2wtMC43LTMuMWgtOXYzNi41aDEwLjR2LTI0LjdjMi41LTMuMiw2LjYtMi42LDcuOS0yLjJ2LTkuNgoJCUMxMjAuOSw5My4yLDExNiw5Mi4yLDExMy41LDk2LjdMMTEzLjUsOTYuN3oiLz4KCTxwYXRoIGlkPSJwYXRoMjgiIGNsYXNzPSJzdDAiIGQ9Ik05Mi43LDg0LjZsLTEwLjIsMi4ybDAsMzMuNGMwLDYuMiw0LjYsMTAuNywxMC44LDEwLjdjMy40LDAsNS45LTAuNiw3LjMtMS40VjEyMQoJCWMtMS4zLDAuNS03LjksMi41LTcuOS0zLjd2LTE0LjhoNy45di04LjloLTcuOUw5Mi43LDg0LjZ6Ii8+Cgk8cGF0aCBpZD0icGF0aDMwIiBjbGFzcz0ic3QwIiBkPSJNNjQuNSwxMDQuMmMwLTEuNiwxLjMtMi4yLDMuNS0yLjJjMy4yLDAsNy4yLDEsMTAuMywyLjd2LTkuOEM3NSw5My41LDcxLjUsOTMsNjguMSw5MwoJCUM1OS42LDkzLDU0LDk3LjQsNTQsMTA0LjdjMCwxMS41LDE1LjgsOS43LDE1LjgsMTQuNmMwLDEuOS0xLjcsMi41LTQsMi41Yy0zLjUsMC03LjktMS40LTExLjQtMy4zdjkuOWMzLjksMS43LDcuOCwyLjQsMTEuNCwyLjQKCQljOC43LDAsMTQuNi00LjMsMTQuNi0xMS44QzgwLjQsMTA2LjcsNjQuNSwxMDguOSw2NC41LDEwNC4yTDY0LjUsMTA0LjJ6Ii8+CjwvZz4KPC9zdmc+Cg==';

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

    const apiKey = applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][FORM][ACCESS_TOKEN];
    return new RequestDto(
      new URL(url ?? BASE_URL, BASE_URL).toString(),
      method,
      _dto,
      data,
      {
        [CommonHeaders.CONTENT_TYPE]: 'application/x-www-form-urlencoded',
        [CommonHeaders.AUTHORIZATION]: `Bearer ${apiKey}`,
      },
    );
  };

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, API_KEY, 'API Key', undefined, true));
}
