import { AMQPClient, AMQPQueue, QueueParams } from '@cloudamqp/amqp-client';
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

    protected cache: Record<string, AMQPQueue> = {};

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
        throw new Error('Unsupported use getQueue method instead');
    }

    public async getQueue(
        appInstall: ApplicationInstall,
        queue: string,
        queueParams: IQueueArguments = {},
    ): Promise<AMQPQueue> {
        const appId = appInstall.getId();
        let cachedQueue = this.cache[appId];
        if (cachedQueue === undefined) {
            cachedQueue = await this.connect(appInstall, queue, queueParams);
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

    private async connect(
        appInstall: ApplicationInstall,
        queue: string,
        queueParams: IQueueArguments,
    ): Promise<AMQPQueue> {
        const dsn = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM]?.[DSN];
        if (!dsn) {
            throw Error(`RabbitMQ [user=${appInstall.getUser()}] dsn is not set`);
        }
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
