import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'pipedrive-update-lead-connector';

export default class PipedriveUpdateLeadConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto<IInput>): Promise<ProcessDto> {
    const dto = _dto;
    const { id, ...body } = dto.jsonData;

    dto.jsonData = (await this._sender.send<IResponse>(
      await this._application.getRequestDto(
        dto,
        await this._getApplicationInstallFromProcess(dto),
        HttpMethods.PATCH,
        `/leads/${id}`,
        body,
      ),
      [200],
    )).jsonBody.data;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
  id: string;
  title?: string;
  person_id?: number;
  organization_id?: number;
  label_ids?: string[];
  owner_id?: number;
  is_archived: boolean;
  value?: unknown;
  expected_close_date?: Date;
  visible_to?: 1 | 3 | 5 | 7;
  was_seen?: boolean;
}

export interface IOutput {
  id: string;
  title: string;
  owner_id: number;
  creator_id: number;
  label_ids: string[];
  value: unknown;
  expected_close_date: Date;
  person_id: number;
  organization_id: number;
  is_archived: boolean;
  source_name: string;
  was_seen: boolean;
  next_activity_id: number;
  add_time: Date;
  update_time: Date;
  visible_to: string;
  cc_email: string;
}

interface IResponse {
  success: boolean;
  data: IOutput;
}
/* eslint-enable @typescript-eslint/naming-convention */
