import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { ID } from '../NutshellApplication';

export const NAME = 'nutshell-new-lead-connector';

export default class NutshellNewLeadConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const appInstall = await this._getApplicationInstallFromProcess(dto);

    const data = {
      jsonrpc: '2.0',
      method: 'newLead',
      params: dto.jsonData as IInput,
      id: appInstall.getSettings()[AUTHORIZATION_FORM][ID],
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

/* eslint-disable @typescript-eslint/naming-convention */

interface IResponse{
  'result': {
    'id': 123,
    'entityType': 'Leads',
    'rev': '10',
    'modifiedTime': '2022-07-13T15:12:05+0000',
    'createdTime': '2022-07-13T15:12:05+0000',
    'name': 'Lead',
    'description': 'A great new lead',
    'htmlUrl': 'https:\/\/app.nutshell.com\/lead\/id\/1559',
    'htmlUrlPath': '\/lead\/id\/1559',
    'avatarUrl': 'https:\/\/app.nutshell.com\/avatar\/leads\/v1\/0\/1\/1\/0',
    'creator': {
      'stub': true,
      'id': 1,
      'rev': '2',
      'entityType': 'Users',
      'modifiedTime': '2022-07-12T19:28:01+0000',
      'createdTime': '2010-01-01T09:00:00+0000',
      'name': 'Charles Berry',
      'emails': [
        'charles.berry@arrowgrid.com',
        'jim@demo.nutshell.com'],
      'isEnabled': true,
      'isAdministrator': true
    },
    'primaryAccount': {
      'stub': true,
      'id': 1,
      'rev': '0',
      'entityType': 'Accounts',
      'modifiedTime': '2022-07-12T19:28:20+0000',
      'createdTime': '2022-07-12T19:28:20+0000',
      'name': 'Acme Corp',
      'regions': [
        'Richfield, Minnesota'],
      'relationship': null,
      'description': null
    },
    'milestone': null,
    'stageset': {
      'stub': true,
      'id': 1,
      'entityType': 'Stagesets',
      'modifiedTime': '2022-07-12T19:28:01+0000',
      'name': 'Default Pipeline'
    },
    'activitiesCount': {
      '0': 0,
      '1': 0,
      '2': 0,
      '-1': 0
    },
    'status': 0,
    'confidence': 50,
    'completion': 0,
    'urgency': '0',
    'isOverdue': true,
    'lastContactedDate': null,
    'market': {
      'stub': true,
      'id': 1,
      'rev': '0',
      'entityType': 'Markets',
      'name': 'U.S.'
    },
    'assignee': {
      'stub': true,
      'id': 12,
      'rev': '2',
      'entityType': 'Users',
      'modifiedTime': '2022-07-12T19:28:01+0000',
      'createdTime': '2010-01-01T09:00:00+0000',
      'name': 'Shawn May',
      'emails': [
        'shawn.may@arrowgrid.com'],
      'isEnabled': true,
      'isAdministrator': true
    },
    'sources': [
    ],
    'competitors': [
    ],
    'products': [
      {
        'stub': true,
        'id': 5,
        'rev': '0',
        'entityType': 'Products',
        'modifiedTime': '2022-07-12T19:28:02+0000',
        'createdTime': '2022-07-12T19:28:02+0000',
        'name': 'Turnkey Installation Service',
        'relationship': 'Potentially interested',
        'price': {
          'currency': 'USD',
          'amount': 5000
        },
        'quantity': 2
      }],
    'contacts': [
    ],
    'accounts': [
    ],
    'tags': [
      'some other tag',
      'some tag name'],
    'priority': 0,
    'dueTime': '2010-11-13T20:23:19+0000',
    'value': {
      'currency': 'USD',
      'amount': 10000
    },
    'normalizedValue': {
      'currency': 'USD',
      'amount': 10000
    },
    'processes': [
    ],
    'notes': [
      {
        'stub': true,
        'id': 763,
        'rev': '0',
        'entityType': 'Notes',
        'createdTime': '2022-07-13T15:12:05+0000',
        'note': 'New lead note #1',
        'noteMarkup': 'New lead note #1',
        'noteHtml': 'New lead note #1',
        'user': {
          'stub': true,
          'id': 1,
          'rev': '2',
          'entityType': 'Users',
          'modifiedTime': '2022-07-12T19:28:01+0000',
          'createdTime': '2010-01-01T09:00:00+0000',
          'name': 'Charles Berry',
          'emails': [
            'charles.berry@arrowgrid.com',
            'jim@demo.nutshell.com'],
          'isEnabled': true,
          'isAdministrator': true
        },
        'originId': 2001,
        'date': '2022-07-13T15:12:05+0000'
      },
      {
        'stub': true,
        'id': 767,
        'rev': '0',
        'entityType': 'Notes',
        'createdTime': '2022-07-13T15:12:05+0000',
        'note': 'New lead note #2',
        'noteMarkup': 'New lead note #2',
        'noteHtml': 'New lead note #2',
        'user': {
          'stub': true,
          'id': 1,
          'rev': '2',
          'entityType': 'Users',
          'modifiedTime': '2022-07-12T19:28:01+0000',
          'createdTime': '2010-01-01T09:00:00+0000',
          'name': 'Charles Berry',
          'emails': [
            'charles.berry@arrowgrid.com',
            'jim@demo.nutshell.com'],
          'isEnabled': true,
          'isAdministrator': true
        },
        'originId': 2001,
        'date': '2022-07-13T15:12:05+0000'
      }],
    'estimatedValue': {
      'currency': 'USD',
      'amount': 10000
    }
  },
  'id': 'apeye',
  'jsonrpc': '2.0'
}

export interface IInput{
  lead: {
    primaryAccount: {id: string},
    dueTime: string,
    market: {id: string},
    tags: string[],
    description: string,
    accounts: [
      {
        id: number
      }
    ],
    contacts: [
      {
        id: number
      }
    ],
    products: [
      {
        relationship: string,
        quantity: number,
        price: {
          currency_shortname: string,
          amount: string
        },
        id: number
      }
    ],
    competitors: [
      {
        status: number,
        relationship: string,
        id: number
      }
    ],
    sources: [
      { id: number }
    ],
    confidence: number,
    assignee: {
      entityType: string,
      id: number
    },
    customFields: {
      'Tracking #': string,
      Discount: {
        currency_shortname: string,
        amount: string
      }
    },
    note: string[],
    priority: number
  }
}

/* eslint-enable @typescript-eslint/naming-convention */
