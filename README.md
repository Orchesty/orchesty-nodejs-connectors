# NODE.JS Orchesty Connectors

## How to use ?
- Install package `@orchesty/nodejs-sdk`
- Install package `@orchesty/nodejs-connectors`
- You can register the nodes into the DIContainer:
```
    import { container } from '@orchesty/nodejs-sdk';
    import GitHubApplication from '@orchesty/nodejs-connectors/dist/lib/GitHub/GitHubApplication';
    import GitHubGetRepositoryConnector from '@orchesty/nodejs-connectors/dist/lib/GitHub/Connector/GitHubGetRepositoryConnector';
    
    ...
    
        const githubApplication = new GitHubApplication();
        container.setApplication(githubApplication);
        container.setNode(new GitHubGetRepositoryConnector(), githubApplication);
```

## How to develop
1. Run `make init` for start dev environment
2. Tests can be run by `make test` or `make fasttest`
