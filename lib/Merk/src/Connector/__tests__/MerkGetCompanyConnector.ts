import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as MERK_GET_COMPANY_CONNECTOR } from '../MerkGetCompanyConnector';

let tester: NodeTester;

describe('Tests for MerkGetCompanyConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MERK_GET_COMPANY_CONNECTOR);
    });
});
