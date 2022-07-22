import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'git-hub-get-app-connector';

export default class GitHubGetAppConnector extends AConnector {
  public getName = (): string => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { appSlug } = dto.jsonData as IInput;

    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/apps/${appSlug}`,

    );
    const resp = await this._sender.send(req, [200]);
    dto.jsonData = resp.jsonBody as IOutput;

    return dto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
  appSlug: string
}

export interface IOutput{
  'id': number,
  'slug': string,
  'node_id': string,
  'owner': {
    'login': string,
    'id': number,
    'node_id': string,
    'url': string,
    'repos_url': string,
    'events_url': string,
    'avatar_url': string,
    'gravatar_id': string,
    'html_url': string,
    'followers_url': string,
    'following_url': string,
    'gists_url': string,
    'starred_url': string,
    'subscriptions_url': string,
    'organizations_url': string,
    'received_events_url': string,
    'type': string,
    'site_admin': boolean
  },
  'name': string,
  'description': string,
  'external_url': string,
  'html_url': string,
  'created_at': string,
  'updated_at': string,
  'permissions': {
    'metadata': string,
    'contents': string,
    'issues': string,
    'single_file': string
  },
  'events': string[]
}
/* eslint-enable @typescript-eslint/naming-convention */
