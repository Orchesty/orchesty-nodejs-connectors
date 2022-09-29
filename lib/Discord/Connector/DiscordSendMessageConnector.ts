import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import DiscordApplication from '../DiscordApplication';

const DISCORD_SEND_MESSAGE_ENDPOINT = '/api/channels/channel.id/messages';

interface IDiscordMessage {
    title: string;
    description: string;
    color: number;
    url: string;
    channelId: string;
}

export default class DiscordSendMessageConnector extends AConnector {

    public getName(): string {
        return 'discord-send-message';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData() as Record<string, unknown>,
            ['title', 'description', 'color', 'url', 'channelId'],
        );

        const {
            title,
            description,
            color,
            url,
            channelId,
        } = dto.getJsonData() as IDiscordMessage;

        const application = this.getApplication<DiscordApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const data = {
            tts: false,
            embeds: [
                {
                    title,
                    description,
                    color,
                    image: {
                        url,
                    },
                },
            ],
        };

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            DISCORD_SEND_MESSAGE_ENDPOINT.replace('channel.id', channelId),
            JSON.stringify(data),
        );

        const response = await this.getSender().send(request, [202]);
        dto.setData(response.getBody());

        return dto;
    }

}
