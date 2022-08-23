import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';

export const NAME = 'monday-create-group-connector';

export default class MondayCreateGroupConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const body = dto.jsonData as IInput;
    let graphQl = 'mutation { create_group (';
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(body)) {
      if (key === 'board_id') {
        graphQl += `${key}:${value},`;
      } else {
        graphQl += `${key}:"${value}",`;
      }
    }
    graphQl = graphQl.slice(0, -1);
    graphQl += ') {color id position title}}';
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      undefined,
      { query: graphQl },
    );
    const resp = await this._sender.send(req, [200]);
    const output = resp.jsonBody as IOutput;

    if (output.error_code) {
      throw new OnRepeatException(60, 10, output.error_code ?? 'Unknown error.');
    }
    dto.jsonData = output;
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    board_id: number;
    group_name: string;
}

export interface IOutput {
    archived?: boolean;
    color: string;
    deleted?: boolean;
    id: string;
    items?: {
        Ids?: number;
        limit?: number;
        page?: number;
        newest_first?: boolean;
    }[]
    position: string;
    title: string;
    error_code?: string;
    status_code?: number;
    error_message?: string;
}
