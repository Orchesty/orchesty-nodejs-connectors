import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import SlackApplication from '../SlackApplication';

const SLACK_SEND_MESSAGE_ENDPOINT = 'chat.postMessage';

export default class SlackSendMessageConnector extends AConnector {

    public getName(): string {
        return 'slack-send-message';
    }

    public async processAction(dto: ProcessDto<{ channel: string }>): Promise<ProcessDto> {
        const { channel } = dto.getJsonData();
        const application = this.getApplication<SlackApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const data = {
            channel,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `Hello, *${dto.getUser()}*`,
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
        const response = await this.getSender().send(request, [202]);

        return dto;
    }

}
