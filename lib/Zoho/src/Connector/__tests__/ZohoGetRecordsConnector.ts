import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ZOHO_GET_RECORDS_CONNECTOR } from '../ZohoGetRecordsConnector';

let tester: NodeTester;

describe('Tests for ZohoGetRecordsConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ZOHO_GET_RECORDS_CONNECTOR);
    });

    it('process - error', async () => {
        await tester.testConnector(ZOHO_GET_RECORDS_CONNECTOR, 'error', Error);
    });
});
