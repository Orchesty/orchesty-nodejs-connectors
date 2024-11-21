import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IceWarpListChannelsInput } from './IceWarpListChannelsConnector';

export const ICE_WARP_POST_CHAT_MESSAGE = 'ice-warp-post-chat-message-connector';

export default class IceWarpPostChatMessageConnector extends AConnector {

    public getName(): string {
        return ICE_WARP_POST_CHAT_MESSAGE;
    }

    public async processAction(
        dto: ProcessDto<IceWarpPostChatMessageInput>,
    ): Promise<ProcessDto<IceWarpPostChatMessageOutput>> {
        const data = this.getData(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            `/teamchatapi/chat.postMessage?channel=${data.channel}&text=${encodeURIComponent(data.message)}`,
        );
        const resp = await this.getSender().send<Response>(req);

        return this.setData(dto, resp.getJsonBody());
    }

    protected getData(dto: ProcessDto<IceWarpPostChatMessageInput>): IceWarpPostChatMessageInput {
        return dto.getJsonData();
    }

    protected setData(
        dto: ProcessDto<IceWarpListChannelsInput>,
        data: Response,
    ): ProcessDto<IceWarpPostChatMessageOutput> {
        return dto.setNewJsonData(data);
    }

}

interface Response {
    ts: string;
    channel: string;
    message: string;
    ok: boolean;
}

export interface IceWarpPostChatMessageInput {
    channel: string;
    message: string;
}

export type IceWarpPostChatMessageOutput = Response;
