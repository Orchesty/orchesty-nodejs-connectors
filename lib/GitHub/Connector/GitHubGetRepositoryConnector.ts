import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'github-get-repository-connector';

export default class GitHubGetRepositoryConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const { user, repo } = dto.getJsonData();
        const appInstall = await this.getApplicationInstall();

        const request = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `/repos/${user}/${repo}`,
        );
        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());
        return dto;
    }

}

interface IInput {
    user: string;
    repo: string;
}
