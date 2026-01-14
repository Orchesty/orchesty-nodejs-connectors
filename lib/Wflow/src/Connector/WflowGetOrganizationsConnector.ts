import ACommonConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/ACommonConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { NAME as WFLOW_APPLICATION } from '../WflowApplication';

export const NAME = `${WFLOW_APPLICATION}-get-organizations-connector`;

export default class WflowGetOrganizationsConnector extends ACommonConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const app = this.getApplication();

        const request = await app.getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            '/user/myorganizations',
        );

        const response = (await this.getSender().send<IResponse[]>(request)).getJsonBody();

        return dto.setNewJsonData(response);
    }

}

export interface IResponse {
    name: string; // show this name in the list
    baseURL: string;
    subdomain: string; // organizationId
    trialExpiration?: string;
}
