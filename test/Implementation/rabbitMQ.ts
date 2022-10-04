import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RabbitMqSendMessageCustomNode from '../../lib/RabbitMQ/CustomNode/RabbitMqSendMessageCustomNode';
import RabbitMqApplication, { HOST, NAME as RABBIT_MQ, PORT } from '../../lib/RabbitMQ/RabbitMqApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(RABBIT_MQ, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [HOST]: process.env.RABBITMQ_HOST,
            [PORT]: 5672,
            [USER]: 'guest',
            [PASSWORD]: 'guest',
        },
    });

    const rabbitMqApp = new RabbitMqApplication();
    container.setApplication(rabbitMqApp);

    const rabbitMqSendMessageCustomNode = new RabbitMqSendMessageCustomNode()
        .setDb(db)
        .setApplication(rabbitMqApp);

    container.setCustomNode(rabbitMqSendMessageCustomNode);
}
