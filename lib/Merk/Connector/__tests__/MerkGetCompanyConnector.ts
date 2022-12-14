import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/merk';
import { container } from '../../../../test/TestAbstract';
import { NAME as MERK_GET_COMPANY_CONNECTOR } from '../MerkGetCompanyConnector';

let tester: NodeTester;

describe('Tests for MerkGetCompanyConnector', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(MERK_GET_COMPANY_CONNECTOR);
    });
});
