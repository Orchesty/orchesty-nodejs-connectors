import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';

export const NAME = 'git-hub-repositories-batch';

export default class GitHubRepositoriesBatch extends ABatchNode {
  public getName = (): string => NAME;

  public async processAction(_dto: BatchProcessDto): Promise<BatchProcessDto> {
    const dto = _dto;

    const page = dto.getBatchCursor('1');
    const { org } = dto.jsonData as IInput;
    const appInstall = await this._getApplicationInstallFromProcess(dto);
    const req = await this._application.getRequestDto(
      dto,
      appInstall,
      HttpMethods.GET,
      `/orgs/${org}/repos?per_page=100&page=${page}`,
    );
    const resp = await this._sender.send(req, [200]);
    const response = resp.jsonBody as IOutput[];

    dto.setItemList(response ?? []);
    if (response.length >= 100) {
      dto.setBatchCursor((Number(page) + 1).toString());
    }
    return dto;
  }
}

export interface IInput{
   org: string
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput{
  id: number,
  node_id: string,
  name: string,
  full_name: string,
  owner: {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
  },
  private: boolean,
  html_url: string,
  description: string,
  fork: boolean,
  url: string,
  archive_url: string,
  assignees_url: string,
  blobs_url: string,
  branches_url: string,
  collaborators_url: string,
  comments_url: string,
  commits_url: string,
  compare_url: string,
  contents_url: string,
  contributors_url: string,
  deployments_url: string,
  downloads_url: string,
  events_url: string,
  forks_url: string,
  git_commits_url: string,
  git_refs_url: string,
  git_tags_url: string,
  git_url: string,
  issue_comment_url: string,
  issue_events_url: string,
  issues_url: string,
  keys_url: string,
  labels_url: string,
  languages_url: string,
  merges_url: string,
  milestones_url: string,
  notifications_url: string,
  pulls_url: string,
  releases_url: string,
  ssh_url: string,
  stargazers_url: string,
  statuses_url: string,
  subscribers_url: string,
  subscription_url: string,
  tags_url: string,
  teams_url: string,
  trees_url: string,
  clone_url: string,
  mirror_url: string,
  hooks_url: string,
  svn_url: string,
  homepage: string,
  language: null,
  forks_count: number,
  stargazers_count: number,
  watchers_count: number,
  size: number,
  default_branch: string,
  open_issues_count: number,
  is_template: boolean,
  topics: string[],
  has_issues: boolean,
  has_projects: boolean,
  has_wiki: boolean,
  has_pages: boolean,
  has_downloads: boolean,
  archived: boolean,
  disabled: boolean,
  visibility: string,
  pushed_at: string,
  created_at: string,
  updated_at: string,
  permissions: {
    admin: boolean,
    push: boolean,
    pull: boolean
  },
  template_repository: null
}
/* eslint-enable @typescript-eslint/naming-convention */
