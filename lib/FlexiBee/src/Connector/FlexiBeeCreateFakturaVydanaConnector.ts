import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication, { FLEXI_BEE_APPLICATION } from '../FexiBeeApplication';

export const NAME = `${FLEXI_BEE_APPLICATION}-create-faktura-vydana`;

export default class FlexiBeeCreateNewContactConnector extends AConnector {

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
            application.getUrl(applicationInstall, 'faktura-vydana'),
            dto.getJsonData(),
        );

        const response = await this.getSender().send(request);

        dto.setData(response.getBody());

        return dto;
    }

}
