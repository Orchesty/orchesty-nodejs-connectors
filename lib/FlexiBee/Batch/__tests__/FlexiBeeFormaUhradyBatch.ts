import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../../test/Implementation/flexiBee';
import { container } from '../../../../test/TestAbstract';
import { FLEXI_BEE_FORMA_UHRADY_BATCH } from '../FlexiBeeFormaUhradyBatch';

let tester: NodeTester;

describe('Tests for FlexiBeeFormaUhradyBatch', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testBatch(FLEXI_BEE_FORMA_UHRADY_BATCH);
    });
});
