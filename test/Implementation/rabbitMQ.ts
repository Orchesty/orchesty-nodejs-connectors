import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import RabbitMqSendMessageCustomNode from '../../lib/RabbitMQ/CustomNode/RabbitMqSendMessageCustomNode';
import RabbitMqApplication, { DSN, NAME as RABBIT_MQ } from '../../lib/RabbitMQ/RabbitMqApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db } from '../TestAbstract';

export default function init(): void {
    appInstall(RABBIT_MQ, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [DSN]: `amqp://guest:guest@${process.env.RABBITMQ_HOST}:5672`,
        },
    });

    const rabbitMqApp = new RabbitMqApplication();
    container.setApplication(rabbitMqApp);

    const rabbitMqSendMessageCustomNode = new RabbitMqSendMessageCustomNode()
        .setDb(db)
        .setApplication(rabbitMqApp);

    container.setCustomNode(rabbitMqSendMessageCustomNode);
}
