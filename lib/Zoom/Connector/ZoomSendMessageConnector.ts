import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import ZoomApplication from '../ZoomApplication';

const ZOOM_SEND_MESSAGE_ENDPOINT = '/v2/chat/users/replace_me/messages';

interface IZoomMessage {
  userName: string,
  toChannel: string,
  message: string,
  userId: string
}

export default class ZoomSendMessageConnector extends AConnector {
  public getName = (): string => 'zoom-send-message';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { jsonData } = dto;
    checkParams(
      jsonData as Record<string, unknown>,
      ['userName', 'toChannel', 'message', 'userId'],
    );

    const {
      userName,
      toChannel,
      message,
      userId,
    } = jsonData as IZoomMessage;

    const data = {
      message,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      to_channel: toChannel,
    };

    const application = this._application as ZoomApplication;
    const applicationInstall = await this._getApplicationInstall(userName);

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      ZOOM_SEND_MESSAGE_ENDPOINT.replace('replace_me', userId),
      JSON.stringify(data),
    );

    const response = await this._sender.send(request, [201]);
    dto.data = response.body;
    return dto;
  }
}
