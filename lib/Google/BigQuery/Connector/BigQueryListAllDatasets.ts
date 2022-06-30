import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BigQueryApplication from '../BigQueryApplication';

export const NAME = 'bigquery-list-all-datasets';
const GET_LIST_ALL_DATASETS = 'bigquery/v2/projects/{projectId}/datasets';

export default class BigQueryListAllDatasets extends AConnector {
  public getName = (): string => NAME;

  public processAction = async (_dto: ProcessDto): Promise<ProcessDto> => {
    const dto = _dto;

    checkParams(
          dto.jsonData as Record<string, unknown>,
          ['projectId'],
    );
    const { projectId } = dto.jsonData as { projectId: string};

    const application = this._application as BigQueryApplication;
    const applicationInstall = await this._getApplicationInstall(dto.user);

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.GET,
      GET_LIST_ALL_DATASETS.replace('{projectId}', projectId),
    );

    const response = await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  };
}
