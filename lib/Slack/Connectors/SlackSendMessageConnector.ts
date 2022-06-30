import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import SlackApplication from '../SlackApplication';

const SLACK_SEND_MESSAGE_ENDPOINT = 'chat.postMessage';

export default class SlackSendMessageConnector extends AConnector {
  public getName = (): string => 'slack-send-message';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const {
      channel,
    } = dto.jsonData as { channel: string };
    const application = this._application as SlackApplication;
    const applicationInstall = await this._getApplicationInstall(dto.user);
    const data = {
      channel: `${channel}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hello, *${dto.user}*`,
          },
        },
      ],
    };

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      SLACK_SEND_MESSAGE_ENDPOINT,
      JSON.stringify(data),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await this._sender.send(request, [202]);

    return dto;
  }
}
