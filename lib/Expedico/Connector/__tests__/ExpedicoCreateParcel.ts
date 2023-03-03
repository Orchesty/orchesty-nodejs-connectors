import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/expedico';
import { container } from '../../../../test/TestAbstract';
import { NAME as EXPEDICO_CREATE_PARCEL } from '../ExpedicoCreateParcel';

let tester: NodeTester;

describe('Tests for ExpedicoCreateParcel', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(EXPEDICO_CREATE_PARCEL);
    });
});
