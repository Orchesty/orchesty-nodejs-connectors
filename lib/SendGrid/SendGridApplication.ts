import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

export const BASE_URL = 'https://api.sendgrid.com/v3';

export default class SendGridApplication extends ABasicApplication {

    public getDescription(): string {
        return 'Cloud-based email infrastructure relieves businesses of the cost and complexity of maintaining custom email systems';
    }

    public getName(): string {
        return 'send-grid';
    }

    public getPublicName(): string {
        return 'SendGrid';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iIzlERTFGMyIgZD0iTTUwLDUwSDB2MTAwaDEwMFY1MEg1MHoiLz4NCjxwYXRoIGZpbGw9IiMyN0I0RTEiIGQ9Ik01MCwwdjEwMGgxMDBWMEg1MHoiLz4NCjxwYXRoIGZpbGw9IiMxQTgyRTIiIGQ9Ik0wLDE1MGg1MHYtNTBIMFYxNTB6IE0xMDAsNTBoNTBWMGgtNTBMMTAwLDUweiIvPg0KPHBhdGggZmlsbD0iIzIzOUZENyIgZD0iTTUwLDEwMGg1MFY1MEg1MFYxMDB6Ii8+DQo8L3N2Zz4NCg==';
    }

    public getRequestDto(
        _dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): Promise<RequestDto> | RequestDto {
        if (!this.isAuthorized(applicationInstall)) {
            throw new Error('Application SendGrid is not authorized!');
        }

        const settings = applicationInstall.getSettings();
        const token = settings[AUTHORIZATION_FORM][TOKEN];
        const dto = new RequestDto(
            `${BASE_URL}${url}`,
            method,
            _dto,
            JSON.stringify({
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: `Bearer ${token}`,
            }),
        );
        if (data) {
            dto.setBody(data);
        }

        return dto;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Api key', undefined, true));

        return new FormStack().addForm(form);
    }

}
