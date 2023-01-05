import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/allegro';
import { container } from '../../../../test/TestAbstract';
import { NAME as ALLEGRO_GET_USERS_ORDER_LIST_BATCH } from '../AllegroGetUsersOrderListBatch';

let tester: NodeTester;

describe('Tests for AllegroGetUsersOrderListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(ALLEGRO_GET_USERS_ORDER_LIST_BATCH);
    });
});
