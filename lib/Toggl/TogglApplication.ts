import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import {
    ABasicApplication,
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

const BASE_URL = 'https://api.track.toggl.com/api/v9/me';

export default class TogglApplication extends ABasicApplication {

    public getLogo(): string {
        return 'data:image/png;base64,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';
    }

    public getDescription(): string {
        return 'Time tracking software to boost performance and get paid for every billable minute. An intuitive tool that makes time tracking painless for the entire team';
    }

    public getName(): string {
        return 'toggl';
    }

    public getPublicName(): string {
        return 'Toggl';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM));
        form
            .addField(new Field(FieldType.TEXT, USER, 'username', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'password', undefined, true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        const req = new RequestDto(`${BASE_URL}/${url}`, method, dto);
        const user = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][USER];
        const pass = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PASSWORD];

        req.addHeaders({
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`,
        });

        if (data) {
            req.setJsonBody(data);
        }

        return req;
    }

}
