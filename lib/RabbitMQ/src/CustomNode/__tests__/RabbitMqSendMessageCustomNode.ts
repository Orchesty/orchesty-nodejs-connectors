import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as SEND_MESSAGE_CUSTOM_NODE } from '../RabbitMqSendMessageCustomNode';

let tester: NodeTester;

describe('Tests for RabbitMqSendMessageCustomNode', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testCustomNode(SEND_MESSAGE_CUSTOM_NODE);
    });
});
