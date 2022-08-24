import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'git-hub-get-app-connector';

export default class GitHubGetAppConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const { appSlug } = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            `/apps/${appSlug}`,
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    appSlug: string;
}

export interface IOutput {
    id: number;
    slug: string;
    node_id: string;
    owner: {
        login: string;
        id: number;
        node_id: string;
        url: string;
        repos_url: string;
        events_url: string;
        avatar_url: string;
        gravatar_id: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    name: string;
    description: string;
    external_url: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    permissions: {
        metadata: string;
        contents: string;
        issues: string;
        single_file: string;
    };
    events: string[];
}

/* eslint-enable @typescript-eslint/naming-convention */
