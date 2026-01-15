import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../test/dataProvider';
import { FLEXI_BEE_GET_CENIK_KARTY_CONNECTOR } from '../FlexiBeeGetCenikKartyConnector';

let tester: NodeTester;

describe('Tests for FlexiBeeGetCenikKartyConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FLEXI_BEE_GET_CENIK_KARTY_CONNECTOR);
    });
});
