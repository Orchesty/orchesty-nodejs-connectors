import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import nodemailer, { Transporter } from 'nodemailer';

export const NAME = 'smtp';

export const CONNECTION_URL = 'connectionUrl';

export default class SmtpApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Smtp';
    }

    public getDescription(): string {
        return 'Smtp description';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CONNECTION_URL, 'Connection URL', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[CONNECTION_URL];
    }

    public getRequestDto(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
        /* eslint-enable @typescript-eslint/no-unused-vars */
    ): RequestDto {
        throw new Error('Unsupported use getConnection method instead');
    }

    public getConnection(appInstall: ApplicationInstall): Transporter {
        if (!this.isAuthorized(appInstall)) {
            throw new Error(`Application [${this.getPublicName()}] is not authorized!`);
        }

        return nodemailer.createTransport(appInstall.getSettings()[AUTHORIZATION_FORM][CONNECTION_URL]);
    }

}
