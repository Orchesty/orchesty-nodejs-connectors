import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/tempo';
import { container } from '../../../../test/TestAbstract';
import { NAME } from '../UpdateWorklogConnector';

let tester: NodeTester;

describe('Tests for UpdateWorklogConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
    });

    it('process - ok', async () => {
        init();
        mock();
        await tester.testConnector(NAME);
    });
});
