import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'get-response-get-accounts-connector';

export default class GetResponseGetAccountsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            'accounts',
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IOutput {
    accountId: string;
    email: string;
    countryCode: {
        countryCodeId: string;
        countryCode: string;
    };
    industryTag: {
        industryTagId: string;
    };
    timeZone: {
        name: string;
        offset: string;
    };
    href: string;
    firstName: string;
    lastName: string;
    companyName: string;
    phone: string;
    state: string;
    city: string;
    street: string;
    zipCode: string;
    numberOfEmployees: string;
    timeFormat: string;
}
