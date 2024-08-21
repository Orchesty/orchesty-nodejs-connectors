import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../../test/Implementation/flexiBee';
import { container } from '../../../../test/TestAbstract';
import { FLEXI_BEE_FORMA_DOPRAVY_BATCH } from '../FlexiBeeFormaDopravyBatch';

let tester: NodeTester;

describe('Tests for FlexiBeeFormaDopravyBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testBatch(FLEXI_BEE_FORMA_DOPRAVY_BATCH);
    });
});
