import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'monday-create-group-connector';

export default class MondayCreateGroupConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const body = dto.getJsonData();

        let graphQl = 'mutation { create_group (';

        for (const [key, value] of Object.entries(body)) {
            if (key === 'board_id') {
                graphQl += `${key}:${value},`;
            } else {
                graphQl += `${key}:"${value}",`;
            }
        }
        graphQl = graphQl.slice(0, -1);
        graphQl += ') {color id position title}}';
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            undefined,
            { query: graphQl },
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);
        const output = resp.getJsonBody();

        if (output.error_code) {
            throw new OnRepeatException(60, 10, output.error_code ?? 'Unknown error.');
        }
        return dto.setNewJsonData(output);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    board_id: number;
    group_name: string;
}

export interface IOutput {
    id: string;
    position: string;
    color: string;
    title: string;
    archived?: boolean;
    deleted?: boolean;
    items?: {
        Ids?: number;
        limit?: number;
        page?: number;
        newest_first?: boolean;
    }[];
    error_code?: string;
    status_code?: number;
    error_message?: string;
}
