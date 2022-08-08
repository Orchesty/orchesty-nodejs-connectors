import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../../test/Implementation/alza';
import { container } from '../../../../test/TestAbstract';
import { NAME as ALZA_TRACK_AND_TRACE_CONNECTOR } from '../AlzaTrackAndTraceConnector';

let tester: NodeTester;

describe('Tests for AlzaTrackAndTraceConnector', () => {
  beforeEach(async () => {
    tester = new NodeTester(container, __filename, true);
    await init();
  });

  it('process - ok', async () => {
    await tester.testConnector(ALZA_TRACK_AND_TRACE_CONNECTOR);
  });
});
