import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import crypto from 'crypto';

export const NAME = 'nutshell-new-task-connector';

export default class NutshellNewTaskConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const data = {
      jsonrpc: '2.0',
      method: 'newTask',
      params: dto.jsonData as IInput,
      id: crypto.randomBytes(4).toString('hex'),
    };
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      undefined,
      data,
    );

    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IResponse;

    dto.jsonData = response.result;

    return dto;
  }
}

interface IResponse
{
    result: IOutput,
    id: string,
    jsonrpc: string
 }

export interface IOutput{
   title: string,
       id: number,
       entityType: string,
       rev: string,
       createdTime: string,
       description: string,
       dueTime: string,
       completedTime: null,
       completedUser: null,
       assignee: {
          stub: boolean,
          id: number,
          rev: string,
          entityType: string,
          modifiedTime: string,
          createdTime: string,
          name: string,
          emails: string[],
          isEnabled: boolean,
          isAdministrator: boolean
       },
       entity: {
          stub: boolean,
          id: number,
          rev: string,
          entityType: string,
          modifiedTime: string,
          createdTime: string,
          name: string,
          regions: string[]
       },
       creator: {
          stub: boolean,
          id: number,
          rev: string,
          entityType: string,
          modifiedTime: string,
          createdTime: string,
          name: string,
          emails: string[],
          isEnabled: boolean,
          isAdministrator: boolean
       }

}

export interface IInput{
    task: {
        title: string,
        description: string,
        dueTime: string,
        assignee: {
            entityType: string,
            id: number
        },
       entity: {
           entityType: string,
           id: number
       }
    }

}
