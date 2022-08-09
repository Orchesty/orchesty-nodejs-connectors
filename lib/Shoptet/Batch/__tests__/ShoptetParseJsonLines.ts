import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { NAME as SHOPTET_PARSE_JSON_LINES } from '../ShoptetParseJsonLines';
import { container } from '../../../../test/TestAbstract';
import init from '../../../../test/Implementation/shoptet';

let tester: NodeTester;

xdescribe('Tests for ShoptetParseJsonLines', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, false);
    await init();
  });

  it('process - ok', async () => {
    await tester.testBatch(SHOPTET_PARSE_JSON_LINES);
  });
});
