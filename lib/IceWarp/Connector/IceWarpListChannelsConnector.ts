import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IceWarpChannel } from '../types/channel.types';

export const ICE_WARP_LIST_CHANNELS = 'ice-warp-list-channels-connector';

export default class IceWarpListChannelsConnector extends AConnector {

    public getName(): string {
        return ICE_WARP_LIST_CHANNELS;
    }

    public async processAction(
        dto: ProcessDto<IceWarpListChannelsInput>,
    ): Promise<ProcessDto<IceWarpListChannelsOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            '/teamchatapi/channels.list',
        );
        const resp = await this.getSender().send<Response>(req);

        return this.setData(dto, resp.getJsonBody());
    }

    protected setData(
        dto: ProcessDto<IceWarpListChannelsInput>,
        data: Response,
    ): ProcessDto<IceWarpListChannelsOutput> {
        return dto.setNewJsonData(data.channels);
    }

}

/* eslint-disable */

interface Response {
    channels: IceWarpChannel[];
    ok: boolean;
}

export interface IceWarpListChannelsInput {
}

export type IceWarpListChannelsOutput = IceWarpChannel[];
