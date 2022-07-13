import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ID } from '../NutshellApplication';

export const NAME = 'nutshell-get-account-connector';

export default class NutshellGetAccountConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const formId = appInstall.getSettings()[AUTHORIZATION_FORM][ID];

    const data = {
      jsonrpc: '2.0',
      method: 'getAccount',
      params: dto.jsonData as IInput,
      id: formId,
    };
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.POST,
      undefined,
      data,
    );

    const resp = await this._sender.send(req, [200]);

    const response = resp.jsonBody as IOutput;

    dto.jsonData = response.result;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput{
  accountId: number
}

export interface IOutput{

  result: {
    id: number,
    entityType: string,
    rev: string,
    modifiedTime: string,
    createdTime: string,
    name: string,
    htmlUrl: string,
    htmlUrlPath: string,
    avatarUrl: string,
    accountType: {
      id: number,
      name: string
    },
    industry: {
      stub: boolean,
      id: number,
      rev: string,
      entityType: string,
      name: string
    },
    tags: [],
    lastContactedDate: string,
    contacts: [
      {
        stub: true,
        id: number,
        rev: string,
        entityType: string,
        modifiedTime: string,
        createdTime: string,
        name: string,
        jobTitle: string,
        relationship: null
      }
    ],
    description: null,
    legacyId: null,
    address: {
      main: {
        name: null,
        location: {
          longitude: number,
          latitude: number
        },
        locationAccuracy: string,
        address_1: string,
        address_2: null,
        address_3: null,
        city: string,
        state: string,
        postalCode: string,
        country: string,
        timezone: null
      },
      primary: {
        name: null,
        location: {
          longitude: number,
          latitude: number
        },
        locationAccuracy: string,
        address_1: string,
        address_2: null,
        address_3: null,
        city: string,
        state: string,
        postalCode: string,
        country: string,
        timezone: null
      }
    },
    notes: [],
    leads: [
      {
        stub: boolean,
        id: number,
        rev: string,
        entityType: string,
        modifiedTime: string,
        createdTime: string,
        name: string,
        description: string,
        status: number,
        completion: number,
        value: {
          currency: string,
          amount: number
        },
        primaryAccountName: string,
        primaryContactName: string,
        isOverdue: false,
        lastContactedDate: string,
        dueTime: string,
        closedTime: string
      },
    ]
  },
  id: string,
  jsonrpc: string

  /* eslint-enable @typescript-eslint/naming-convention */
}
