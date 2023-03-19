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

    public getDescription(): string {
        return 'Time tracking software to boost performance and get paid for every billable minute. An intuitive tool that makes time tracking painless for the entire team.';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM));
        form
            .addField(new Field(FieldType.TEXT, USER, 'username', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'password', undefined, true));

        return new FormStack().addForm(form);
    }

    public getName(): string {
        return 'toggle';
    }

    public getPublicName(): string {
        return 'Toggle';
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
