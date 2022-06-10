import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import SendGridApplication, { BASE_URL } from '../SendGridApplication';

interface IInputJson {
  email: string,
  name: string,
  subject: string,
}

export default class SendGridSendEmailConnector extends AConnector {
  public getName = (): string => 'send-grid-send-email';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
    const data = dto.jsonData as IInputJson;
    if (!(data.email && data.name && data.subject)) {
      throw new Error('Some data is missing. Keys [email, name, subject] is required.');
    }

    const body = {
      personalizations: [
        {
          to: [{
            email: data.email,
            name: data.name,
          }],
          subject: data.subject,
        },
      ],
      from:
        {
          email: 'noreply@johndoe.com',
          name: 'John Doe',
        },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      reply_to:
        {
          email: 'noreply@johndoe.com',
          name: 'John Doe',
        },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      template_id: '1',
    };

    const url = `${BASE_URL}/mail/send`;
    const request = await (this._application as SendGridApplication)
      .getRequestDto(dto, applicationInstall, HttpMethods.POST, url, JSON.stringify(body));

    const response = await this._sender.send(request);
    if (!this.evaluateStatusCode(response, dto)) {
      return dto;
    }

    dto.jsonData = response.body;
    return dto;
  }
}
