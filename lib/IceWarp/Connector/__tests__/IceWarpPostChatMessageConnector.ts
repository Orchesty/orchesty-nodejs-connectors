import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import initIceWarp from '../../../../test/Implementation/iceWarp';
import { container, redis } from '../../../../test/TestAbstract';
import { ICE_WARP_POST_CHAT_MESSAGE } from '../IceWarpPostChatMessageConnector';

let tester: NodeTester;

describe('Tests for IceWarpPostChatMessageConnector', () => {
    beforeAll(async () => {
        tester = new NodeTester(container, __filename);
        await initIceWarp();
    });

    afterAll(async () => {
        await redis.close();
    });

    it('process - ok', async () => {
        await tester.testConnector(ICE_WARP_POST_CHAT_MESSAGE);
    });
});
