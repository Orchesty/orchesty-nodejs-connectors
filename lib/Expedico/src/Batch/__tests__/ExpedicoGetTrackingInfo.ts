import { container } from '@orchesty/nodejs-sdk';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import init from '../../../test/dataProvider';
import { NAME as EXPEDICO_GET_TRACKING_INFO } from '../ExpedicoGetTrackingInfo';

let tester: NodeTester;

describe('Tests for ActiveCampaignListAccountsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        await tester.testBatch(EXPEDICO_GET_TRACKING_INFO);
    });
});
