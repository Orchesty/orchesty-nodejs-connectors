import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/xero';
import { container } from '../../../../test/TestAbstract';
import { NAME as XERO_FIND_CONTACT_CONNECTOR } from '../XeroFindContactConnector';

let tester: NodeTester;

describe('Tests for XeroFindContactConnector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(XERO_FIND_CONTACT_CONNECTOR);
    });

    it('process - 404', async () => {
        await tester.testConnector(XERO_FIND_CONTACT_CONNECTOR, '404');
    });
});
