import { ABasicApplication } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import { IWebhookApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods, { parseHttpMethod } from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import WebhookSubscription from 'pipes-nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import ResponseDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';

export default class WisepopsApplication extends ABasicApplication implements IWebhookApplication {
  
  private API_KEY = 'api_key';
  private WISEPOOPS_URL = 'https://app.wisepops.com/api1/hooks';
  private EMAIL_EVENT = 'email';
  
  public getDescription(): string {
    return 'Build website popups.';
  }
  
  public getName(): string {
    return 'Wisepops';
  }
  
  public getPublicName(): string {
    return '';
  }
  
  public getRequestDto(dto: ProcessDto, applicationInstall: ApplicationInstall, method: string | HttpMethods, url?: string, data?: string): RequestDto {
    const request = new RequestDto(this.getUri(url)
    .toString(), parseHttpMethod(method));
    request.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':
        `WISEPOPS-API key="${applicationInstall.getSettings()[FORM][this.API_KEY]}"`
    };
    
    if (data) {
      request.body = data;
    }
    
    return request;
    
  }
  
  public getSettingsForm(): Form {
    return new Form().addField(new Field(FieldType.TEXT, this.API_KEY, 'API Key', undefined, true));
  }
  
  public getWebhookSubscribeRequestDto(applicationInstall: ApplicationInstall, subscription: WebhookSubscription, url: string): RequestDto {
    const request = new ProcessDto();
    return this.getRequestDto(request, applicationInstall, HttpMethods.POST, this.WISEPOOPS_URL,
      JSON.stringify({
        'target_url': url,
        'event': subscription.getParameters()['name'],
      })
    );
  }
  
  public getWebhookSubscriptions(): WebhookSubscription[] {
    return [
      new WebhookSubscription('Collected Emails', 'Webhook', '', { 'name': this.EMAIL_EVENT }),
    ];
  }
  
  public getWebhookUnsubscribeRequestDto(applicationInstall: ApplicationInstall, id: string): RequestDto {
    const request = new ProcessDto();
    return this.getRequestDto(
      request,
      applicationInstall,
      HttpMethods.DELETE,
      `${this.WISEPOOPS_URL}?hook_id=${id}`,
    );
  }
  
  public processWebhookSubscribeResponse(dto: ResponseDto, applicationInstall: ApplicationInstall): string {
    applicationInstall;
    return JSON.parse(dto.body)['id'];
  }
  
  public processWebhookUnsubscribeResponse(dto: ResponseDto): boolean {
    return dto.responseCode === 200;
  }
  
}
