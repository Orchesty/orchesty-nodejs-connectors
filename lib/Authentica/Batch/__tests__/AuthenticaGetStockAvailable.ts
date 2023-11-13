import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock, regiterApiKey } from '../../../../test/Implementation/authentica';
import { container } from '../../../../test/TestAbstract';
import { NAME } from '../AuthenticaGetStockAvailable';

let tester: NodeTester;

describe('Test AuthenticaGetStockAvailable', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    beforeEach(async () => {
        mock();
        await regiterApiKey();
    });

    it('process', async () => {
        await tester.testBatch(NAME);
    });
});
