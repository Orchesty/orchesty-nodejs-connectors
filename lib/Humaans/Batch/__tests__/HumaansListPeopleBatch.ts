import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/humaans';
import { container } from '../../../../test/TestAbstract';
import { NAME as HUMAANS_LIST_PEOPLE_BATCH } from '../HumaansListPeopleBatch';

let tester: NodeTester;

describe('Tests for HumaansListPeopleBatch', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testBatch(HUMAANS_LIST_PEOPLE_BATCH);
    });
});
