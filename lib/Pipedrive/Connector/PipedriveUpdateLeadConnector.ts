import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'pipedrive-update-lead-connector';

export default class PipedriveUpdateLeadConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { id } = dto.jsonData as IInput;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const url = `/leads/${id}`;
    const req = await this._application.getRequestDto(dto, appInstall, HttpMethods.PATCH, url, id);
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = (resp.jsonBody as IResponse).data;
    return dto;
  }
}
/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    id: string;
}

interface IResponse {
    success: boolean;
    data: IOutput;
}

export interface IOutput {
    id: string;
    title: string;
    owner_id: number;
    creator_id: number;
    label_ids: string[];
    person_id: number;
    source_name: string;
    is_archived: boolean;
    was_seen: boolean;
    value: {
        amount: number;
        currency: string;
    }
    next_activity_id: number;
    add_time: string;
    update_time: string;
    visible_to: string;
    cc_email: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
