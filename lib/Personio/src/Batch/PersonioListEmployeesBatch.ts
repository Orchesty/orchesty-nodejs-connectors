import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';

export const NAME = 'personio-list-employees-batch';

export default class PersonioListEmployeesBatch extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const offset = dto.getBatchCursor('0');
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `employees?limit=200&offset=${offset}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [200]);
        const response = resp.getJsonBody();

        dto.setItemList(response.data ?? []);
        if (response.metadata.current_page < response.metadata.total_pages) {
            dto.setBatchCursor((Number(offset) + 1).toString());
        }

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse {
    success: boolean;
    metadata: {
        total_elements: number;
        current_page: number;
        total_pages: number;
    };
    offset: number;
    limit: number;
    data: IOutput[];
}

export interface IOutput {
    type: string;
    attributes: {
        id: {
            label: string;
            value: number;
            type: string;
            universal_id: string;
        };
        first_name: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        last_name: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        email: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        gender: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        status: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        position: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        supervisor: {
            label: string;
            value: {
                type: string;
                attributes: {
                    id: {
                        label: string;
                        value: number;
                        type: string;
                        universal_id: string;
                    };
                };
            };
            type: string;
            universal_id: string;
        };
        employment_type: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        weekly_working_hours: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        hire_date: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        contract_end_date: {
            label: string;
            value: null;
            type: string;
            universal_id: string;
        };
        termination_date: {
            label: string;
            value: null;
            type: string;
            universal_id: string;
        };
        termination_type: {
            label: string;
            value: null;
            type: string;
            universal_id: string;
        };
        termination_reason: {
            label: string;
            value: null;
            type: string;
            universal_id: string;
        };
        probation_period_end: {
            label: string;
            value: null;
            type: string;
            universal_id: string;
        };
        created_at: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        last_modified_at: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        subcompany: {
            label: string;
            value: {
                type: string;
                attributes: {
                    id: number;
                    name: string;
                };
            };
            type: string;
            universal_id: string;
        };
        office: {
            label: string;
            value: {
                type: string;
                attributes: {
                    id: number;
                    name: string;
                };
            };
            type: string;
            universal_id: string;
        };
        department: {
            label: string;
            value: {
                type: string;
                attributes: {
                    id: number;
                    name: string;
                };
            };
            type: string;
            universal_id: string;
        };
        cost_centers: {
            label: string;
            value: [
                {
                    type: string;
                    attributes: {
                        id: number;
                        name: string;
                        percentage: number;
                    };
                },
            ];
            type: string;
            universal_id: string;
        };
        holiday_calendar: {
            label: string;
            value: {
                type: string;
                attributes: {
                    id: number;
                    name: string;
                    country: string;
                    state: string;
                };
            };
            type: string;
            universal_id: string;
        };
        absence_entitlement: {
            label: string;
            value: [
                {
                    type: string;
                    attributes: {
                        id: number;
                        name: string;
                        category: string;
                        entitlement: number;
                    };
                },
            ];
            type: string;
            universal_id: string;
        };
        work_schedule: {
            label: string;
            value: {
                type: string;
                attributes: {
                    id: number;
                    name: string;
                    valid_from: null;
                    monday: string;
                    tuesday: string;
                    wednesday: string;
                    thursday: string;
                    friday: string;
                    saturday: string;
                    sunday: string;
                };
            };
            type: string;
            universal_id: string;
        };
        fix_salary: {
            label: string;
            value: number;
            type: string;
            universal_id: string;
            currency: string;
        };
        fix_salary_interval: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        hourly_salary: {
            label: string;
            value: number;
            type: string;
            universal_id: string;
            currency: string;
        };
        vacation_day_balance: {
            label: string;
            value: number;
            type: string;
            universal_id: string;
        };
        last_working_day: {
            label: string;
            value: null;
            type: string;
            universal_id: string;
        };
        profile_picture: {
            label: string;
            value: string;
            type: string;
            universal_id: string;
        };
        team: {
            label: string;
            value: {
                type: string;
                attributes: {
                    id: number;
                    name: string;
                };
            };
            type: string;
            universal_id: string;
        };
        dynamic_24407: {
            label: string;
            value: string;
            universal_id: null;
            type: string;
        };
        dynamic_21827: {
            label: string;
            value: string;
            universal_id: string;
            type: string;
        };
        dynamic_33400: {
            label: string;
            value: string;
            universal_id: null;
            type: string;
        };
    };
}

/* eslint-enable @typescript-eslint/naming-convention */
