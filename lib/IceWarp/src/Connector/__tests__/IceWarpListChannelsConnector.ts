import { container, redis } from '@orchesty/nodejs-connectors/test/TestAbstract';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import initIceWarp from '../../../test/dataProvider';
import { ICE_WARP_LIST_CHANNELS } from '../IceWarpListChannelsConnector';

let tester: NodeTester;

describe('Tests for IceWarpListChannelsConnector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initIceWarp();
    });

    afterAll(async () => {
        await redis.close();
    });

    it('process - ok', async () => {
        await tester.testConnector(ICE_WARP_LIST_CHANNELS);
    });
});
