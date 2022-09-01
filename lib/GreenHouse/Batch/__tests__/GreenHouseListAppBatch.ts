import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/greenHouse';
import { container } from '../../../../test/TestAbstract';
import { NAME as GREEN_HOUSE_LIST_APP_BATCH } from '../GreenHouseListAppBatch';

let tester: NodeTester;

describe('Tests for GreenHouseListAppBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(GREEN_HOUSE_LIST_APP_BATCH);
    });
});
