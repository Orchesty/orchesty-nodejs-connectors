import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import { BASE_URL } from '../IDokladApplication';

export default class IDokladCreateNewContactConnector extends AConnector {

    public getName(): string {
        return 'i-doklad-create-new-contact';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        checkParams(dto.getJsonData() as Record<string, unknown>, ['CompanyName', 'CountryId', 'Name']);

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            `${BASE_URL}/Contacts`,
            dto.getData(),
        );

        const response = await this.getSender().send(request, { success: '200-201' }, 10);
        dto.setData(response.getBody());

        return dto;
    }

}
