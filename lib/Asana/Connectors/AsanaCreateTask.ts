import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import { checkParams } from 'pipes-nodejs-sdk/dist/lib/Utils/Validations';
import AsanaApplication from '../AsanaApplication';

const ASANA_CREATE_TASK_ENDPOINT = '/api/1.0/tasks';

interface IAsanaTask {
  userName: string,
  notes: string,
  name: string,
  projects: string,
  workspace: string,
}

export default class AsanaCreateTask extends AConnector {
  public getName = (): string => 'asana-create-task';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
      dto.jsonData as Record<string, unknown>,
      ['userName', 'notes', 'name', 'projects', 'workspace'],
    );

    const {
      userName,
      notes,
      name,
      projects,
      workspace,
    } = dto.jsonData as IAsanaTask;
    const data = {
      data: {
        notes,
        name,
        projects,
        workspace,
      },
    };
    const application = this._application as AsanaApplication;
    const applicationInstall = await this._getApplicationInstall(userName);

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      ASANA_CREATE_TASK_ENDPOINT,
      JSON.stringify(data),
    );

    const response = await this._sender.send(request, [201]);
    dto.data = response.body;
    return dto;
  }
}
