import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/openAi';
import { container } from '../../../../test/TestAbstract';
import { NAME as OPEN_AI_POST_RESPONSE_CONNECTOR } from '../OpenAIPostResponseConnector';

let tester: NodeTester;

describe('Tests for FapiPostInvoiceLabelConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(OPEN_AI_POST_RESPONSE_CONNECTOR);
    });
});
