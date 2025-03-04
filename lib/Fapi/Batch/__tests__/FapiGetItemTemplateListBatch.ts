import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/fapi';
import { container } from '../../../../test/TestAbstract';
import { NAME as FAPI_GET_ITEM_TEMPLATE_LIST_BATCH } from '../FapiGetItemTemplateListBatch';

let tester: NodeTester;

describe('Tests for FapiGetItemTemplateListBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(FAPI_GET_ITEM_TEMPLATE_LIST_BATCH);
    });
});
