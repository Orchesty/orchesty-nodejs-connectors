import { AMQPChannel, AMQPClient, QueueParams } from '@cloudamqp/amqp-client';
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

export const DSN = 'dsn';

export const NAME = 'rabbit-mq';

enum QueueEnum {
    CLASSIC = 'classic',
    QUORUM = 'quorum',
    STREAM = 'stream',
}

export default class RabbitMqApplication extends ABasicApplication {

    protected cache: Record<string, Promise<ICachedChannel> | undefined> = {};

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'RabbitMQ';
    }

    public getDescription(): string {
        return 'Distributed message broker system that is fast, scalable, and durable and uses AMQP for secure transfer of message';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRjY2MDA7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTMuMiw0MEg2MS45Yy0xLjYsMC0yLjgtMS4zLTIuOC0yLjhWNC41YzAtMi40LTItNC40LTQuNC00LjRINDMuNWMtMi40LDAtNC40LDItNC40LDQuNHYzMi41CgljMCwxLjctMS40LDMuMS0zLDMuMWwtMTAuMywwYy0xLjcsMC0zLjEtMS40LTMuMS0zLjFsMC4xLTMyLjVjMC0yLjQtMi00LjQtNC40LTQuNEg3LjJjLTIuNCwwLTQuNCwyLTQuNCw0LjR2OTEuNAoJYzAsMi4xLDEuNywzLjksMy45LDMuOWg4Ni41YzIuMSwwLDMuOS0xLjcsMy45LTMuOXYtNTJDOTcuMSw0MS43LDk1LjQsNDAsOTMuMiw0MHogTTc4LjYsNzQuM2MwLDIuOC0yLjMsNS4xLTUuMSw1LjFoLTguOAoJYy0yLjgsMC01LjEtMi4zLTUuMS01LjF2LTguOGMwLTIuOCwyLjMtNS4xLDUuMS01LjFoOC44YzIuOCwwLDUuMSwyLjMsNS4xLDUuMUw3OC42LDc0LjNMNzguNiw3NC4zeiIvPgo8L3N2Zz4K';
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM));
        form.addField(new Field(FieldType.TEXT, DSN, 'dsn', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        return applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM]?.[DSN];
    }

    public getRequestDto(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): RequestDto {
        throw new Error('Unsupported, use publish or getChannel method instead');
    }

    public async publish(
        appInstall: ApplicationInstall,
        queue: string,
        body: string,
        queueParams: IQueueArguments = {},
    ): Promise<void> {
        const queueType = queueParams.args?.['x-queue-type'] ?? QueueEnum.CLASSIC;
        if (!Object.values(QueueEnum).includes(queueType)) {
            throw Error(`Queue type: [${queueType}] is not allowed`);
        }

        const cached = await this.getCachedChannel(appInstall);
        if (!cached.queues.has(queue)) {
            await this.declareQueue(cached.channel, queue, queueParams);
            cached.queues.add(queue);
        }

        await cached.channel.basicPublish('', queue, body);
    }

    public async getChannel(appInstall: ApplicationInstall): Promise<AMQPChannel> {
        return (await this.getCachedChannel(appInstall)).channel;
    }

    private async getCachedChannel(appInstall: ApplicationInstall): Promise<ICachedChannel> {
        const appId = appInstall.getId();
        const pending = this.cache[appId];
        if (pending === undefined) {
            return this.cacheChannel(appId, appInstall);
        }

        const cached = await pending;
        if (!cached.channel.closed && !cached.channel.connection.closed) {
            return cached;
        }

        const current = this.cache[appId];
        if (current === pending) {
            return this.cacheChannel(appId, appInstall, cached);
        }

        return current ?? this.cacheChannel(appId, appInstall);
    }

    private async cacheChannel(
        appId: string,
        appInstall: ApplicationInstall,
        stale?: ICachedChannel,
    ): Promise<ICachedChannel> {
        const pending = this.reconnect(appInstall, stale);
        this.cache[appId] = pending;
        try {
            return await pending;
        } catch (e) {
            if (this.cache[appId] === pending) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete this.cache[appId];
            }
            throw e;
        }
    }

    private async reconnect(appInstall: ApplicationInstall, stale?: ICachedChannel): Promise<ICachedChannel> {
        if (stale) {
            try {
                await stale.channel.connection.close();
            } catch (e) {

            }
        }

        return { channel: await this.connect(appInstall), queues: new Set<string>() };
    }

    private async connect(appInstall: ApplicationInstall): Promise<AMQPChannel> {
        const dsn = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM]?.[DSN];
        if (!dsn) {
            throw Error(`RabbitMQ [user=${appInstall.getUser()}] dsn is not set`);
        }
        const conn = await new AMQPClient(dsn).connect();
        try {
            const channel = await conn.channel();
            await channel.confirmSelect();

            return channel;
        } catch (e) {
            await conn.close();
            throw e;
        }
    }

    private async declareQueue(channel: AMQPChannel, queue: string, queueParams: IQueueArguments): Promise<void> {
        const declareChannel = await channel.connection.channel();
        try {
            await declareChannel.queueDeclare(queue, queueParams.params, queueParams.args);
        } finally {
            if (!declareChannel.closed) {
                await declareChannel.close();
            }
        }
    }

}

interface ICachedChannel {
    channel: AMQPChannel;
    queues: Set<string>;
}

export interface IQueueArguments {
    params?: QueueParams;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    args?: { 'x-queue-type': QueueEnum };
}
