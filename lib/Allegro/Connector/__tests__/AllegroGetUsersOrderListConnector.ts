import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { container } from '../../../test/TestAbstract';
import { NAME as ALLEGRO_GET_USERS_ORDER_LIST_CONNECTOR } from '../AllegroGetUsersOrderListConnector';

let tester: NodeTester;

describe('Tests for AllegroGetUsersOrderListConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
  });

  it('process - ok', async () => {
    await tester.testConnector(ALLEGRO_GET_USERS_ORDER_LIST_CONNECTOR);
  });
});
