import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../test/dataProvider';
import { FLEXI_BEE_OBJEDNAVKA_VYDANA_BATCH } from '../FlexiBeeObjednavkaVydanaBatch';

let tester: NodeTester;

describe('Tests for FlexiBeeObjednavkaVydanaBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testBatch(FLEXI_BEE_OBJEDNAVKA_VYDANA_BATCH);
    });
});
