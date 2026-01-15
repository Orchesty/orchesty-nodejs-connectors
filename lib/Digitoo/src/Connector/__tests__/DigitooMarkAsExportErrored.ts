import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as DIGITOO_MARK_AS_EXPORT_ERRORED } from '../DigitooMarkAsExportErrored';

let tester: NodeTester;

describe('Tests for DigitooMarkAsExportErrored', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(DIGITOO_MARK_AS_EXPORT_ERRORED);
    });
});
