import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/rabbitMQ';
import { container } from '../../../../test/TestAbstract';
import { NAME as SEND_MESSAGE_CUSTOM_NODE } from '../RabbitMqSendMessageCustomNode';

let tester: NodeTester;

describe('Tests for RabbitMqSendMessageCustomNode', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testCustomNode(SEND_MESSAGE_CUSTOM_NODE);
    });
});
