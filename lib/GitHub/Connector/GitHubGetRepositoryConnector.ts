import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ResultCode from '@orchesty/nodejs-sdk/dist/lib/Utils/ResultCode';

export const NAME = 'git-hub-get-repository-connector';

export default class GitHubGetRepositoryConnector extends AConnector {
  public getName = () => 'github-get-repository';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    const data = dto.jsonData as IInput;
    const appInstall = await this._getApplicationInstall();

    if (!data.user || !data.repo) {
      dto.setStopProcess(ResultCode.STOP_AND_FAILED, 'Connector has no required data.');
    } else {
      const request = await this._application.getRequestDto(
        dto,
        appInstall,
        HttpMethods.GET,
        `/repos/${data.user}/${data.repo}`,
      );
      const response = await this._sender.send(request);

      if (response.responseCode >= 300 && response.responseCode < 400) {
        throw new OnRepeatException(30, 5, response.body);
      } else if (response.responseCode >= 400) {
        dto.setStopProcess(ResultCode.STOP_AND_FAILED, `Failed with code ${response.responseCode}`);
      }

      dto.data = response.body;
    }
    return dto;
  }
}

  interface IInput {
  user: string
  repo: string
}
