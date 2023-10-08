import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/tempo';
import { container } from '../../../../test/TestAbstract';
import { NAME } from '../CreateWorklogConnector';

let tester: NodeTester;

describe('Tests for CreateWorklogConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(NAME);
    });
});
