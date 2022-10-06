# [Jira](https://developer.atlassian.com/server/jira/platform/rest-apis/)

## Basic auth

- Username (email)
- Token

### How to get token

- Go to [https://id.atlassian.com/manage-profile/security](https://id.atlassian.com/manage-profile/security)
- Click on `Create and manage API tokens`
- Click on `Create an API token`
- Copy token and done ✅

### How to get issue type id

- Go to project setting
- Click on issue types
- Click on selected type and id is last number in url
> Example idType
> ```url
> https://<organization>.atlassian.net/jira/core/projects/<projectKey>/settings/issuetypes/<idType>
> ```

