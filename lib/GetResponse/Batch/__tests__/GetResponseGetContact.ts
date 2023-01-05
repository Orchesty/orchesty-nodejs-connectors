import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/GetResponse';
import { container } from '../../../../test/TestAbstract';
import { NAME as GET_RESPONSE_GET_CONTACT } from '../GetResponseGetContact';

let tester: NodeTester;

describe('Tests for GetResponseGetContact', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(GET_RESPONSE_GET_CONTACT);
    });
});
