import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'github-get-repository-connector';

export default class GitHubGetRepositoryConnector extends AConnector {
  public getName = () => NAME;

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const { user, repo } = dto.jsonData as IInput;
    const appInstall = await this._getApplicationInstall();

    const request = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/repos/${user}/${repo}`,
    );
    const response = await this._sender.send(request);
    await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  }
}

interface IInput {
  user: string;
  repo: string;
}
