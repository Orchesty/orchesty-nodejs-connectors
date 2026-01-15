import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as DIGITOO_ADD_REGISTERS } from '../DigitooAddRegisters';

let tester: NodeTester;

describe('Tests for DigitooAddRegisters', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(DIGITOO_ADD_REGISTERS);
    });
});
