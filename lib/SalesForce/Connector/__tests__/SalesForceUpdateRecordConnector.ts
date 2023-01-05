import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/salesforce';
import { container } from '../../../../test/TestAbstract';
import { NAME as SALESFORCE_UPDATE_RECORD_CONNECTOR } from '../SalesForceUpdateRecordConnector';

let tester: NodeTester;

describe('Tests for SalesForceUpdateRecord', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(SALESFORCE_UPDATE_RECORD_CONNECTOR);
    });
});
