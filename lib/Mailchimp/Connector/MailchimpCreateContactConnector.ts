import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { FORM } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { API_KEYPOINT, AUDIENCE_ID } from '../MailchimpApplication';

export default class MailchimpCreateContactConnector extends AConnector {
  public getName = (): string => 'mailchimp-create-contact';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const applicationInstall = await this._getApplicationInstallFromHeaders(dto);
    const apiEndpoint = applicationInstall.getSettings()[API_KEYPOINT];

    const output = await this._sender.send(
      await this._application.getRequestDto(
        dto,
        applicationInstall,
        HttpMethods.POST,
        `${apiEndpoint}/3.0/lists/${applicationInstall.getSettings()[FORM][AUDIENCE_ID]}/members/`,
        dto.data,
      ),
    );

    const json = output.jsonBody as { type: unknown, detail: unknown, instance: unknown };

    delete json.type;
    delete json.detail;
    delete json.instance;

    this.evaluateStatusCode(output, dto);

    dto.jsonData = json;

    return dto;
  }
}
