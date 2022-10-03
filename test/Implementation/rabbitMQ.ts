import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { PASSWORD, USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RabbitMqSendMessageConnector from '../../lib/RabbitMQ/Connector/RabbitMqSendMessageConnector';
import RabbitMqApplication, { HOST, NAME as RABBIT_BQ, PORT } from '../../lib/RabbitMQ/RabbitMqApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container, db } from '../TestAbstract';

export default async function init(): Promise<void> {
    await appInstall(RABBIT_BQ, DEFAULT_USER, {
        [AUTHORIZATION_FORM]: {
            [HOST]: '172.29.0.3',
            [PORT]: 5672,
            [USER]: 'guest',
            [PASSWORD]: 'guest',
        },
    });

    const rabbitMqApp = new RabbitMqApplication();
    container.setApplication(rabbitMqApp);

    const rabbitMqSendMessageConnector = new RabbitMqSendMessageConnector()
        .setDb(db)
        .setApplication(rabbitMqApp);

    container.setConnector(rabbitMqSendMessageConnector);
}
