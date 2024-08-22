import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/brani';
import { container } from '../../../../test/TestAbstract';
import { NAME as BRANI_UPSERT_ORDER } from '../BraniUpsertOrder';

let tester: NodeTester;

describe('Tests for BraniUpsertOrder', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(BRANI_UPSERT_ORDER);
    });
});
