import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/xero';
import { container } from '../../../../test/TestAbstract';
import { NAME as XERO_PUT_CONTACTS_CONNECTOR } from '../XeroPostContactsConnector';

let tester: NodeTester;

describe('Tests for XeroPutContactsConnector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(XERO_PUT_CONTACTS_CONNECTOR);
    });
});
