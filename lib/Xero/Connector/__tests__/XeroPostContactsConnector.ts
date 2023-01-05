import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/xero';
import { container } from '../../../../test/TestAbstract';
import { NAME as XERO_PUT_CONTACTS_CONNECTOR } from '../XeroPostContactsConnector';

let tester: NodeTester;

describe('Tests for XeroPutContactsConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(XERO_PUT_CONTACTS_CONNECTOR);
    });
});
