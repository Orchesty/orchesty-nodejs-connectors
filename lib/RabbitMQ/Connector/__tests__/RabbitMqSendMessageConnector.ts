import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/rabbitMQ';
import { container } from '../../../../test/TestAbstract';
import { NAME as SEND_MESSAGE_CONNECTOR } from '../RabbitMqSendMessageConnector';

let tester: NodeTester;

describe('Tests for RabbitMqSendMessageConnector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SEND_MESSAGE_CONNECTOR);
    });
});
