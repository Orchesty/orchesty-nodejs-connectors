import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'pipedrive-get-all-leads-batch';
const LIMIT = 99;

export default class PipedriveGetAllLeadsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;
    const start = Number(dto.getBatchCursor('0'));
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/leads?start=${(start * LIMIT) + start ? 1 : 0}&limit=${LIMIT}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (response.additional_data.pagination.more_items_in_collection) {
      dto.setBatchCursor((start + 1).toString());
    }

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponse {
    success: boolean;
    data: IOutput[];
    additional_data: {
        pagination: {
            more_items_in_collection: boolean;
        }
    };
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
    };
    next_activity_id: number;
    add_time: Date;
    update_time: Date;
    visible_to: string;
    cc_email: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
