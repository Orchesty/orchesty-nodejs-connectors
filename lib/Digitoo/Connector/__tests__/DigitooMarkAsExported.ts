import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/digitoo';
import { container } from '../../../../test/TestAbstract';
import { NAME as DIGITOO_MARK_AS_EXPORTED } from '../DigitooMarkAsExported';

let tester: NodeTester;

describe('Tests for DigitooMarkAsExported', () => {
    beforeEach(async () => {
        tester = new NodeTester(container, __filename);
        await init();
    });

    it('process - ok', async () => {
        await tester.testConnector(DIGITOO_MARK_AS_EXPORTED);
    });
});
