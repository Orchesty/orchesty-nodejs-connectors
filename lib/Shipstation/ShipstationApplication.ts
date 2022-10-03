import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { IWebhookApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import {
    ABasicApplication,
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BodyInit } from 'node-fetch';

export const SHIPSTATION_URL = 'https://ssapi.shipstation.com';
export const ORDER_NOTIFY = 'ORDER_NOTIFY';

export default class ShipstationApplication extends ABasicApplication implements IWebhookApplication {

    public getDescription(): string {
        return 'Subscription-based software that allows anyone to set up an online store and sell their products';
    }

    public getName(): string {
        return 'shipstation';
    }

    public getPublicName(): string {
        return 'Shipstation';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzkxQzMzRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04Ni42LDYwLjJjMC4xLTAuNCwwLjQtMC42LDAuNy0wLjdsMTEuOS0xLjhjMC40LTAuMSwwLjctMC40LDAuNy0wLjh2LTE0YzAtMC40LTAuMy0wLjctMC43LTAuOAoJYy0zLjktMC42LTcuOS0xLjItMTEuOC0xLjhjLTAuNi0wLjEtMC44LTAuNC0wLjktMC45Yy0wLjgtMi44LTEuOS01LjUtMy4zLTguMWMtMC4zLTAuNi0wLjMtMC45LDAuMS0xLjRjMi4zLTMuMSw0LjYtNi4yLDYuOS05LjQKCWMwLjQtMC42LDAuNS0wLjktMC4xLTEuNWMtMy4yLTMuMS02LjMtNi4zLTkuNC05LjVjLTAuNC0wLjQtMS0wLjUtMS41LTAuMWMtMy4xLDIuNC02LjMsNC43LTkuNCw3Yy0wLjUsMC40LTAuOCwwLjQtMS40LDAKCWMtMi4zLTEuNi00LjktMi42LTcuNy0zLjJjLTAuOC0wLjItMS0wLjQtMS4xLTFjLTAuMi0xLjYtMC41LTMuMi0wLjctNC45Yy0wLjQtMi4zLTAuNy00LjYtMS4xLTYuOGMtMC4xLTAuNC0wLjQtMC43LTAuOC0wLjdINDMuMQoJYy0wLjQsMC0wLjcsMC4zLTAuOCwwLjdjLTAuNiwzLjgtMS4yLDcuNS0xLjcsMTEuM2MtMC4xLDAuOS0wLjUsMS40LTEuNiwxLjZjLTIuNSwwLjUtNC45LDEuNS03LDNjLTAuNywwLjUtMS4yLDAuNS0xLjgsMAoJYy0zLjEtMi4zLTYuMi00LjYtOS4zLTYuOWMtMC42LTAuNC0wLjktMC40LTEuNCwwLjFjLTMuMiwzLjItNi40LDYuNC05LjYsOS42Yy0wLjUsMC41LTAuNSwwLjgtMC4xLDEuM2MyLjMsMy4xLDQuNiw2LjMsNyw5LjQKCWMwLjMsMC40LDAuNSwwLjgsMC4yLDEuM2MtMS41LDIuNi0yLjcsNS40LTMuNCw4LjNjLTAuMSwwLjQtMC4zLDAuNi0wLjcsMC43Yy00LDAuNi04LDEuMi0xMiwxLjhjLTAuNCwwLjEtMC43LDAuNC0wLjcsMC44CgljMCwxLjQsMCwyLjcsMCw0LjFjMCwzLjMsMCw2LjYsMC4xLDkuOWMwLDAuNCwwLjMsMC43LDAuNywwLjhjNCwwLjYsOCwxLjIsMTIsMS44YzAuNSwwLjEsMC42LDAuNCwwLjcsMC44YzAuOCwyLjgsMS45LDUuNCwzLjMsOAoJYzAuNCwwLjcsMC4zLDEuMS0wLjEsMS43Yy0yLjMsMy00LjUsNi4xLTYuOCw5LjJjLTAuNSwwLjctMC40LDEsMC4yLDEuNmMzLjIsMy4xLDYuMyw2LjIsOS40LDkuM2MwLjYsMC42LDAuOSwwLjUsMS42LDAuMQoJYzMtMi4zLDYuMS00LjUsOS4yLTYuOGMwLjctMC41LDEtMC40LDIuMiwwLjRjMS45LDEuMiw0LDEuOSw2LjIsMi42YzEuNSwwLjUsMS45LDAuNiwyLDEuNmMwLjUsMy44LDEuMSw3LjUsMS43LDExLjMKCWMwLjEsMC40LDAuNCwwLjcsMC44LDAuN0g1N2MwLjQsMCwwLjctMC4zLDAuOC0wLjdjMC4zLTIuMSwxLjQtOC40LDEuOC0xMS43YzAuMS0wLjYsMC4zLTAuOCwwLjgtMWMyLjgtMC44LDUuNi0xLjksOC4xLTMuNAoJYzAuNS0wLjMsMC44LTAuMiwxLjMsMC4xYzMuMSwyLjQsNi4zLDQuNyw5LjQsN2MwLjUsMC40LDAuOCwwLjUsMS40LTAuMWMzLjItMy4yLDYuMy02LjQsOS42LTkuNmMwLjUtMC41LDAuNS0wLjgsMC4xLTEuNAoJYy0yLjMtMy4xLTQuNi02LjMtNy05LjRjLTAuMy0wLjMtMC41LTAuNi0wLjItMS4yQzg0LjcsNjYuMSw4NS45LDYzLjIsODYuNiw2MC4yTDg2LjYsNjAuMnogTTUwLDY2LjhjLTkuMiwwLjEtMTYuNi03LjYtMTYuNi0xNi44CgljMC05LjEsNy42LTE2LjcsMTYuNy0xNi43YzkuMiwwLDE2LjcsNy41LDE2LjYsMTYuOEM2Ni45LDU4LjMsNjAuMyw2Ni43LDUwLDY2LjhMNTAsNjYuOHoiLz4KPC9zdmc+Cg==';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): RequestDto {
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${this.getToken(applicationInstall)}`,
        });
        if (data) {
            request.setBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER, 'API Key', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'API Secret', undefined, true));

        return new FormStack().addForm(form);
    }

    public getWebhookSubscribeRequestDto(
        applicationInstall: ApplicationInstall,
        subscription: WebhookSubscription,
        url: string,
    ): RequestDto {
        const request = new ProcessDto();
        return this.getRequestDto(
            request,
            applicationInstall,
            HttpMethods.POST,
            `${SHIPSTATION_URL}/webhooks/subscribe`,
            JSON.stringify({
                name: subscription.getParameters().name,
                event: ORDER_NOTIFY,
                /* eslint-disable @typescript-eslint/naming-convention */
                target_url: url,
                store_id: undefined,
                /* eslint-enable @typescript-eslint/naming-convention */
            }),
        );
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [
            new WebhookSubscription('New order', 'Webhook', '', { name: ORDER_NOTIFY }),
        ];
    }

    public getWebhookUnsubscribeRequestDto(applicationInstall: ApplicationInstall, id: string): RequestDto {
        const request = new ProcessDto();
        return this.getRequestDto(
            request,
            applicationInstall,
            HttpMethods.DELETE,
            `${SHIPSTATION_URL}/webhooks/${id}`,
        );
    }

    public processWebhookSubscribeResponse(
        dto: ResponseDto,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        applicationInstall: ApplicationInstall,
    ): string {
        return (dto.getJsonBody() as { id: string }).id;
    }

    public processWebhookUnsubscribeResponse(dto: ResponseDto): boolean {
        return dto.getResponseCode() === 200;
    }

    private getToken(applicationInstall: ApplicationInstall): string {
        return encode(
            `${applicationInstall.getSettings()[AUTHORIZATION_FORM][USER]}:
      ${applicationInstall.getSettings()[AUTHORIZATION_FORM][PASSWORD]}`,
        );
    }

}
