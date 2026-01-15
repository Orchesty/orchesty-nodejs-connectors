import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as GET_RESPONSE_GET_ACCOUNTS_CONNECTOR } from '../GetResponseGetAccountsConnector';

let tester: NodeTester;

describe('Tests for GetResponseGetAccountsConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(GET_RESPONSE_GET_ACCOUNTS_CONNECTOR);
    });
});
