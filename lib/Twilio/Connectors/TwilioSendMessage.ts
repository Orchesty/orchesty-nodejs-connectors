import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { USER } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import FormData from 'form-data';
import { BASE_URL } from '../TwilioApplication';

const TWILIO_SEND_MESSAGE_ENDPOINT = 'Accounts/{AccountSid}/Messages';

interface ITwilioMessage {
  userName: string,
  body: string,
  from: string,
  statusCallback: string,
  to: string,
}

export default class TwilioSendMessage extends AConnector {
  public getName = (): string => 'twilio-send-message';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
        dto.jsonData as Record<string, unknown>,
        ['body', 'from', 'to', 'userName'],
    );

    const {
      userName,
      body,
      from,
      to,
    } = dto.jsonData as ITwilioMessage;

    const applicationInstall = await this._getApplicationInstall(userName);

    const form = new FormData();
    form.append('From', from);
    form.append('To', to);
    form.append('Body', body);

    const request = await this._application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      `${BASE_URL}/${TWILIO_SEND_MESSAGE_ENDPOINT.replace(
        '{AccountSid}',
        applicationInstall.getSettings()[FORM][USER],
      )}`,
      form,
    );

    const response = await this._sender.send(request, [201]);
    dto.data = response.body;
    return dto;
  }
}
