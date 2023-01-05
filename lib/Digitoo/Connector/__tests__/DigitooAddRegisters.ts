import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/digitoo';
import { container } from '../../../../test/TestAbstract';
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
