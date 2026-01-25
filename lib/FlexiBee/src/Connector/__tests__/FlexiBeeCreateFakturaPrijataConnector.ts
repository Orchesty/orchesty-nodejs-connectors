import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../test/dataProvider';
import { NAME as FLEXI_BEE_CREATE_FAKTURA_PRIJATA } from '../FlexiBeeCreateFakturaPrijataConnector';

let tester: NodeTester;

describe('Tests for FlexiBeeCreateFakturaPrijataConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FLEXI_BEE_CREATE_FAKTURA_PRIJATA);
    });
});
