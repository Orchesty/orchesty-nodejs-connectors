import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/digitoo';
import { container } from '../../../../test/TestAbstract';
import { NAME as DIGITOO_GET_DOCUMENT } from '../DigitooGetDocument';

let tester: NodeTester;

describe('Tests for DigitooGetDocument', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(DIGITOO_GET_DOCUMENT);
    });
});
