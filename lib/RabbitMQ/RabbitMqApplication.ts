import { AMQPClient } from '@cloudamqp/amqp-client';
import { AMQPQueue } from '@cloudamqp/amqp-client/types/amqp-queue';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
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

export const HOST = 'host';
export const PORT = 'port';

export const NAME = 'rabbit-mq';

export default class RabbitMqApplication extends ABasicApplication {

    protected cache: Record<string, IChannel> = {};

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'RabbitMQ';
    }

    public getDescription(): string {
        return 'RabbitMQ description';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings');
        form
            .addField(new Field(FieldType.TEXT, HOST, 'Host', undefined, true))
            .addField(new Field(FieldType.NUMBER, PORT, 'Port', undefined, true))
            .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
            .addField(new Field(FieldType.PASSWORD, PASSWORD, 'Password', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[HOST]
          && authorizationForm?.[PORT]
          && authorizationForm?.[USER]
          && authorizationForm?.[PASSWORD];
    }

    public getRequestDto(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        throw new Error('Unsupported use getChannel method instead');
    }

    public async getQueue(appInstall: ApplicationInstall, queue: string): Promise<AMQPQueue> {
        const appId = appInstall.getId();
        const cachedQueue = this.cache[appId] ?? { channel: undefined, waitForClose: false };

        if (cachedQueue.queue === undefined) {
            const authForm = appInstall.getSettings()[AUTHORIZATION_FORM];
            const dsn = `amqp://${authForm[USER]}:${authForm[PASSWORD]}@${authForm[HOST]}:${authForm[PORT]}`;
            cachedQueue.queue = await this.connect(dsn, queue, appId);
            this.cache[appId] = cachedQueue;
        }
        if (cachedQueue.waitForClose) {
            try {
                await cachedQueue.queue.channel.connection.close();
            } catch (e) {

            }

            this.cache[appId].waitForClose = false;
            this.cache[appId].queue = undefined;
        }

        return cachedQueue.queue ?? await this.getQueue(appInstall, queue);
    }

    private async connect(dsn: string, queue: string, appId: string): Promise<AMQPQueue> {
        try {
            const amqp = new AMQPClient(dsn);
            const conn = await amqp.connect();
            const ch = await conn.channel();
            return await ch.queue(queue);
            ch.
        } catch (e) {
            // e.connection.close();
            throw e;
        }
    }

}

export interface IChannel {
    queue?: AMQPQueue;
    waitForClose: boolean;
}
