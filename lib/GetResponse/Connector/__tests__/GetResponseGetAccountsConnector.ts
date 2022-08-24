import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/GetResponse';
import { container } from '../../../../test/TestAbstract';
import { NAME as GET_RESPONSE_GET_ACCOUNTS_CONNECTOR } from '../GetResponseGetAccountsConnector';

let tester: NodeTester;

describe('Tests for GetResponseGetAccountsConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(GET_RESPONSE_GET_ACCOUNTS_CONNECTOR);
    });
});
