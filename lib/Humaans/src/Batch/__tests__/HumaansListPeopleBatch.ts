import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as HUMAANS_LIST_PEOPLE_BATCH } from '../HumaansListPeopleBatch';

let tester: NodeTester;

describe('Tests for HumaansListPeopleBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(HUMAANS_LIST_PEOPLE_BATCH);
    });
});
