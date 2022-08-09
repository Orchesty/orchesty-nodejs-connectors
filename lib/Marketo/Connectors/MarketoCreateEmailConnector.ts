import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'marketo-create-email-connector';

export default class MarketoCreateEmailConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      '/asset/v1/emails.json',
    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

export interface IOutput {
    errors: [
        {
            code: string,
            message: string
        }
    ],
    requestId: string,
    result: {
        createdAt: Date,
        description: string,
        folder: {
            id: 0,
            type: string
        },
        fromEmail: {
            type: string,
            value: string
        },
        fromName: {
            type: string,
            value: string
        },
        id: number,
        name: string,
        operational: boolean,
        publishToMSI: boolean,
        replyEmail: {
            type: string,
            value: string
        },
        status: string,
        subject: {
            type: string,
            value: string
        },
        template: number,
        textOnly: boolean,
        updatedAt: Date,
        url: string,
        version: number,
        webView: boolean,
        workspace: string,
        autoCopyToText: boolean,
        isOpenTrackingDisabled: boolean,
        preHeader: string,
        ccFields: {
            attributeId: string,
            objectName: string,
            displayName: string,
            apiName: string
        }[]
    }[],
    success: boolean,
    warnings: string[]
}
