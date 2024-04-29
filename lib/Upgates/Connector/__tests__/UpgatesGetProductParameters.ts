import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { init, mock } from '../../../../test/Implementation/upgates';
import { container } from '../../../../test/TestAbstract';
import { NAME as UPGATES_GET_PRODUCT_PARAMETERS } from '../UpgatesGetProductParameters';

let tester: NodeTester;

describe('Tests for UpgatesGetProductParameters', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        mock();
        await tester.testConnector(UPGATES_GET_PRODUCT_PARAMETERS);
    });

    it('process - ok - code + productId', async () => {
        mock();
        await tester.testConnector(UPGATES_GET_PRODUCT_PARAMETERS, 'both');
    });

    it('process - ok - empty input', async () => {
        mock();
        await tester.testConnector(UPGATES_GET_PRODUCT_PARAMETERS, 'none', Error);
    });
});
