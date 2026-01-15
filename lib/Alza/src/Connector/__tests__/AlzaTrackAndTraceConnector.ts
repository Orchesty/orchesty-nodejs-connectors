import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as ALZA_TRACK_AND_TRACE_CONNECTOR } from '../AlzaTrackAndTraceConnector';

let tester: NodeTester;

describe('Tests for AlzaTrackAndTraceConnector', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename, true);
        init();
    });

    it('process - ok', async () => {
        await tester.testConnector(ALZA_TRACK_AND_TRACE_CONNECTOR);
    });
});
