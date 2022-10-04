import { AMQPClient, AMQPQueue, QueueParams } from '@cloudamqp/amqp-client';
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

enum QueueEnum {
    CLASSIC = 'classic',
    QUORUM = 'quorum',
    STREAM = 'stream',
}

export default class RabbitMqApplication extends ABasicApplication {

    protected cache: Record<string, AMQPQueue> = {};

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

    public async getQueue(
        appInstall: ApplicationInstall,
        queue: string,
        queueParams: IQueueArguments = {},
    ): Promise<AMQPQueue> {
        const appId = appInstall.getId();
        let cachedQueue = this.cache[appId];

        if (cachedQueue === undefined) {
            const authForm = appInstall.getSettings()[AUTHORIZATION_FORM];
            const dsn = `amqp://${authForm[USER]}:${authForm[PASSWORD]}@${authForm[HOST]}:${authForm[PORT]}`;
            cachedQueue = await this.connect(dsn, queue, queueParams);
            this.cache[appId] = cachedQueue;
        } else if (cachedQueue.channel.closed || cachedQueue.channel.connection.closed) {
            try {
                await cachedQueue.channel.connection.close();
            } catch (e) {

            }
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete this.cache[appId];
        }

        return cachedQueue ?? await this.getQueue(appInstall, queue, queueParams);
    }

    private async connect(dsn: string, queue: string, queueParams: IQueueArguments): Promise<AMQPQueue> {
        const amqp = new AMQPClient(dsn);
        const conn = await amqp.connect();
        const ch = await conn.channel();
        const { params, args } = queueParams;
        const queueType = args?.['x-queue-type'] ?? QueueEnum.CLASSIC;
        if (!Object.values(QueueEnum).includes(queueType)) {
            throw Error(`Queue type: [${queueType}] is not allowed`);
        }

        return ch.queue(queue, params, args);
    }

}

export interface IQueueArguments {
    params?: QueueParams;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    args?: { 'x-queue-type': QueueEnum };
}
