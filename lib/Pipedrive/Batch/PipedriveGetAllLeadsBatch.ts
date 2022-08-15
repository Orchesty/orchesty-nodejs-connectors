import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'pipedrive-get-all-leads-batch';

export default class PipedriveGetAllLeadsBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const response = (await this._sender.send<IResponse>(
      await this._application.getRequestDto(
        dto,
        await this._getApplicationInstallFromProcess(dto),
        HttpMethods.GET,
        `/leads?start=${parseInt(dto.getBatchCursor('0'), 10)}&limit=100`,
      ),
      [200],
    )).jsonBody;

    dto.setItemList(response.data);

    if (response.additional_data.pagination.more_items_in_collection) {
      dto.setBatchCursor(response.additional_data.pagination.next_start.toString());
    }

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
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
  data: IOutput[];
  additional_data: {
    pagination: {
      start: number,
      limit: number,
      next_start: number
      more_items_in_collection: boolean,
    }
  };
}
/* eslint-enable @typescript-eslint/naming-convention */
