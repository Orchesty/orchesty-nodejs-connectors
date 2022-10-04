import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/common';
import { container } from '../../../../test/TestAbstract';
import { NAME as EVENT_STATUS_FILTER } from '../EventStatusFilter';

let tester: NodeTester;

describe('Tests for EventStatusFilter', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testCustomNode(EVENT_STATUS_FILTER);
    });

    it('process - ok but filtered out', async () => {
        await tester.testCustomNode(EVENT_STATUS_FILTER, 'failed');
    });
});
