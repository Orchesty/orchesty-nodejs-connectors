import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/shoptet';
import { container } from '../../../../test/TestAbstract';
import { NAME as SHOPTET_PARSE_JSON_LINES } from '../ShoptetParseJsonLines';

let tester: NodeTester;

describe('Tests for ShoptetParseJsonLines', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename, false);
        await init();
    });

    it.skip('process - ok', async () => {
        await tester.testBatch(SHOPTET_PARSE_JSON_LINES);
    });
});
