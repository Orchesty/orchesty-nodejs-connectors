import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/zoho';
import { container } from '../../../../test/TestAbstract';
import { NAME as ZOHO_ADD_RECORDS_CONNECTOR } from '../ZohoAddRecordsConnector';

let tester: NodeTester;

describe('Tests for ZohoAddRecordsConnector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ZOHO_ADD_RECORDS_CONNECTOR);
    });

    it('process - error', async () => {
        await tester.testConnector(ZOHO_ADD_RECORDS_CONNECTOR, 'error', Error);
    });
});
