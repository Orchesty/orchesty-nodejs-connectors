import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';

export default class FlexiBeeGetContactsArrayConnector extends AConnector {

    public getName(): string {
        return 'flexibee-get-contacts-array';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const application = this.getApplication<FlexiBeeApplication>();
        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            application.getUrl(applicationInstall, 'kontakt.json'),
        );
        const response = await this.getSender().send(request);
        this.evaluateStatusCode(response, dto);
        dto.setData(response.getBody());

        return dto;
    }

}
