import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import BigQueryApplication from '../BigQueryApplication';

export const NAME = 'bigquery-list-all-datasets';
const GET_LIST_ALL_DATASETS = 'bigquery/v2/projects/{projectId}/datasets';

export default class BigQueryListAllDatasets extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        checkParams(dto.getJsonData(), ['projectId']);
        const { projectId } = dto.getJsonData();

        const application = this.getApplication<BigQueryApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            GET_LIST_ALL_DATASETS.replace('{projectId}', projectId),
        );

        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());

        return dto;
    }

}

export interface IInput {
    projectId: string;
}
