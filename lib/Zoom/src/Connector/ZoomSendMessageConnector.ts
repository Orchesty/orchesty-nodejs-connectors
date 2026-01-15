import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import ZoomApplication from '../ZoomApplication';

const ZOOM_SEND_MESSAGE_ENDPOINT = '/v2/chat/users/replace_me/messages';

interface IZoomMessage {
    toChannel: string;
    message: string;
    userId: string;
}

export default class ZoomSendMessageConnector extends AConnector {

    public getName(): string {
        return 'zoom-send-message';
    }

    public async processAction(dto: ProcessDto<IZoomMessage>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['toChannel', 'message', 'userId'],
        );

        const {
            toChannel,
            message,
            userId,
        } = dto.getJsonData();

        const data = {
            message,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            to_channel: toChannel,
        };

        const application = this.getApplication<ZoomApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            ZOOM_SEND_MESSAGE_ENDPOINT.replace('replace_me', userId),
            JSON.stringify(data),
        );

        const response = await this.getSender().send(request, [201]);
        dto.setData(response.getBody());

        return dto;
    }

}
