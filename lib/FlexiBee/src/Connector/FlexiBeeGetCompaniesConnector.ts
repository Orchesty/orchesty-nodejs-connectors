import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import FlexiBeeApplication from '../FexiBeeApplication';

export const FLEXI_BEE_GET_COMPANIES_CONNECTOR = 'flexi-bee-get-companies-connector';

export default class FlexiBeeGetCompaniesConnector extends AConnector {

    public constructor(private readonly useInForm = false) {
        super();
    }

    public getName(): string {
        return FLEXI_BEE_GET_COMPANIES_CONNECTOR;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput[]>> {
        const application = this.getApplication<FlexiBeeApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto, this.useInForm ? null : true);

        const requestDto = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            `${new URL(application.getUrl(applicationInstall)).origin}/c.json`,
        );

        const responseDto = await this.getSender().send<IResponse>(requestDto);

        return dto.setNewJsonData(responseDto.getJsonBody().companies.company);
    }

}

export interface IOutput {
    createDt: string;
    dbNazev: string;
    id: string;
    licenseGroup: string;
    nazev: string;
    show: string;
    stavEnum: string;
    watchingChanges: string;
}

interface IResponse {
    companies: {
        company: IOutput[];
    };
}
