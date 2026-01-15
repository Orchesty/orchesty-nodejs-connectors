import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as BRANI_UPSERT_PRODUCT } from '../BraniUpsertProduct';

let tester: NodeTester;

describe('Tests for BraniUpsertProduct', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(BRANI_UPSERT_PRODUCT);
    });
});
