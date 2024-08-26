import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../../test/Implementation/flexiBee';
import { container } from '../../../../test/TestAbstract';
import { FLEXI_BEE_OBJEDNAVKA_PRIJATA_BATCH } from '../FlexiBeeObjednavkaPrijataBatch';

let tester: NodeTester;

describe('Tests for FlexiBeeObjednavkaPrijataBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testBatch(FLEXI_BEE_OBJEDNAVKA_PRIJATA_BATCH);
    });
});
