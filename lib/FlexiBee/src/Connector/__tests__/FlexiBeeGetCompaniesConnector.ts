import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../test/dataProvider';
import { FLEXI_BEE_GET_COMPANIES_CONNECTOR } from '../FlexiBeeGetCompaniesConnector';

let tester: NodeTester;

describe('Tests for FlexiBeeGetCompaniesConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FLEXI_BEE_GET_COMPANIES_CONNECTOR);
    });
});
