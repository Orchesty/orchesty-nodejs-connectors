import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
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
        return 'SMTP';
    }

    public getDescription(): string {
        return 'The Simple Mail Transfer Protocol (SMTP) is an Internet standard communication protocol for electronic mail transmission';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMC4xNSA3MS4xIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzAxMDEwMTt9LmNscy0ye2ZpbGw6I2ZlZmVmZTt9LmNscy0ze2ZpbGw6IzIxYjA5Mjt9LmNscy00e2ZpbGw6IzM4Yjg5ZDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMCw4Ni4zN1EwLDUyLS4wNiwxNy43YzAtMS43OS4yNi0yLjQsMi4yOC0yLjM5cTQ3LjczLjEyLDk1LjQ1LDBjMS44LDAsMi40LjI1LDIuNCwyLjI4cS0uMTUsMzMuMjEsMCw2Ni40MmMwLDIuNDMtLjg4LDIuMzgtMi43MSwyLjM4UTQ4LjcxLDg2LjM0LDAsODYuMzdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjA2IC0xNS4zMSkiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik05OC4yNiwxOC4xMWMwLDIxLjkzLDAsNDIuOTEsMCw2My44OSwwLDEuNi4xNSwyLjkyLTIuMjQsMi45MS0xNi0uMDgtMzIsMC00OS4xLDAsNi42My00Ljc2LDEyLjQyLTguOTMsMTguMjItMTMuMDhRNjksNjksNzIuOTEsNjYuMjZjLjk0LS42NiwyLjA2LTEuMTYsMS0yLjYxcy0yLS4yMi0yLjc2LjM1Yy04LjY5LDYuMTYtMTcuNCwxMi4zMi0yNiwxOC41OEExMS42OCwxMS42OCwwLDAsMSwzNy42OSw4NWMtOS41My0uMTItMTkuMDcsMC0yOC42MS0uMDctMS4wNywwLTIuMjMuMzYtMy42My0uNTZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjA2IC0xNS4zMSkiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xLjgxLDgzVjE4LjE5YzMuNTYsMi40OSw2Ljc0LDQuNyw5LjkxLDYuOTRRMjguNTMsMzcsNDUuMzMsNDguODZjMS40NiwxLDIuNzQsMS42NS4zNCwzLjM0QzMxLjM1LDYyLjI5LDE3LjEyLDcyLjUzLDIuODUsODIuNzFBNC4yNSw0LjI1LDAsMCwxLDEuODEsODNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjA2IC0xNS4zMSkiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik05My4xLDE3LjY5Yy05LjUzLDcuNzMtMTkuOCwxNC40OC0yOS42MywyMS44My0zLjQ1LDIuNTgtNyw1LTEwLjQ1LDcuNi0xLjYyLDEuMjItMy4wNiwxLjQzLTQuOC4xOFEyNy41NCwzMi40Niw2LjgsMTcuNzFjLjc4LS42MywxLjctLjQxLDIuNTctLjQySDkwLjUzQTMuODMsMy44MywwLDAsMSw5My4xLDE3LjY5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wNiAtMTUuMzEpIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNOTMuMSwxNy42OWwtODYuMywwYy0uNjMtMS40OS43Mi0uODgsMS4xLS44OHE0Mi0uMDYsODQuMDgsMGE1LDUsMCwwLDEsMS4zOS4zNnMwLC4xOSwwLC4yNkExLjc2LDEuNzYsMCwwLDEsOTMuMSwxNy42OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDYgLTE1LjMxKSIvPjwvc3ZnPg==';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
            .addField(new Field(FieldType.TEXT, CONNECTION_URL, 'Connection URL', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
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

        return nodemailer.createTransport(appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][CONNECTION_URL]);
    }

}
