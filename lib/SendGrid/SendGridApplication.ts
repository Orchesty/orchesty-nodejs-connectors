import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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
        return 'Helps eCommerce retailers organize, process, and fulfill their orders from all the most popular marketplaces';
    }

    public getName(): string {
        return 'send-grid';
    }

    public getPublicName(): string {
        return 'SendGrid';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48c3R5bGU+LmNscy0xe2lzb2xhdGlvbjppc29sYXRlO30uY2xzLTJ7ZmlsbDojZmZmO30uY2xzLTMsLmNscy01e2ZpbGw6IzAwYjJlMzt9LmNscy0ze29wYWNpdHk6MC40O30uY2xzLTR7ZmlsbDojMWE4MmUyO30uY2xzLTV7bWl4LWJsZW5kLW1vZGU6bXVsdGlwbHk7fTwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJjbHMtMSI+PGcgaWQ9IkxheWVyXzEiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjEwMCAwIDMzLjMzIDAgMzMuMzMgMzMuMzMgMCAzMy4zMyAwIDEwMCA2Ni42NiAxMDAgNjYuNjYgNjYuNjYgMTAwIDY2LjY2IDEwMCAwIi8+PHBvbHlnb24gY2xhc3M9ImNscy0zIiBwb2ludHM9IjAgMzMuMzMgMCA2Ni42NiAzMy4zMyA2Ni42NiAzMy4zMyAxMDAgNjYuNjYgMTAwIDY2LjY2IDMzLjMzIDAgMzMuMzMiLz48cmVjdCBjbGFzcz0iY2xzLTQiIHk9IjY2LjY2IiB3aWR0aD0iMzMuMzMiIGhlaWdodD0iMzMuMzMiLz48cG9seWdvbiBjbGFzcz0iY2xzLTUiIHBvaW50cz0iNjYuNjYgMzMuMzMgNjYuNjYgMCAzMy4zMyAwIDMzLjMzIDMzLjMzIDMzLjMzIDY2LjY2IDY2LjY2IDY2LjY2IDEwMCA2Ni42NiAxMDAgMzMuMzMgNjYuNjYgMzMuMzMiLz48cmVjdCBjbGFzcz0iY2xzLTQiIHg9IjY2LjY2IiB3aWR0aD0iMzMuMzMiIGhlaWdodD0iMzMuMzMiLz48L2c+PC9nPjwvc3ZnPg==';
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
        const token = settings[CoreFormsEnum.AUTHORIZATION_FORM][TOKEN];
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
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, TOKEN, 'Api key', undefined, true));

        return new FormStack().addForm(form);
    }

}
