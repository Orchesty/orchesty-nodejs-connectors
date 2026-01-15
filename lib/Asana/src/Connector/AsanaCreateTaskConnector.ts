import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import AsanaApplication from '../AsanaApplication';

const ASANA_CREATE_TASK_ENDPOINT = '/api/1.0/tasks';

interface IAsanaTask {
    notes: string;
    name: string;
    projects: string;
    workspace: string;
}

export default class AsanaCreateTaskConnector extends AConnector {

    public getName(): string {
        return 'asana-create-task';
    }

    public async processAction(dto: ProcessDto<IAsanaTask>): Promise<ProcessDto> {
        checkParams(dto.getJsonData(), ['notes', 'name', 'projects', 'workspace']);

        const {
            notes,
            name,
            projects,
            workspace,
        } = dto.getJsonData();
        const data = {
            data: {
                notes,
                name,
                projects,
                workspace,
            },
        };
        const application = this.getApplication<AsanaApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            ASANA_CREATE_TASK_ENDPOINT,
            JSON.stringify(data),
        );

        const response = await this.getSender().send(request, [201]);
        dto.setData(response.getBody());

        return dto;
    }

}
