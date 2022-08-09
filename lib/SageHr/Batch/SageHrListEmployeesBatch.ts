import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'sage-hr-list-employees-batch';

export default class SageHrListEmployeesBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `employees?page=${page}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.setItemList(response.data ?? []);
    if (response.meta.current_page <= response.meta.total_pages) {
      dto.setBatchCursor((response.meta.next_page).toString());
    }
    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse {
    data: IOutput[];
    meta: {
        current_page: number;
        next_page: number;
        total_pages: number;
        per_page: number;
        total_entries: number;
    };
}

export interface IOutput {
    data: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        picture_url: string;
        employment_start_date: string;
        date_of_birth: string;
        team: string;
        team_id: number;
        position: string;
        position_id: number;
        reports_to_employee_id: number;
        work_phone: string;
        home_phone: string;
        mobile_phone: string;
        gender: string;
        street_first: string;
        street_second: string;
        city: string;
        post_code: number;
        country: string;
        employee_number: string;
        employment_status: string;
        team_history: {
            team_id: number;
            start_date: string;
            end_date: string;
            team_name: string;
        }[];
        employment_status_history: {
            employment_status_id: number;
            start_date: string;
            end_date: string;
            employment_statu_name: string;
        }[];
        position_history: {
            position_id: number;
            start_date: string;
            end_date: string;
            position_name: string;
            position_code: string;
        }[];
    }[];
}

/* eslint-enable @typescript-eslint/naming-convention */
