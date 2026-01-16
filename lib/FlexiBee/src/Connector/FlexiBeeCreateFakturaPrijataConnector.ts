import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication, { FLEXI_BEE_APPLICATION } from '../FexiBeeApplication';

export const NAME = `${FLEXI_BEE_APPLICATION}-create-faktura-prijata`;

export default class FlexiBeeCreateFakturaPrijataConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<Record<string, string>>): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<FlexiBeeApplication>();

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            application.getUrl(applicationInstall, 'faktura-prijata'),
            dto.getJsonData(),
        );

        const response = await this.getSender().send(request);

        dto.setData(response.getBody());

        return dto;
    }

}

export interface IResponse {
  winstrom: {
    "@version": string;
    success: string;
    stats: {
      created: string;
      updated: string;
      deleted: string;
      skipped: string;
      failed: string;
    };
    results: [
      {
        id: string;
        "request-id": `ext:${string}`;
        ref: string;
      }
    ];
  };
}
