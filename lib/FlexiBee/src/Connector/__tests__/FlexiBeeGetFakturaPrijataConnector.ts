import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../test/dataProvider';
import { FLEXI_BEE_GET_FAKTURA_PRIJATA_CONNECTOR } from '../FlexiBeeGetFakturaPrijataConnector';

let tester: NodeTester;

describe('Tests for FlexiBeeGetFakturaPrijataConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FLEXI_BEE_GET_FAKTURA_PRIJATA_CONNECTOR);
    });
});
