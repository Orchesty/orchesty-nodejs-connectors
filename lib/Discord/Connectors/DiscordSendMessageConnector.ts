import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import DiscordApplication from '../DiscordApplication';

const DISCORD_SEND_MESSAGE_ENDPOINT = '/api/channels/channel.id/messages';

interface IDiscordMessage {
  title: string,
  description: string,
  color: number,
  url: string,
  channelId: string,
  userName: string,
}

export default class DiscordSendMessageConnector extends AConnector {
  public getName = (): string => 'discord-send-message';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
      dto.jsonData as Record<string, unknown>,
      ['title', 'description', 'color', 'url', 'channelId', 'userName'],
    );

    const {
      title,
      description,
      color,
      url,
      channelId,
      userName,
    } = dto.jsonData as IDiscordMessage;

    const application = this._application as DiscordApplication;
    const applicationInstall = await this._getApplicationInstall(userName);
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

    const response = await this._sender.send(request, [202]);
    dto.data = response.body;
    return dto;
  }
}
