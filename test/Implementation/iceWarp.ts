import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import IceWarpListChannelsConnector from '../../lib/IceWarp/Connector/IceWarpListChannelsConnector';
import IceWarpPostChatMessageConnector from '../../lib/IceWarp/Connector/IceWarpPostChatMessageConnector';
import IceWarpApplication, { ICE_WARP_APPLICATION } from '../../lib/IceWarp/IceWarpApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { cacheService, container, redis, sender } from '../TestAbstract';

export function iceWarpAppInstall(): void {
    appInstall(ICE_WARP_APPLICATION, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJY2VXYXJwX0xvZ2luIiwic3ViIjoiaGFuYWJvc29Aa3ViYS5vbmljZS5pbyIsImV4cCI6MTczMDc5NzAzNCwiaXdfYWRtaW5fdHlwZSI6MCwiaXdfaG9zdCI6Imt1YmEub25pY2UuaW8iLCJpd190eXBlIjoiYWNjZXNzIiwiaXdfaWQiOiI5MzU1OENEMkZFODgyMDQ0OTdDMDUzMTY3QzYxQzk1NyJ9.ljjEmzbnOjd86u0SXfiiP7HmhLYkG_SH5K4tpzrsIBM',
            refreshToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJJY2VXYXJwX0xvZ2luIiwic3ViIjoiaGFuYWJvc29Aa3ViYS5vbmljZS5pbyIsImV4cCI6MTczOTM1MDYzNCwiaXdfYWRtaW5fdHlwZSI6MCwiaXdfaG9zdCI6Imt1YmEub25pY2UuaW8iLCJpd190eXBlIjoicmVmcmVzaCIsIml3X2lkIjoiOTM1NThDRDJGRTg4MjA0NDk3QzA1MzE2N0M2MUM5NTcifQ.Rud5qnbXLkICRDI1cynVMWvgPTeDlLw5r0RsVWKsBHA',
        },
    });
}

export default async function initIceWarp(): Promise<void> {
    const app = container.setApplication(new IceWarpApplication(cacheService, redis, sender));

    container.setNode(new IceWarpListChannelsConnector(), app);
    container.setNode(new IceWarpPostChatMessageConnector(), app);

    await redis.set('icewarp-xoxp-TestUser', 'xoxp', 300);

    iceWarpAppInstall();
}
